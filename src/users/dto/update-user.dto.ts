// import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Field, PartialType, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
}