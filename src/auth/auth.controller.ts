import { Controller, Post, Body, HttpStatus, HttpException, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Auth') // Swaggerda bo‘lim nomi
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Yaroqsiz ma’lumotlar' })
  @ApiBody({
    description: 'Ro‘yxatdan o‘tish uchun kerakli ma’lumotlar',
    type: CreateUserDto,
  })
  create(@Body() userDto: CreateUserDto) {
    try {
      return this.authService.register(userDto);
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli tizimga kirish' })
  @ApiResponse({ status: 401, description: 'Noto‘g‘ri login yoki parol' })
  @ApiBody({
    description: 'Tizimga kirish uchun kerakli ma’lumotlar',
    type: LoginDto,
  })
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Swaggerda token kerakligini ko‘rsatadi
  @ApiOperation({ summary: 'Access tokenni yangilash' })
  @ApiResponse({ status: 200, description: 'Token muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: 'Token yaroqsiz yoki muddati tugagan' })
  refresh(@Req() req: Request) {
    try {
      const user = req.user;
      return this.authService.refresh(user);
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
