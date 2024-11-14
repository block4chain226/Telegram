import { IsBoolean } from '../../common/decorators/validators/IsBoolean.decorator';
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteUserDto {
  @IsNotEmpty()
  @IsBoolean()
  @Field({ nullable: true })
  soft: boolean = true;
}