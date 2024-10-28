import { IsBoolean as IsBooleanDefault, ValidationOptions } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { ToBoolean } from '../transformators/is-boolean.decorator';

export const IsBoolean = (validationOptions?: ValidationOptions): PropertyDecorator => applyDecorators(IsBooleanDefault(), ToBoolean());