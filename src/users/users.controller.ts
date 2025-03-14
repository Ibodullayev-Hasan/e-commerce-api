import { Controller, Get, Patch, Param, Delete, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('self-info')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'O‘z profilini olish' })
  getSelfInfo(@Req() req: Request) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Foydalanuvchini ID bo‘yicha olish' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Foydalanuvchi profilini yangilash' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    if (id !== req.user.id) {
      throw new HttpException('Faqat o‘z profilingizni yangilay olasiz', HttpStatus.FORBIDDEN);
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('self-delete')
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'O‘z profilini o‘chirish' })
  deleteSelf(@Req() req: Request) {
    console.log(req.user.id);

    return this.usersService.remove(req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish (Admin Only)' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
