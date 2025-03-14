import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket, BasketItem, Order } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Basket) private basketRepo: Repository<Basket>,
    @InjectRepository(BasketItem) private basketItemRepo: Repository<BasketItem>,
  ) { }

  // Buyurtma yaratish (Foydalanuvchi uchun)
  async createOrder(userId: string) {
    try {
      const basket = await this.basketRepo.findOne({
        where: { user: { id: userId } },
        relations: { items: { product: true } }
      });

      if (!basket || basket.items.length === 0) {
        throw new NotFoundException('Savat bo‘sh');
      }

      // Har bir mahsulot uchun buyurtma yaratish
      for (const item of basket.items) {
        const order = this.orderRepo.create({
          user: { id: userId },
          product: item.product,
          quantity: item.quantity,
          total_price: item.quantity * item.product.price,
          status: 'pending'
        });

        await this.orderRepo.save(order);
      }

      // Savatni tozalash
      await this.basketItemRepo.remove(basket.items);

      return { message: 'Buyurtma yaratildi' };
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  // Barcha buyurtmalarni olish (Admin uchun)
  async findAllOrders() {
    const orders = await this.orderRepo.find({ relations: { user: true, product: true } });

    orders.map(el => {
      delete el.user.password
      return el
    })

    return orders
  }

  // Foydalanuvchining o‘z buyurtmalarini olish
  async findUserOrders(userId: string) {
    return this.orderRepo.find({ where: { user: { id: userId } }, relations: { product: true } });
  }

  // Buyurtmani ID bo‘yicha olish
  async findOne(id: string) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: { user: true, product: true } });
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    delete order.user.password
    return order;
  }
}
