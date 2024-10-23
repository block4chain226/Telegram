import { mock, MockProxy } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { Type } from '@nestjs/common';
import { faker } from '@faker-js/faker';

export type MockRepository = MockProxy<Repository<any>>
export const createMockRepository = () => mock<Repository<any>>();
export type MockClass<T extends Type> = MockProxy<InstanceType<T>>
export const createMockInstance = <T extends Type>(Class: T) => mock<typeof Class>();

export const genUUID = (): string => faker.string.uuid();