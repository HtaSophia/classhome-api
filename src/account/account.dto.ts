import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from './enum/roles.enum';

export class AccountDto {
    @IsString()
    @IsNotEmpty()
    public readonly username: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsEnum(Roles)
    @IsNotEmpty()
    public readonly role: Roles;
}
