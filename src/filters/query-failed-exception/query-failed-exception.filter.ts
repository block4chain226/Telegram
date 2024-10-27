import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { IDatabaseError } from '../interfaces/database-error.interface';
import { HTTP_ERROR } from '../constants/HTTP_ERROR.constant';
import { IHttpError } from '../interfaces/http-error.interface';
import { extractFieldName, extractFieldValue } from '../utils/filters.util';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: IDatabaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const { code, detail, table } = exception;
    const fieldName = extractFieldName(detail);
    const fieldValue = extractFieldValue(detail);
    const meta = { fieldName, fieldValue };
    const { error, description } = this.createError(code, detail);
    response.status(error.status).json({ status: error.status, description, message: detail, table, meta });
  }

  private createError(code: string, details: string) {
    let error: IHttpError;
    let description: string;
    switch (code) {
      case this.DatabaseErrorCodes.UNIQUE_VIOLATION:
        if (details.includes(this.MessageSnippets.UNIQUE_VIOLATION)) {
          error = HTTP_ERROR.BAD_REQUEST;
          description = `value ${this.MessageSnippets.UNIQUE_VIOLATION}`;
        }
        break;
    }
    return { error, description };
  }

  private readonly DatabaseErrorCodes = {
    UNIQUE_VIOLATION: '23505',
  } as const satisfies Record<string, string>;

  private readonly MessageSnippets = {
    'UNIQUE_VIOLATION': 'already exists',
  } as const satisfies Record<string, string>;

  private readonly Description = {
    'UNIQUE_VIOLATION': 'unique constraint',
  };
}
