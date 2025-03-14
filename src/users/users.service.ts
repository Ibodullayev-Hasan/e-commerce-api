import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Barcha foydalanuvchilarni olish (Admin only)
  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find();
      users.map((user) => delete user.password);
      return users;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Foydalanuvchini ID orqali olish (Admin & User only)
  async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`Foydalanuvchi topilmadi!`);
      delete user.password;
      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Foydalanuvchi o‘z profilini olish
  async getSelfInfo(userId: string): Promise<User> {
    return this.findOne(userId);
  }

  // Foydalanuvchi profilini yangilash
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<string> {
    try {
      if (!Object.keys(updateUserDto).length) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiritish zarur`);
      }
      if (updateUserDto.password) {
        updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 8);
      }
      const { affected } = await this.userRepository.update(userId, updateUserDto);
      return affected && affected > 0 ? 'Muvaffaqiyatli yangilandi' : 'Yangilash amalga oshmadi';
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Foydalanuvchini o‘chirish (Admin only)
  async remove(id: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException(`Foydalanuvchi topilmadi!`);
      const { affected } = await this.userRepository.delete(id);
      return affected && affected > 0 ? `Muvaffaqiyatli o'chirildi` : `O'chirish amalga oshmadi`;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Foydalanuvchi o‘z profilini o‘chirish
  async deleteSelf(userId: string): Promise<string> {
    return this.remove(userId);
  }
}
