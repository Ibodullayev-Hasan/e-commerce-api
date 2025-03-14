import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateBasketDto {
  @ApiProperty({
    description: 'Savatchaga qo‘shiladigan mahsulotning unikal identifikatori',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'Mahsulot miqdori',
    example: 2,
    minimum: 1,
  })
  @Min(1)
  quantity: number;
}
