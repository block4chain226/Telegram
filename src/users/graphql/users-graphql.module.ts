import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from '../users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';
import { HashService } from '../../hash/hash.service';
import { ContactsService } from '../../contacts/contacts.service';
import { Contact } from '../../contacts/entity/contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [UsersService, HashService, ContactsService, UsersResolver],
})

export class UsersGraphqlModule {
}