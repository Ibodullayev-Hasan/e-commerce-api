import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "src/entities";

export class CreateCategoryDto {
  
  @ApiProperty({
    description: "Kategoriya nomi",
    example: "Elektronika"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Kategoriya tavsifi",
    example: "Elektronika mahsulotlari uchun kategoriya"
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: "Kategoriya rasmi (URL)",
    example: "https://example.com/images/electronics.jpg"
  })
  @IsOptional()
  @IsString()
  image: string;

  
  @IsOptional()
  @IsString()
  parent?: Category;
}
