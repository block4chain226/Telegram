import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ResponseContactDto } from '../dto/response-contact.dto';
import { UserRequestDto } from '../../users/dto/user-request.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';

export interface IContactsCrud extends BaseCrud<CreateContactDto, ResponseContactDto> {
  create(createDto: CreateContactDto, user?: UserRequestDto): Promise<ResponseContactDto>;

  update(id: string, updateDto: UpdateContactDto, user?: UserRequestDto): Promise<ResponseContactDto>;
}