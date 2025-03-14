import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums';
import { Request } from 'express';

@ApiTags('Baskets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER)
@Controller('baskets')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiOperation({ summary: 'Mahsulotni savatchaga qo‘shish' })
  @ApiResponse({ status: 201, description: 'Mahsulot muvaffaqiyatli qo‘shildi' })
  @Post('add')
  create(@Body() createBasketDto: CreateBasketDto, @Req() req: Request) {
    return this.basketService.addToBasket(createBasketDto, req.user?.id);
  }

  @ApiOperation({ summary: 'Foydalanuvchining savatchasini olish' })
  @ApiResponse({ status: 200, description: 'Savatcha muvaffaqiyatli olindi' })
  @Get()
  findUserBasket(@Req() req: Request) {
    return this.basketService.getUserBasket(req.user?.id);
  }

  @ApiOperation({ summary: 'Savatchadagi mahsulotni yangilash' })
  @ApiResponse({ status: 200, description: 'Mahsulot muvaffaqiyatli yangilandi' })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto, @Req() req: Request) {
    return this.basketService.update(req.user?.id, id, updateBasketDto);
  }

  @ApiOperation({ summary: 'Savatchadan mahsulotni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Mahsulot muvaffaqiyatli o‘chirildi' })
  @Delete('remove/:id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.basketService.remove(req.user?.id, id);
  }

  @ApiOperation({ summary: 'Savatchani tozalash' })
  @ApiResponse({ status: 200, description: 'Savatcha muvaffaqiyatli tozalandi' })
  @Delete('clear')
  clear(@Req() req: Request) {
    return this.basketService.clear(req.user?.id);
  }
}
