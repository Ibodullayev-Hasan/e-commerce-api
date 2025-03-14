import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { BasketItem } from './entities/basketItem.entitie';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, BasketItem]),
    forwardRef(() => ProductsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => OrdersModule),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService, TypeOrmModule.forFeature([Basket, BasketItem])]
})
export class BasketModule { }
