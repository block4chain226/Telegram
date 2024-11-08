import { faker } from '@faker-js/faker';
import { CreateContactDto } from '../dto/create-contact.dto';

export const createContactDto = (ownerId: string) => ({
  ownerId,
  userId: null,
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
});

export const genContact = (id: string, userId: string, createDto: CreateContactDto) => ({
  id, ownerId: createDto.ownerId, userId, firstname: createDto.firstname, lastname: createDto.lastname,
});