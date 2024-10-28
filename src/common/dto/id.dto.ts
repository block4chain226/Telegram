import { IsNotEmpty, IsString } from 'class-validator';

export class IdDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}