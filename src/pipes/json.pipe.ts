import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JsonPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): any {
    if (typeof value !== 'string')
      return value;
    return JSON.parse(value);
  }
}