import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ChatInviteDto {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  chatId: string;
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  @Field(type => [String])
  users: string[];
}