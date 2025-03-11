import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcryptjs from "bcryptjs"
import { TokenGenerator } from 'src/services/token-generator.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly tokenService: TokenGenerator,

  ) { }

  async register(userDto: CreateUserDto): Promise<{
    accessToken: string,
    user: Partial<Omit<User, "password">>
  }> {
    try {

      const existingUser = await this.userRepository.findOne({ where: { email: userDto.email } })
      if (existingUser) throw new ConflictException("User with this email already exists");

      const newUser: User = this.userRepository.create(userDto)

      const hashedPassword: string = await bcryptjs.hash(newUser.password, 10)
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



  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
