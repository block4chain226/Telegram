import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMessageDto {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  chatId: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  text: string;
}