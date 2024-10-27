import { HttpStatus } from '@nestjs/common';

export interface IHttpError {
  status: HttpStatus;
  error: string;
}
