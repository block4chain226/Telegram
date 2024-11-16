import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ResponseMessageDto } from '../dto/response-message.dto';

export interface MessageCrudInterface extends BaseCrud<CreateMessageDto, ResponseMessageDto> {
  create(createDto, userId?: string): Promise<ResponseMessageDto>;

  getAllUserMessages(id: string): Promise<ResponseMessageDto[]>;

  getAllChatMessages(id: string): Promise<ResponseMessageDto[]>;
}