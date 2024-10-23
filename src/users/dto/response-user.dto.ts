import { Exclude, Expose } from 'class-transformer';
import { Roles } from '../constants/roles.enum';

@Exclude()
export class ResponseUserDto {
  @Expose()
  id: string;
  @Expose()
  username?: string;
  @Expose()
  email: string;
  @Expose()
  role: Roles;
  @Expose()
  firstname?: string;
  @Expose()
  lastname?: string;
  @Expose()
  phone: string;
}