import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
import { HTTP_ERROR } from '../constants/HTTP_ERROR.constant';
import { extractFromText } from '../../common/utils/regex.util';

@Catch(EntityNotFoundError)
export class EntityNotFoundException implements ExceptionFilter {
  private readonly regEx = /type\s\"(\w+)\"/;

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const { status, error } = HTTP_ERROR.NOT_FOUND;
    const entity = this.extractMessageData(exception.message);
    response.status(status).json({ statusCode: status, entity, error });
  }

  private extractMessageData(message: string) {
    const entity = extractFromText(message, this.regEx);
    return { entity };
  }
}