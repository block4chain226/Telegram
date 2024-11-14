import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { createMockInstance, genUUID, MockClass } from '../common/test/test.helper';
import { ContactsService } from '../contacts/contacts.service';
import { createUserDto, genUserRepsonse } from './test/test.helper';
import { createContactDto, genContact } from '../contacts/test/helper.test';
import { CreateContactDto } from '../contacts/dto/create-contact.dto';
import { Roles } from './constants/roles.enum';

describe('Users Resolver', () => {
  let resolver: UsersResolver;
  let usersService: MockClass<typeof UsersService>;
  let contactsService: MockClass<typeof ContactsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, {
        provide: UsersService,
        useValue: createMockInstance(UsersService),
      }, {
        provide: ContactsService,
        useValue: createMockInstance(ContactsService),
      }],
    }).compile();
    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<MockClass<typeof UsersService>>(UsersService);
  });

  describe('Create', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });
    it('should create new user', async () => {
      const userId = genUUID();
      const contactId = genUUID();
      const userDto = createUserDto();
      const user0 = { id: userId, email: 'retouch226@gmail.com', role: Roles.USER, phone: '+0961657493', contacts: [] };
      const contact0 = {
        id: 'a7e1dc75-8b87-4b07-aa6a-1d7bf2563ab1',
        phone: '+380961647493',
        ownerId: contactId,
        user: user0,
      };
      const user =
        genUserRepsonse(userId, userDto, contact0);
      let contactDto: CreateContactDto = createContactDto(contactId);
      contactDto['user'] = user;
      const contact = genContact(contactId, userId, contactDto);
      let userResponse = genUserRepsonse(userId, userDto, contact);
      usersService.create.mockResolvedValueOnce(userResponse);
      const res = await resolver.create(userDto);
      expect(res).toEqual(userResponse);
    });
  });
});