import { ResponseUserDto } from './response-user.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRequestDto extends ResponseUserDto {
}