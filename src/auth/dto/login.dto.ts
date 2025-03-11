import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	@Length(4, 8, {
		message: `The password must be at least 4 and at most 8 characters long`
	})
	password: string;

}