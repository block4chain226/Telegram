import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createUserDto } from '../../src/users/test/test.helper';
import { AppModule } from '../../src/app.module';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { createContactDto } from '../../src/contacts/test/helper.test';
import { CreateContactDto } from '../../src/contacts/dto/create-contact.dto';

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
  let ownerContact: CreateUserDto;
  let createContact: CreateContactDto;
  let response: any;
  let responseOwner: any;
  let cookies: string;
  let newContact: any;

  beforeAll(() => {
    createDto = createUserDto();
    ownerContact = createUserDto();
    ownerContact.password = '1234Ok';
    createDto.password = '1234Ok';
    createDto.phone = '+380961657420';
    ownerContact.phone = '+380961677420';
  });
  describe.skip('Users', () => {
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

    it('Recover (Patch /recover', async () => {
      const res = await request(app.getHttpServer()).patch('/users/recover')
        .send({ email: response.body.email, password: '1234Ok' }).expect(200);
      expect(res.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
    });
  });

  describe('Contacts', () => {
    it('Create (POST /)', async () => {
      response = await request(app.getHttpServer())
        .post('/users')
        .send(createDto).expect(HttpStatus.CREATED);
      delete createDto.password;
      expect(response.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
    });

    it('Create (POST /)', async () => {
      responseOwner = await request(app.getHttpServer())
        .post('/users')
        .send(ownerContact).expect(HttpStatus.CREATED);
      delete ownerContact.password;
      expect(responseOwner.body).toEqual({ id: responseOwner.body.id, ...ownerContact, role: 'USER' });
    });

    it('Create Contact (POST /contacts)', async () => {
      createContact = createContactDto(responseOwner.body.id);
      const auth = await request(app.getHttpServer()).post('/auth/login').send({
        email: response.body.email,
        password: '1234Ok',
      });
      cookies = auth.header['set-cookie'];
      cookies = cookies[0].slice(6, cookies[0].indexOf(';'));
      newContact = await request(app.getHttpServer()).post('/users/contacts').send(createContact).send(response.body)
        .set('Authorization', `Bearer ${cookies}`).expect(HttpStatus.CREATED);
    });
    it('Delete (DELETE /)', async () => {
      const soft = true;
      const deleteId = response.body.id;
      await request(app.getHttpServer())
        .delete(`/users/${deleteId}?soft=${soft}`).set('Authorization', `Bearer ${cookies}`).expect(200);
    });
    it('should return UNAUTHORIZED', async () => {
      const getResp = await request(app.getHttpServer()).get(`/users/contacts/${newContact.body.id}`).expect(HttpStatus.UNAUTHORIZED);
    });
    it('Recover (Patch /recover', async () => {
      const res = await request(app.getHttpServer()).patch('/users/recover')
        .send({ email: response.body.email, password: '1234Ok' })
        .expect(200);
      expect(res.body).toEqual({ id: response.body.id, ...createDto, role: 'USER' });
    });
    it('should return not found exception', async () => {
      const auth = await request(app.getHttpServer()).post('/auth/login').send({
        email: response.body.email,
        password: '1234Ok',
      });
      cookies = auth.header['set-cookie'];
      cookies = cookies[0].slice(6, cookies[0].indexOf(';'));
      const getResp = await request(app.getHttpServer()).get(`/users/contacts/${newContact.body.id}`)
        .set('Authorization', `Bearer ${cookies}`).expect(200);
    });
  });
});