import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createUserDto } from '../../src/users/test/test.helper';
import { AppModule } from '../../src/app.module';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // imports: [UsersModule, AuthModule, PassportModule, TypeOrmModule.forRootAsync({
      //   inject: [ConfigService],
      //   useFactory: async (config: ConfigService) => {
      //     return config.get('test_database');
      //   },
      // }),
      //   await ConfigModule.forRoot({
      //     isGlobal: true,
      //     load: [confConfiguration],
      //     envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
      //   }),
      // ],
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let createDto: CreateUserDto;
  let response: any;
  let cookies: string;

  beforeAll(() => {
    createDto = createUserDto();
    createDto.password = '1234Ok';
    createDto.phone = '+380961657419';
  });

  it('Create (POST /)', async () => {
    response = await request(app.getHttpServer())
      .post('/users')
      .send(createDto).expect(HttpStatus.CREATED);
    delete createDto.password;
    expect(response.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
  });

  it('should return user', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: response.body.email, password: '1234Ok' });
    cookies = authResponse.header['set-cookie'];
    cookies = cookies[0].slice(6, cookies[0].indexOf(';'));
    const res = await request(app.getHttpServer())
      .get(`/users/${response.body.id}`).set('Authorization', `Bearer ${cookies}`).expect(200);
    expect(response.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
  });

  it('Delete (POST /)', async () => {
    const soft = true;
    const deleteId = response.body.id;
    await request(app.getHttpServer())
      .delete(`/users/${deleteId}?soft=${soft}`).set('Authorization', `Bearer ${cookies}`).expect(200);
    const res = await request(app.getHttpServer())
      .get(`/users/${response.body.id}`).set('Authorization', `Bearer ${cookies}`).expect(401);
  });

  //Todo
  it('Recover (Patch /recover', async () => {
    const res = await request(app.getHttpServer()).patch('/users/recover')
      .send({ email: response.body.email, password: '1234Ok' }).expect(200);
    expect(res.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
  });
});