import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './env-validation.schema';
import { HttpLoggerMiddleware } from './http-logger.middleware';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { OrganizationMembershipsModule } from './organization-memberships/organization-memberships.module';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as dbSchema from 'src/drizzle/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
    DrizzlePostgresModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      tag: 'DB_PROD',
      useFactory: async (configService: ConfigService) => ({
        postgres: {
          url: configService.get<string>('POSTGRES_URL_PROD'),
        },
        config: {
          schema: dbSchema,
        },
      }),
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    OrganizationMembershipsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
