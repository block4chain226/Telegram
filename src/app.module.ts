import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GlobalModule, UsersModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
