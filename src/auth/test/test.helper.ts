import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export const createLoginDto = (user: CreateUserDto) => ({
  email: user.email,
  password: user.password,
});

export const genHash = () => faker.string.hexadecimal({ length: 64 });