import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from 'src/enums';

export class CreateOrderDto {
  @ApiPropertyOptional({
    description: 'Buyurtma holati',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus.PENDING;
}
