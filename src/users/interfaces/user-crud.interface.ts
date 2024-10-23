import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';

export interface UserCrud extends BaseCrud<CreateUserDto, ResponseUserDto> {
  delete(id: string, soft?: boolean): Promise<string>;
}