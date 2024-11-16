import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class ChatMessage {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  chatId: string;
  @IsNotEmpty()
  @IsString()
  @Field()
  text: string;
}