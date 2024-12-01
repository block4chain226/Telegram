import { IChat } from '../interface/chat.interface';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entity/users.entity';
import { Message } from '../../message/entity/message.entity';

@ObjectType()
@Entity('chat')
export class Chat implements IChat {
  @PrimaryGeneratedColumn('uuid', { name: 'chat_id' })
  @Field()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  name: string;

  @Column({ type: 'uuid' })
  @Field()
  owner: string;

  @Field(type => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Field(type => [User])
  @ManyToMany(() => User, user => user.chats, { eager: true })
  @JoinTable({
    name: 'chat_users',
    joinColumn: { name: 'chat_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @Column({ name: 'is_group', type: 'boolean', default: false })
  @Field()
  isGroup: boolean;

  //isGroup
  //no -> max 2 users, cant add users
  //yes -> can add users, infinity users
}