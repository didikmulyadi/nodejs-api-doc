import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApiDoc, helmetConfig } from '@didik-mulyadi/nodejs-api-doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet(helmetConfig.nodeApiDocHelmetOption));

  const config = new DocumentBuilder()
    .setTitle('Node JS API Docs with Nest Express')
    .setDescription('This package support the api docs with multiple UI')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const nestApiDoc = new NestApiDoc(app, document, {
    defaultUI: 'stoplight',
    customPath: '/docs',
  });
  nestApiDoc.start();
  await app.listen(3000);
}
bootstrap();
