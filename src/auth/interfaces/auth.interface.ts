import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from './jwt-payload.interface';

export interface IAuth {
  validateLocal(user: LoginDto): Promise<ResponseUserDto>;

  getProfile(id: string): Promise<ResponseUserDto>;

  login(jwtPayload: JwtPayload): string;
}