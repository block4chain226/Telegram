import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import confConfiguration from '../configure/conf.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [confConfiguration], envFilePath: ['.env'] }),
  ],
})

export class GlobalModule {
}