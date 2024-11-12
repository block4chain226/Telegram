import { IsOptional, IsUUID } from 'class-validator';

export class FindIdDto {
  @IsOptional()
  @IsUUID()
  param?: string;
}