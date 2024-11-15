import { IChat } from '../interface/chat.interface';
import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entity/users.entity';
import { Message } from './message.entity';

@ObjectType()
@Entity('chat')
export class Chat implements IChat {
  @PrimaryGeneratedColumn('uuid', { name: 'chat_id' })
  @Field()
  id: string;

  @Field(type => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Field(type => [User])
  @ManyToMany(() => User, user => user.chats)
  @JoinTable({
    name: 'chat_users',
    joinColumn: { name: 'chat_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];
}