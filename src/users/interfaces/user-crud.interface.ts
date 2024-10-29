import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { Roles } from '../constants/roles.enum';
import { User } from '../entity/users.entity';
import { UserRequestDto } from '../dto/user-request.dto';
import { LoginDto } from '../../auth/dto/login.dto';

export interface UserCrud extends BaseCrud<CreateUserDto, ResponseUserDto> {
  delete(id: string, soft?: boolean, user?: UserRequestDto): Promise<string>;

  recover(loginDto: LoginDto): Promise<ResponseUserDto>;
}