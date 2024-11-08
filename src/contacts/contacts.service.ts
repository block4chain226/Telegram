import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entity/contacts.entity';
import { Repository } from 'typeorm';
import { IContactsCrud } from './interfaces/contacts-crud.interface';
import { UserRequestDto } from '../users/dto/user-request.dto';
import { ResponseContactDto } from './dto/response-contact.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entity/users.entity';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService implements IContactsCrud {
  constructor(@InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
              @InjectRepository(User) private readonly usersRepository: Repository<User>) {
  }

  async create(createContactDto: CreateContactDto, user: UserRequestDto): Promise<ResponseContactDto> {
    const userEntity = await this.usersRepository.findOneByOrFail({ id: user.id });
    if (user.id === createContactDto.ownerId) throw new ConflictException('you can`t add yourself contact');
    const contact = this.contactsRepository.create(createContactDto);
    contact.user = userEntity;
    const newContact = await this.contactsRepository.save(contact);
    return plainToInstance(ResponseContactDto, newContact);
  }

  async findOne(id: string): Promise<ResponseContactDto> {
    const contact = await this.contactsRepository.findOneByOrFail({ id });
    return plainToInstance(ResponseContactDto, contact);
  }

  async update(id: string, updateDto: UpdateContactDto, user: UserRequestDto): Promise<ResponseContactDto> {
    const contact = await this.contactsRepository.findOneByOrFail({ id });
    if (contact.user.id !== user.id) throw new ConflictException(`you are not owner of ${id} contact`);
    const updated = await this.contactsRepository.update(id, updateDto);
    if (updated.affected < 1) throw new InternalServerErrorException('cant update contact');
    console.log('=>(contacts.service.ts:36) updated', updated);
    return plainToInstance(ResponseContactDto, contact);
  }

  delete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}