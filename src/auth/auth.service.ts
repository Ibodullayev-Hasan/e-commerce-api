import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcryptjs from "bcryptjs"
import { TokenGenerator } from 'src/services/token-generator.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenGenerator,

  ) { }

  // register
  async register(userDto: CreateUserDto): Promise<{
    accessToken: string,
    user: Partial<Omit<User, "password">>
  }> {
    try {

      const existingUser = await this.userRepository.findOne({ where: { email: userDto.email } })
      if (existingUser) throw new ConflictException("User with this email already exists");

      const newUser: User = this.userRepository.create(userDto)

      const hashedPassword: string = await bcryptjs.hash(newUser.password, 8)
      newUser.password = hashedPassword

      const [savedUser, token] = await Promise.all([
        this.userRepository.save(newUser),
        this.tokenService.generator(newUser)
      ])

      const { password, role, ...user } = savedUser

      return {
        user: user,
        accessToken: token.accToken
      }
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // login
  async login(loginDto: LoginDto): Promise<{
    accessToken: string,
    accessExpiresIn: string,
    refreshToken: string,
    refreshExpiresIn: string
  }> {
    try {
      const user: User = await this.userRepository.findOne({ where: { email: loginDto.email } })
      if (!user) throw new UnauthorizedException(`Unauthorized user!`)

      const checkPassword = await bcryptjs.compare(loginDto.password, user.password)
      if (!checkPassword) throw new UnauthorizedException(`Incorrect password`)

      const tokens = await this.tokenService.generator(user)

      return {
        accessToken: tokens.accToken,
        accessExpiresIn: tokens.accessExpiresIn,
        refreshToken: tokens.refToken,
        refreshExpiresIn: tokens.refreshExpiresIn
      }
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  // refresh
  async refresh(user: User): Promise<{
    accessToken: string,
    accessExpiresIn: string,
  }> {
    try {
      const tokens = await this.tokenService.generator(user)

      return {
        accessToken: tokens.accToken,
        accessExpiresIn: tokens.accessExpiresIn,
      }
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
