import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import confConfiguration from '../configure/conf.configuration';
import { GLOBAL_PIPE_OPTION } from './global.constant';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [confConfiguration],
    envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
  })],
  providers: [{ provide: 'APP_PIPE', useValue: new ValidationPipe(GLOBAL_PIPE_OPTION) }],
})

export class GlobalModule {
}