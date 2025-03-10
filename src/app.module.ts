import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, ProductsModule, BasketModule, OrdersModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
