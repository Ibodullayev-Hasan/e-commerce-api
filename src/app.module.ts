import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig, JwtConfig, TypeOrmConfig } from './configs';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatterInterceptor } from './interceptors';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig),

    TypeOrmModule.forRootAsync(TypeOrmConfig),

    JwtModule.registerAsync(JwtConfig),

    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    BasketModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatterInterceptor
    }
  ],
})
export class AppModule { }
