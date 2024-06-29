import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import ngrok from '@ngrok/ngrok';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Required for the Clerk Webhook
  });
  const configService = app.get(ConfigService);

  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // Required for the cookie-based authentication
  app.use(cookieParser());

  // TODO: This CORS configuration is not secure and should be adjusted for production use
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  // OpenAPI (Swagger) Documentation
  const config = new DocumentBuilder()
    .setTitle('SaaS Skeleton')
    .setVersion('1.0')
    // .addBearerAuth({ type: 'oauth2', name: 'authorization' })
    .addBearerAuth()
    .addCookieAuth(configService.get('CLERK_SESSION_COOKIE_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Save OpenAPI (Swagger) specification to disk
  writeFileSync('openapi-spec.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('PORT'));

  // NGROK Tunnel
  try {
    ngrok.authtoken(configService.get('NGROK_AUTH_TOKEN'));
    await ngrok
      .connect({
        addr: 3000,
        authtoken_from_env: true,
        domain: process.env.NGROK_DOMAIN,
      })
      .then((listener) =>
        logger.log(`ngrok tunnel opened at ${listener.url()}`),
      );
  } catch (err) {
    logger.error(`Error opening ngrok tunnel: ${err}`);
  }

  // Database Migration
  try {
    const migrationClient = postgres(configService.get('POSTGRES_URL_PROD'));
    await migrate(drizzle(migrationClient), {
      migrationsFolder: './drizzle',
      migrationsSchema: 'public',
      migrationsTable: 'migrations',
    });
    logger.log('Database migrated successfully');
  } catch (err) {
    logger.error('Error migrating database', err);
  }
}
bootstrap();
