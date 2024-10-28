import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      return config.get('test_database');
    },
  })],
})
export class DatabaseModule {
}