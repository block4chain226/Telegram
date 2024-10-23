import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import confConfiguration from '../configure/conf.configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [confConfiguration],
    envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
  })],
})

export class GlobalModule {
}