import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
