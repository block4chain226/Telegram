import { IntersectionType } from '@nestjs/swagger';
import { FindIdDto } from './find-id.dto';
import { FindParamDto } from './find-param.dto';
import { ValidatePhoneOrUUID } from '../../common/decorators/validators/validate-operands-length.decorator';


export class FindContactDto {
  @ValidatePhoneOrUUID()
  param?: string;
}