import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ResponseContactDto } from '../dto/response-contact.dto';
import { UserRequestDto } from '../../users/dto/user-request.dto';

export interface IContactsCrud extends BaseCrud<CreateContactDto, ResponseContactDto> {
  create(createDto: CreateContactDto, user?: UserRequestDto): Promise<ResponseContactDto>;
}