import { Exclude, Expose, Type } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Exclude()
@InputType()
export class ResponseContactDto {
  @Expose()
  @Field()
  id: string;
  @Expose()
  @Field()
  ownerId: string;
  @Expose()
  @Field(type => ResponseUserDto)
  @Type(() => ResponseUserDto)
  user: ResponseUserDto;
  @Expose()
  @Field()
  firstname?: string;
  @Expose()
  @Field()
  phone: string;
  @Expose()
  @Field()
  lastname?: string;
}