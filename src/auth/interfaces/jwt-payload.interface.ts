import { Roles } from '../../users/constants/roles.enum';

export interface JwtPayload {
  sub: string
  username?: string,
  email: string,
  firstname?: string,
  lastname?: string,
  phone: string
  role: Roles;
}