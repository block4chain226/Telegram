import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoginValidationMiddleware } from './auth/middleware/login-validation.middleware';
import { ContactsModule } from './contacts/contacts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    include: [ContactsModule, UsersModule, AuthModule],
    autoSchemaFile: 'schema.gql',
  }), GlobalModule, DatabaseModule, AuthModule, UsersModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoginValidationMiddleware).forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
