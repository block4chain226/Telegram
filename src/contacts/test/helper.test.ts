import { faker } from '@faker-js/faker';

export const createContactDto = (ownerId: string) => ({
  ownerId,
  userId: null,
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
});