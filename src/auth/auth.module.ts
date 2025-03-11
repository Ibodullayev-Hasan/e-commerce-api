import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { TokenGenerator } from 'src/services/token-generator.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(JwtConfig),

    TypeOrmModule.forFeature([User]),

    forwardRef(() => UsersModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenGenerator],
})
export class AuthModule { }
