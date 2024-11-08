import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  @IsOptional()
  @IsString()
  firstname?: string;
  @IsOptional()
  @IsString()
  lastname?: string;
}