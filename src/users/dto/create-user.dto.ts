import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Field({nullable: true})
  username?: string;
  @IsEmail()
  @Field()
  email: string;
  // @Matches(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$/, { message: 'password should have min 4 characters and min 1 uppercase' })
  @IsString()
  @Field()
  password: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phone: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Field({nullable: true})
  firstname?: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Field({nullable: true})
  lastname?: string;
}