import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as UserModel } from '../users/entity/users.entity';
import { UserRequestDto } from '../users/dto/user-request.dto';
import { Response } from 'express';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/is-public.decorator';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthLocalGqlGuard } from './guards/auth-local-gql.guard';
import { User } from '../users/decorators/user.decorator';
import { ResponseLoginsDto } from './dto/response-logins.dto';
import { AuthJwtGqlGuard } from './guards/auth-jwt-gql.guard';
import { GqlUser } from '../users/decorators/gql-user.decorator';
import { GqlPublic } from './guards/gql-public.guard';
import { getDefaultValue } from '@nestjs/graphql/dist/schema-builder/helpers/get-default-value.helper';

@ApiTags('auth')
@Resolver(of => UserModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    headers: {
      'Set-Cookie': {
        description: 'JWT cookie', schema: { type: 'string' },
      },
    },
  })
  @Mutation(returns => ResponseLoginsDto)
  // TODO AuthJwtGqlGuard make request object(graphql has not but has context) with username/pass then pass it to localStrategy
  // with validate() which returns user to the @Context
  @UseGuards(AuthLocalGqlGuard)
  async login(@Context() context: any, @Args('loginDto') loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<ResponseLoginsDto> {
    const token = this.authService.login(context.user);
    // res.cookie('token', token, { httpOnly: true, maxAge: 864000000, sameSite: 'strict' });
    return { email: context.user.email, token };
  }

  //TODO JwtAuthGuard extract token from bearer token in jwt.strategy return request.user and we extract it using @User()
  //TODO need todo jwtAuthGuard global
  @UseGuards(AuthJwtGqlGuard)
  @Query(returns => UserModel)
  getProfile(@GqlUser() user: ResponseUserDto, @Args('a') a: string) {
    const { id } = user;
    return this.authService.getProfile(id);
  }
}
