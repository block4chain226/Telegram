import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import confConfiguration from '../configure/conf.configuration';
import { GLOBAL_PIPE_OPTION, RedisOptions } from './global.constant';
import { QueryFailedExceptionFilter } from '../filters/query-failed-exception/query-failed-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { EntityNotFoundException } from '../filters/entity-not-found-exception/entity-not-found-exception';
import { redisStore } from 'cache-manager-redis-yet';
import { createClient } from '@redis/client';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [confConfiguration],
    envFilePath: '/Users/admin/Documents/backend/nestjs/telegram/.env',
  }), CacheModule.registerAsync(RedisOptions)],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({ url: 'redis://localhost:6379' });
        return await client.connect();
      },
    },
    { provide: 'APP_PIPE', useValue: new ValidationPipe(GLOBAL_PIPE_OPTION) },
    // { provide: 'APP_GUARD', useClass: AuthJwtGuard },
    { provide: 'APP_FILTER', useClass: QueryFailedExceptionFilter },
    { provide: 'APP_FILTER', useClass: EntityNotFoundException },
    // { provide: 'APP_INTERCEPTOR', useClass: CacheInterceptor },
  ],
  exports: ['REDIS_CLIENT'],
})

export class GlobalModule {
}


// CacheModule.register({
//   isGlobal: true,
//   ttl: 60 * 60 * 24 * 1000,
//   store: redisStore,
// })