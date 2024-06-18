import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // Required for the cookie-based authentication
  app.use(cookieParser());

  // TODO: This CORS configuration is not secure and should be adjusted for production use
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
