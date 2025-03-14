import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { UserRole } from "src/enums";

export class CreateUserDto {
  @ApiProperty({
    description: "Foydalanuvchining to‘liq ismi",
    example: "Ali Valiyev"
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: "Foydalanuvchining email manzili",
    example: "user@example.com"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Foydalanuvchi paroli",
    minLength: 4,
    maxLength: 8,
    example: "Abc12345",
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 8, {
    message: `The password must be at least 4 and at most 8 characters long`
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){3,})[A-Za-z\d]{6,8}$/, {
    message: `Parol kamida 1 ta katta harf, 1 ta kichik harf va 3 ta raqamdan iborat bo‘lishi kerak (maxsus belgilar kiritilmasin)`
  })
  password: string;

  @ApiPropertyOptional({
    description: "Foydalanuvchi roli",
    enum: UserRole,
    example: UserRole.USER
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: "role must be either ADMIN or USER"
  })
  role?: string;
}
