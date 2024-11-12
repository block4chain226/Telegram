import { Exclude, Expose } from 'class-transformer';
import { Roles } from '../constants/roles.enum';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Exclude()
@ObjectType()
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
}