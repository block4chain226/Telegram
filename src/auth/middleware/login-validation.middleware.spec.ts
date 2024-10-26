import { Test, TestingModule } from '@nestjs/testing';
import { NestMiddleware } from '@nestjs/common';
import { LoginValidationMiddleware } from './login-validation.middleware';
import { createLoginDto } from '../test/test.helper';
import { createUserDto } from '../../users/test/test.helper';

describe('login-validation middleware', () => {
  let loginValidationMiddleware: NestMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginValidationMiddleware],
    }).compile();
    loginValidationMiddleware = module.get(LoginValidationMiddleware);
  });

  it('should be defined', () => {
    expect(loginValidationMiddleware).toBeDefined();
  });
  it('should validate loginDto', async () => {

    const createDto = createUserDto();
    const loginDto = createLoginDto(createDto);
    const req = { body: { email: 'retouch226@gmail.com', password: '123456' } };
    const res = jest.fn();
    const next = jest.fn();
    await loginValidationMiddleware.use(req, res, next);
  });
});