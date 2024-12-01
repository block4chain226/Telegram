import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { IsBoolean } from '../../common/decorators/validators/IsBoolean.decorator';

@InputType()
export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Field()
  name: string;
  @Field(type => [String])
  @IsArray()
  @IsUUID('4', { each: true })
  usersIds: string[];
  @IsBoolean()
  @Field()
  isGroup: boolean = false;
}