import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { User } from '../users/entity/users.entity';
import { MessageService } from './message.service';
import { ChatModule } from '../chat/chat.module';


@Module({
  imports: [TypeOrmModule.forFeature([Message, User]), forwardRef(() => ChatModule)],
  providers: [MessageService],
  exports: [MessageService],
})

export class MessageModule {
}