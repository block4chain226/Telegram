import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import confConfiguration from '../configure/conf.configuration';
import { GLOBAL_PIPE_OPTION, RedisOptions } from './global.constant';
import { AuthJwtGuard } from '../auth/guards/auth-jwt.guard';
import { QueryFailedExceptionFilter } from '../filters/query-failed-exception/query-failed-exception.filter';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { EntityNotFoundException } from '../filters/entity-not-found-exception/entity-not-found-exception';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [confConfiguration],
    envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
  }), CacheModule.register(RedisOptions)],
  providers: [
    { provide: 'APP_PIPE', useValue: new ValidationPipe(GLOBAL_PIPE_OPTION) },
    // { provide: 'APP_GUARD', useClass: AuthJwtGuard },
    { provide: 'APP_FILTER', useClass: QueryFailedExceptionFilter },
    { provide: 'APP_FILTER', useClass: EntityNotFoundException },
    // { provide: 'APP_INTERCEPTOR', useClass: CacheInterceptor },
  ],
})

export class GlobalModule {
}