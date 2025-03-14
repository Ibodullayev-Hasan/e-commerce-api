import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
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
		example: "Abc12345"
	})
	@IsNotEmpty()
	@IsString()
	@Length(4, 8, {
		message: `The password must be at least 4 and at most 8 characters long`
	})
	password: string;
}
