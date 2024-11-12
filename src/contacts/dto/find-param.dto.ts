import { IsOptional, IsPhoneNumber } from 'class-validator';

export class FindParamDto {
  @IsOptional()
  @IsPhoneNumber()
  param?: string;
}