import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UsersService } from '../users.service';
import { ContactsService } from '../../contacts/contacts.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { LoginDto } from '../../auth/dto/login.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateContactDto } from '../../contacts/dto/create-contact.dto';
import { UserRequestDto } from '../dto/user-request.dto';
import { ResponseContactDto } from '../../contacts/dto/response-contact.dto';
import { FindContactDto } from '../../contacts/dto/find-contact.dto';
import { IdDTO } from '../../common/dto/id.dto';
import { UpdateContactDto } from '../../contacts/dto/update-contact.dto';
import { User } from '../decorators/user.decorator';
import { User as UserModel } from '../../users/entity/users.entity';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { Public } from '../../auth/decorators/is-public.decorator';
import { Args, Query, Resolver } from '@nestjs/graphql';


@ApiTags('users')
// @UseInterceptors(CacheInterceptor)
@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly contactsService: ContactsService) {
  }

  // @Public()
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
  //   return this.usersService.create(createUserDto);
  // }

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

  // @Patch(':id')
  // update(@Param() { id }: IdDTO, @Body() updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
  //   return this.usersService.update(id, updateUserDto);
  // }

  // TODO test user can add himself to contact
  // @Post('/contacts')
  // createContact(@Body() createContactDto: CreateContactDto, @User() user: UserRequestDto): Promise<ResponseContactDto> {
  //   return this.contactsService.create(createContactDto, user);
  // }

  // @Get('contacts/:param')
  // getContact(@Param() { param }: FindContactDto): Promise<ResponseContactDto> {
  //   return this.contactsService.findOne(param);
  // }

  // TODO need to check if user is owner this contact's owner
  // @Patch('contacts/:id')
  // updateContact(@Param() { id }: IdDTO, @Body() updateDto: UpdateContactDto, @User() user: UserRequestDto): Promise<ResponseContactDto> {
  //   console.log('=>(users.controller.ts:75) user', user);
  //   return this.contactsService.update(id, updateDto, user);
  // }

  // @Delete(':id')
  // delete(@Param() { id }: IdDTO, @Query() { soft }: DeleteUserDto, @User() user: UserRequestDto): Promise<string> {
  //   return this.usersService.delete(id, soft, user);
  // }
}
