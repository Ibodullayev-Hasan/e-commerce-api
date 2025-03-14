import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  
  @ApiProperty({
    description: "Mahsulot nomi",
    example: "iPhone 15 Pro"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Mahsulot tavsifi",
    example: "Apple kompaniyasining eng so‘nggi flagman smartfoni"
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: "Mahsulot narxi",
    example: 1299
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "Ombordagi mahsulot soni",
    example: 50
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: "Mahsulot kategoriyasi ID si",
    example: "64d7f3b9e12a4f001c3bfa23"
  })
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiPropertyOptional({
    description: "Mahsulot rasmi (URL)",
    example: "https://example.com/images/iphone15.jpg"
  })
  @IsOptional()
  @IsString()
  image?: string;
}
