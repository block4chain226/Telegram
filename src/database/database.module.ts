import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync(
    {
      useFactory: (config: ConfigService) => {
        return config.get('database');
      },
      inject: [ConfigService],
    },
  )],
})
export class DatabaseModule {
}