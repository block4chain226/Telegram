import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseContactDto {
  @Expose()
  id: string;
  @Expose()
  ownerId: string;
  @Expose()
  userId: string;
  @Expose()
  firstname?: string;
  @Expose()
  lastname?: string;
}