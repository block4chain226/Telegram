import { User } from '../../users/entity/users.entity';
import { Message } from '../entity/message.entity';


export interface IChat {
  id: string,
  users: User[]
  messages: Message[]
}