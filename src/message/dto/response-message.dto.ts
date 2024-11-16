import { Field, InputType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { Chat } from '../../chat/entity/chat.entity';

@InputType()
@Exclude()
export class ChatMessageDto {
  @Expose()
  @Field()
  id: string;
  @Expose()
  @Field()
  sender: string;
  @Expose()
  @Field()
  text: string;
  @Expose()
  @Field()
  chat: Chat;
}