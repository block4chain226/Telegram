import { Exclude, Expose, Type } from 'class-transformer';
import { Roles } from '../constants/roles.enum';
import { Field, InputType } from '@nestjs/graphql';
import { ResponseContactDto } from '../../contacts/dto/response-contact.dto';
import { ResponseChatDto } from '../../chat/dto/response-chat.dto';

@Exclude()
@InputType()
export class ResponseUserDto {
  @Field()
  @Expose()
  id: string;
  @Field()
  @Expose()
  username?: string;
  @Field()
  @Expose()
  email: string;
  @Field()
  @Expose()
  role: Roles;
  @Field()
  @Expose()
  firstname?: string;
  @Field()
  @Expose()
  lastname?: string;
  @Field()
  @Expose()
  phone: string;
  @Field(type => [ResponseContactDto])
  @Expose()
  @Type(() => ResponseContactDto)
  contacts: ResponseContactDto[];
  @Field(type => ResponseChatDto)
  @Expose()
  @Type(() => ResponseChatDto)
  chats: ResponseChatDto[];
}