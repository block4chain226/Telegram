import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { createUserDto } from '../../src/users/test/test.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import confConfiguration from '../../src/configure/conf.configuration';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
          return config.get('test_database');
        },
      }),
        await ConfigModule.forRoot({
          isGlobal: true,
          load: [confConfiguration],
          envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create (POST /)', async () => {
    const createDto = createUserDto();
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createDto);
    delete createDto.password;
    expect(response.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
  });
});