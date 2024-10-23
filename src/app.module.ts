import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [GlobalModule, UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
