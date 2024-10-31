import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
  @IsOptional()
  @IsString()
  firstname?: string;
  @IsOptional()
  @IsString()
  lastname?: string;
}