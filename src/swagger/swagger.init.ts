import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerInit = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Telegram').setDescription('Telegram')
    .addBearerAuth().addSecurityRequirements('bearer').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Telegram', app, document);
};