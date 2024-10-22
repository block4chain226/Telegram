import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseUserDto {
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  firstname: string;
  @Expose()
  lastname: string;
}