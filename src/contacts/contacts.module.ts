import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contacts.entity';
import { User } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  providers: [ContactsService],
  exports: [ContactsService],
})

export class ContactsModule {
}