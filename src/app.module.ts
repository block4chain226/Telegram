import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LoginValidationMiddleware } from './auth/middleware/login-validation.middleware';
import { ContactsModule } from './contacts/contacts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    include: [ContactsModule, UsersModule, AuthModule, ChatModule],
    autoSchemaFile: 'schema.gql',
    subscriptions: {
      'graphql-ws': true,
    },
    playground:true
  }), GlobalModule, DatabaseModule, AuthModule, ChatModule, UsersModule, ContactsModule, ChatModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoginValidationMiddleware).forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
