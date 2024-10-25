import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const loginDto = plainToInstance(LoginDto, req.body);
    const errors = await validate(loginDto, { whitelist: true });
    if (errors.length) throw new BadRequestException(errors);
    next();
  }
}