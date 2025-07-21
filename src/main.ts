import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Api endpoint prefix
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Decorators
    forbidNonWhitelisted: true, // Errors
    transform: true, // Transform payloads to DTOs
  }));

  // Init
  await app.listen(process.env.PORT);
}
bootstrap();
