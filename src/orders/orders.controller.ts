import { Controller, Get, Post, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums';
import { Request } from 'express';
import { OrderService } from './orders.service';

@ApiTags('Orders') // Swagger UI da "Orders" nomli kategoriya paydo bo‘ladi
@ApiBearerAuth() // JWT Authentication talab qilinishini bildiradi
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiResponse({ status: 201, description: 'Buyurtma muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @Post()
  @Roles(UserRole.USER)
  create(@Req() req: Request) {
    return this.orderService.createOrder(req.user?.id);
  }

  @ApiOperation({ summary: 'Barcha buyurtmalarni olish (faqat admin)' })
  @ApiResponse({ status: 200, description: 'Barcha buyurtmalar ro‘yxati' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @ApiOperation({ summary: 'Foydalanuvchining o‘z buyurtmalarini olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchining buyurtmalari' })
  @ApiResponse({ status: 403, description: 'Foydalanuvchiga ruxsat berilmagan' })
  @Get('self-orders')
  @Roles(UserRole.USER)
  findUserOrders(@Req() req: Request) {
    return this.orderService.findUserOrders(req.user?.id);
  }

  @ApiOperation({ summary: 'Buyurtma ID bo‘yicha ma’lumot olish' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi' })
  @ApiResponse({ status: 404, description: 'Buyurtma topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
