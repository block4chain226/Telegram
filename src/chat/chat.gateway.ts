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
import { Inject, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CacheKey, Cache } from '@nestjs/cache-manager';
import { AuthService } from '../auth/auth.service';
import { JwtSocketGuard } from '../auth/guards/jwt-socket.guard';
import { socketAuthMiddleware } from '../auth/middleware/auth-socket.middleware';
import { ContactsService } from '../contacts/contacts.service';
import { RedisStore } from 'cache-manager-redis-store';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ChatService } from './chat.service';
import { ResponseChatDto } from './dto/response-chat.dto';
import { Chat } from './entity/chat.entity';

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
  ) {
    this.redisStore = cache.store as unknown as RedisStore;
    this.redisClient = this.redisStore.getClient();
  }

  afterInit(server: any): any {
    const AuthMiddleware = socketAuthMiddleware(this.authService);
    server.use(AuthMiddleware);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    const user = client.data.user.sub;
    await this.redisClient.SADD(RedisProperty.usersOnline, user);
    await this.connectClientToAllHisRooms(client);
    client.broadcast.emit(EventEnum.message, `user ${client.id} was connected`);
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

  @SubscribeMessage(EventEnum.lastSeen)
  async getUserLastSeen(client: Socket, userId: string): Promise<void> {
    userId = JSON.parse(userId);
    const lastSeen = await this.redisClient.HMGET(RedisProperty.usersLastSeen, userId['userId']);
    client.emit('lastSeen', lastSeen);
  }

  @SubscribeMessage(EventEnum.joinChat)
  async joinRoom(client: any, chatId: string): Promise<void> {
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

  @SubscribeMessage(EventEnum.message)
  async handleMessage(client: Socket, payload: CreateMessageDto): Promise<any> {
    const payLoadObj = JSON.parse(payload.toString());
    client.to(payLoadObj.chatId).emit(EventEnum.message, payLoadObj.text);
    await this.chatService.sendMessage(payLoadObj, client.data.user.sub);
  }
}

