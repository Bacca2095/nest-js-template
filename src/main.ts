import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvVariables } from './config/environment/env-variables';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger();

  const port = config.get<number>(EnvVariables.APP_PORT);
  const prefix = config.get<string>(EnvVariables.APP_PREFIX);

  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.setGlobalPrefix(prefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sse Server')
    .setDescription('The api for sse events')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(prefix, app, document);

  await app.listen(port);

  logger.log(
    `🚀 App running on http://localhost:${port}/${prefix}`,
    'Bootstrap',
  );
}
bootstrap();
