import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IHashService } from './interfaces/hash-service.interface';

@Injectable()
export class HashService implements IHashService {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}