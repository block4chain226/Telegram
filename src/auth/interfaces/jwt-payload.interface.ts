import { Roles } from '../../users/constants/roles.enum';

export interface JwtPayload {
  id: string
  username?: string,
  email: string,
  firstname?: string,
  lastname?: string,
  phone: string
  role: Roles;
}