import { IsEmail, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @IsEmail()
  @Field()
  email: string;
  @IsString()
  @Field()
  password: string;
}