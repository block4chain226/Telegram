import { CreateUserDto } from '../dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { ResponseUserDto } from '../dto/response-user.dto';

export const createUserDto = (): CreateUserDto => ({
  username: faker.person.firstName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
});

export const genUserRepsonse = (id: string, createDto: CreateUserDto) => {
  const user = { id, ...createDto, role: 'USER' };
  delete user.password;
  return user;
};