import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApiDoc, helmetConfig } from '@didik-mulyadi/nodejs-api-doc';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );

  await app.register(helmet as any, helmetConfig.nodeApiDocHelmetOption);
  await app.register(fastifyCsrf as any);

  const config = new DocumentBuilder()
    .setTitle('Node JS API Docs')
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
