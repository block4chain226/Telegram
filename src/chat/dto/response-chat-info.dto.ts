import { Exclude, Expose, Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Exclude()
@InputType()
export class ResponseChatInfoDto {
  @Expose()
  @Field(type => [ResponseUserDto])
  @Type(() => ResponseUserDto)
  users: ResponseUserDto[];
  @Expose()
  @Field()
  owner: string;
}