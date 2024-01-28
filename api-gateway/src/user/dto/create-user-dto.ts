
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: "Name must be between 3 to 20 characters" })
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8, 35, { message: "Password must be between 8 to 35 characters" })
    password: string
}