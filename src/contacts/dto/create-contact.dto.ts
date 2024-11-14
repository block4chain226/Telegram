import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateContactDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  @Field()
  phone: string;
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  firstname?: string;
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  lastname?: string;
}