import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums';

@ApiTags('Categories') // Swagger'da kategoriya tagi qo'shildi
@ApiBearerAuth() // JWT Authentication talab qilinishini bildiradi
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Kategoriya yaratish' })
  @ApiResponse({ status: 201, description: 'Kategoriya yaratildi' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Kategoriya ID bo‘yicha olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Kategoriyani yangilash' })
  @ApiResponse({ status: 200, description: 'Kategoriya yangilandi' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Kategoriyani o‘chirish' })
  @ApiResponse({ status: 200, description: 'Kategoriya o‘chirildi' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
