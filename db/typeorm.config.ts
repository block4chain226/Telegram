import {ConfigService} from '@nestjs/config';
import {DataSource} from 'typeorm';

const configService = new ConfigService()

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: `postgres`,
    password: `796163`,
    database: `telegram`,
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    // autoLoadEntities: true,
    // synchronize: false,
})