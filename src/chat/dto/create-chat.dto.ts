import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../../users/entity/users.entity';

@InputType()
export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Field()
  name: string;
  @IsOptional()
  @Field(type => [User])
  users: User[];
}