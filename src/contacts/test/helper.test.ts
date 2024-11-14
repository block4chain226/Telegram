import { faker } from '@faker-js/faker';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ResponseContactDto } from '../dto/response-contact.dto';

export const createContactDto = (ownerId: string) => ({
  ownerId,
  userId: null,
  phone: faker.phone.number(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
});

export const genContact = (id: string, userId: string, createDto: CreateContactDto) => ({
  id,
  user: createDto['user'],
  ownerId: createDto['ownerId'],
  firstname: createDto.firstname,
  lastname: createDto.lastname,
  phone: createDto.phone,
});