import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { User } from '../entity/users.entity';
import { HashService } from '../../hash/hash.service';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly datasource: DataSource, private readonly hashService: HashService) {
    this.datasource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { entity } = event;
    console.log("=>(users.subscriber.ts:17) entity", entity.password);
    entity.password = await this.hashService.hashPassword(entity.password);
  }
}