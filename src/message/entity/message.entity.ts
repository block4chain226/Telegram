import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IMessage } from '../interface/message.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from '../../chat/entity/chat.entity';

@ObjectType()
@Entity('messages')
export class Message implements IMessage {
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
  @Field()
  id: string;
  @Column({ type: 'uuid' })
  @Field()
  sender: string;
  @Column({ type: 'varchar', length: 500 })
  @Field()
  text: string;

  @Field()
  @CreateDateColumn()
  timestamp: Date;

  @Field(type => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;
}