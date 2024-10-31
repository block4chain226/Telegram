import { HttpStatus } from '@nestjs/common';
import { IHttpError } from '../interfaces/http-error.interface';

export const HTTP_ERROR = {
  'BAD_REQUEST': {
    status: HttpStatus.BAD_REQUEST,
    error: 'bad request',
  },
  'CONFLICT': {
    status: HttpStatus.BAD_REQUEST,
    error: 'bad request',
  },
  'NOT_FOUND': {
    status: HttpStatus.NOT_FOUND,
    error: 'not found',
  },
} as const as Record<string, IHttpError>;

export type HttpError = (typeof HTTP_ERROR)[keyof typeof HTTP_ERROR];