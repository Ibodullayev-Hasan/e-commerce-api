import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { UserRole } from "src/enums";


export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(4, 8, {
		message: `The password must be at least 4 and at most 8 characters long`
	})
	@Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*\d){3,})(?=.*[@#$!&])[A-Za-z\d@#$!&]{6,8}$/, {
		message: `password kamida 1 ta katta harf, 1 ta kichik harf, 3 ta raqam va 1 ta belgi (@, #, $, !, & lardan biri) bo'lishi kerak`
	})
	password: string;

	@IsOptional()
	@IsEnum(UserRole, {
		message: "role must be either ADMIN or USER"
	})
	role?: string;
}
