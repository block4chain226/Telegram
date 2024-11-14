import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@ObjectType()
export class ResponseLoginsDto {
  @Expose()
  @Field()
  token: string;
  @Expose()
  @Field()
  email: string;
}