import { HashService } from './hash.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('HashService', () => {
  let service: HashService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash password and return true when compare', async () => {
    const password = '1234Ok';
    const hashedPassword = await service.hashPassword(password);
    const result = await service.comparePassword(password, hashedPassword);
    expect(result).toBe(true);
  });
});