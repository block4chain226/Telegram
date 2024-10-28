import { IsBoolean } from '../../common/decorators/validators/IsBoolean.decorator';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsBoolean()
  soft: boolean = true;
}