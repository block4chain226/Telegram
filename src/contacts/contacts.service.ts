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
import { ContactKey, ContactKeys } from './types/constant.type';

@Injectable()
export class ContactsService implements IContactsCrud {
  constructor(@InjectRepository(Contact) private readonly contactsRepository: Repository<Contact>,
              @InjectRepository(User) private readonly usersRepository: Repository<User>) {
  }

  async create(createContactDto: CreateContactDto, user: UserRequestDto): Promise<ResponseContactDto> {
    const userEntity = await this.usersRepository.findOneByOrFail({ id: user.id });
    const contactEntity = await this.usersRepository.findOneByOrFail({ phone: createContactDto.phone });
    if (user.id === contactEntity.id) throw new ConflictException('you can`t add yourself contact');
    if (createContactDto.firstname === undefined) {
      createContactDto.firstname = contactEntity.firstname;
    }
    if (createContactDto.lastname === undefined) {
      createContactDto.lastname = contactEntity.lastname;
    }
    createContactDto['ownerId'] = contactEntity.id;
    const contact = this.contactsRepository.create(createContactDto);
    contact.user = userEntity;
    const newContact = await this.contactsRepository.save(contact);
    return plainToInstance(ResponseContactDto, newContact);
  }

  // TODO findOneBy, refactor interface
  async findOne(param: string): Promise<ResponseContactDto> {
    const property: ContactKey = this.getPropertyName(param);
    const contact = await this.contactsRepository.findOneByOrFail({ [property]: param });
    return plainToInstance(ResponseContactDto, contact);
  }

  async update(id: string, updateDto: UpdateContactDto, user: UserRequestDto): Promise<ResponseContactDto> {
    const contact = (await this.contactsRepository.find({ where: { id }, relations: ['user'] }))[0];
    if (contact.user.id !== user.id) throw new ConflictException(`you are not owner of ${id} contact`);
    const updated = await this.contactsRepository.update(id, updateDto);
    if (updated.affected < 1) throw new InternalServerErrorException('cant update contact');
    return plainToInstance(ResponseContactDto, contact);
  }

  delete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  getPropertyName(property: string): ContactKey {
    if (property.indexOf(ContactKeys.phone) !== -1) return 'phone';
    else if (property.indexOf(ContactKeys.username) !== -1) return 'username';
    return 'id';
  }
}