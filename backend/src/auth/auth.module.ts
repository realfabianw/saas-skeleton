import { Module } from '@nestjs/common';
import { ClerkJwtStrategy } from './clerk-jwt.strategy';
import { ClerkJwtAuthGuard } from './clerk-jwt-auth.guard';

/**
 * The AuthModule is responsible for providing the JWT strategy and guard for authenticating Clerk JWTs.
 * All endpoints are protected by default. Protection can be disabled via a custom decorator.
 */
@Module({
  imports: [],
  controllers: [],
  providers: [
    ClerkJwtStrategy,
    { provide: 'APP_GUARD', useClass: ClerkJwtAuthGuard },
  ],
})
export class AuthModule {}
