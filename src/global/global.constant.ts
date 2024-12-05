import { ValidationPipeOptions } from '@nestjs/common';
import { CacheModuleAsyncOptions } from '@nestjs/common/cache';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';


export const GLOBAL_PIPE_OPTION: ValidationPipeOptions = { transform: true, whitelist: true };

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
      },
      ttl: 20 * 1000,
    });
    return { store: () => store };
  },
  inject: [ConfigService],
};

//redis-19445.c293.eu-central-1-1.ec2.redns.redis-cloud.com: