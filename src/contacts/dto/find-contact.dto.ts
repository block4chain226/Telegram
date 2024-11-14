import { ValidatePhoneOrUUID } from '../../common/decorators/validators/validate-operands-length.decorator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindContactDto {
  @Field()
  @ValidatePhoneOrUUID()
  param?: string;
}