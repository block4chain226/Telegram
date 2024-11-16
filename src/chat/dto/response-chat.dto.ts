import { Field, InputType } from '@nestjs/graphql';
import { Exclude, Expose, Type } from 'class-transformer';
import { Message } from '../../message/entity/message.entity';
import { User } from '../../users/entity/users.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';


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
  @Field(type => [ResponseUserDto])
  @Type(() => ResponseUserDto)
  users: ResponseUserDto[];
}