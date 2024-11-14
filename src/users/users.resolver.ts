import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { ContactsService } from '../contacts/contacts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateContactDto } from '../contacts/dto/create-contact.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { ResponseContactDto } from '../contacts/dto/response-contact.dto';
import { FindContactDto } from '../contacts/dto/find-contact.dto';
import { IdDTO } from '../common/dto/id.dto';
import { UpdateContactDto } from '../contacts/dto/update-contact.dto';
import { User } from './decorators/user.decorator';
import { User as UserModel } from './entity/users.entity';
import { DeleteUserDto } from './dto/delete-user.dto';
import { Public } from '../auth/decorators/is-public.decorator';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Contact } from '../contacts/entity/contacts.entity';
import { GqlUser } from './decorators/gql-user.decorator';
import { AuthJwtGqlGuard } from '../auth/guards/auth-jwt-gql.guard';


@ApiTags('users')
// @UseInterceptors(CacheInterceptor)
@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly contactsService: ContactsService) {
  }

  @Public()
  @Mutation(returns => UserModel)
  create(@Args('createUserDto') createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    console.log('=>(users.resolver.ts:46) createUserDto', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Query(returns => UserModel)
  async findOne(@Args('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  //TODO you should login after recover, maybe token was expired
  // @Public()
  // @Patch('recover')
  // recover(@Body() loginDto: LoginDto): Promise<ResponseUserDto> {
  //   return this.usersService.recover(loginDto);
  // }

  @Public()
  @Mutation(returns => UserModel)
  update(@Args('id') { id }: IdDTO, @Args('updateUserDto') updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  // TODO test user can add himself to contact
  @Mutation(returns => UserModel)
  @UseGuards(AuthJwtGqlGuard)
  createContact(@Args('createContactDto') createContactDto: CreateContactDto, @GqlUser() user: UserRequestDto): Promise<ResponseContactDto> {
    console.log('createContactDto', createContactDto);
    return this.contactsService.create(createContactDto, user);
  }

  @Query(returns => UserModel)
  @ResolveField(returns => [Contact])
  async getContact(@Parent() user): Promise<ResponseContactDto> {
    const { id } = user;
    return this.contactsService.findOne(id);
  }

  // TODO need to check if user is owner this contact's owner
  @Mutation(returns => UserModel)
  @UseGuards(AuthJwtGqlGuard)
  updateContact(@Args('IdDTO') { id }: IdDTO, @Args('updateDto') updateDto: UpdateContactDto, @GqlUser() user: UserRequestDto): Promise<ResponseContactDto> {
    console.log('=>(users.controller.ts:75) user', id, updateDto);
    return this.contactsService.update(id, updateDto, user);
  }

  @Mutation(returns => UserModel)
  delete(@Args('idDTO') { id }: IdDTO, @Args('soft') { soft }: DeleteUserDto, @User() user: UserRequestDto): Promise<string> {
    return this.usersService.delete(id, soft, user);
  }
}
