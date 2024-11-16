import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { ResponseMessageDto } from './dto/response-message.dto';
import { ChatService } from '../chat/chat.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly messageRepository: Repository<Message>,
              @Inject(forwardRef(() => ChatService)) private readonly chatService: ChatService) {
  }

  async create(createDto: CreateMessageDto, userId: string): Promise<ResponseMessageDto> {
    const chat = await this.chatService.findOne(createDto.chatId);
    const messageDto = { ...createDto, sender: userId, chat };
    const message = this.messageRepository.create(messageDto);
    const newMessage = await this.messageRepository.save(messageDto);
    if (!newMessage) throw new InternalServerErrorException('message was not created');
    return plainToInstance(ResponseMessageDto, newMessage);
  }
}