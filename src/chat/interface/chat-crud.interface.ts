import { BaseCrud } from '../../interfaces/base-crud.interface';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ResponseChatDto } from '../dto/response-chat.dto';
import { ChatInviteDto } from '../dto/chat-invite.dto';

export interface ChatCrud extends BaseCrud<CreateChatDto, ResponseChatDto> {
  create(createChatDto: CreateChatDto, userId?: string): Promise<ResponseChatDto>;

  inviteToChat(chatInviteDto: ChatInviteDto, ownerId: string): Promise<ResponseChatDto>;
}