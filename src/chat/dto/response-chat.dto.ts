import { Field, InputType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { Message } from '../entity/message.entity';
import { User } from '../../users/entity/users.entity';


@Exclude()
@InputType()
export class ResponseChatDto {
  @Expose()
  @Field()
  id: string;
  @Expose()
  @Field()
  name: string;
  @Expose()
  @Field()
  owner: string;
  @Expose()
  @Field(type => [Message])
  messages: Message[];
  @Expose()
  @Field(type => [User])
  users: User[];
}