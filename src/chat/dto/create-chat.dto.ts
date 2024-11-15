import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@InputType()
export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Field()
  name: string;
  @IsOptional()
  @Field(type => [String])
  @IsArray()
  @IsString({ each: true })
  usersIds?: string[];
}