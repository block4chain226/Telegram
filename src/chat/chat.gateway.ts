import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventEnum, RedisProperty } from './interface/event.enum';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { Inject } from '@nestjs/common';
import { CacheKey, Cache } from '@nestjs/cache-manager';
import { AuthService } from '../auth/auth.service';
import { socketAuthMiddleware } from '../auth/middleware/auth-socket.middleware';
import { ContactsService } from '../contacts/contacts.service';
import { RedisStore } from 'cache-manager-redis-store';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';
import { MessageService } from '../message/message.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server;
  private readonly redisStore!: RedisStore;
  private readonly redisClient;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly authService: AuthService,
    private readonly contactsService: ContactsService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {
    this.redisStore = cache.store as unknown as RedisStore;
    this.redisClient = this.redisStore.getClient();
  }

  afterInit(server: any): any {
    const AuthMiddleware = socketAuthMiddleware(this.authService);
    server.use(AuthMiddleware);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    const user = client.data.user.sub;
    await this.redisClient.SADD(RedisProperty.usersOnline, user);
    await this.connectClientToAllHisRooms(client);
    client.broadcast.emit(EventEnum.message, `user ${client.id} was connected`);
    await this.undeliveredMessages(client, user);
  }

  @CacheKey(EventEnum.getOfline)
  // @UseInterceptors(CacheInterceptor)
  async handleDisconnect(client: any): Promise<any> {
    await this.redisClient.LPUSH('users:list', 'hash100');
    const userOnline = client.data.user.sub;
    this.redisClient.SREM(RedisProperty.usersOnline, userOnline);
    this.redisClient.HSET(RedisProperty.usersLastSeen, client.data.user.sub, Date.now());
    client.broadcast.emit(EventEnum.message, `user ${client.id} was disconnected`);
    const onlineUsers = await this.redisClient.SMEMBERS(RedisProperty.usersOnline);
    client.broadcast.emit(EventEnum.getOnline, onlineUsers);
  }

  @SubscribeMessage(EventEnum.message)
  async handleMessage(client: Socket, payload: CreateMessageDto): Promise<any> {
    const payLoadObj = JSON.parse(payload.toString());
    client.to(payLoadObj.chatId).emit(EventEnum.message, payLoadObj.text);
    await this.chatService.sendMessage(payLoadObj, client.data.user.sub);
  }

  async undeliveredMessages(client: Socket, userId: string) {
    let chats = await this.chatService.getUserChats(userId);
    const chatsIds = chats.map(chat => chat.id);
    const lastSeen = await this._getUserLastSeen(userId);
    const undeliveredMessages = await this.messageService.getAllUndeliveredMessages(chatsIds, userId, Number(lastSeen[0]));
    undeliveredMessages.map(message => {
      client.emit(EventEnum.message, message.text);
    });
  }

  @SubscribeMessage(EventEnum.lastSeen)
  async getUserLastSeen(client: Socket, userId: string): Promise<void> {
    userId = JSON.parse(userId);
    const lastSeen = await this._getUserLastSeen(userId['userId']);
    client.emit('lastSeen', lastSeen);
  }

  async _getUserLastSeen(userId: string): Promise<string> {
    return await this.redisClient.HMGET(RedisProperty.usersLastSeen, userId);
  }

  @SubscribeMessage(EventEnum.joinChat)
  async joinRoom(client: Socket, chatId: string): Promise<void> {
    await client.join(chatId);
    client.to(chatId).emit(EventEnum.joinChat, `user ${client.data.user.sub} joined`);
  }

  async connectClientToAllHisRooms(client: Socket): Promise<void> {
    const userId = client.data.user.sub;
    const chats = await this.chatService.getUserChats(userId);
    chats.forEach((chat: Chat) => {
      this.joinRoom(client, chat.id);
    });
  }


}

