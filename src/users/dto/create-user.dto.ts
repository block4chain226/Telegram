import { IsEmail, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username?: string;
  @IsEmail()
  email: string;
  // @Matches(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$/, { message: 'password should have min 4 characters and min 1 uppercase' })
  @IsString()
  password: string;
  @IsPhoneNumber()
  phone: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstname?: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastname?: string;
}