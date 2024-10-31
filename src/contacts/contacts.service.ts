import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entity/contacts.entity';
import { Repository } from 'typeorm';
import { IContactsCrud } from './interfaces/contacts-crud.interface';
import { UserRequestDto } from '../users/dto/user-request.dto';
import { ResponseContactDto } from './dto/response-contact.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entity/users.entity';

@Injectable()
export class ContactsService implements IContactsCrud {
  constructor(@InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
              @InjectRepository(User) private readonly usersRepository: Repository<User>) {
  }

  async create(createContactDto: CreateContactDto, user: UserRequestDto): Promise<ResponseContactDto> {
    const userEntity = await this.usersRepository.findOneByOrFail({ id: user.id });
    const contact = this.contactsRepository.create(createContactDto);
    contact.user = userEntity;
    const newContact = await this.contactsRepository.save(contact);
    return plainToInstance(ResponseContactDto, newContact);
  }

  findOne(id: string): Promise<ResponseContactDto> {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateDto: CreateContactDto): Promise<ResponseContactDto> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}