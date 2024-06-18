import { Module } from '@nestjs/common';
import { ClerkJwtStrategy } from './clerk-jwt.strategy';
import { ClerkJwtAuthGuard } from './clerk-jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

/**
 * The AuthModule is responsible for providing the JWT strategy and guard for authenticating Clerk JWTs.
 * All endpoints are protected by default. Protection can be disabled via a custom decorator.
 */
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    ClerkJwtStrategy,
    { provide: 'APP_GUARD', useClass: ClerkJwtAuthGuard },
    AuthService,
  ],
})
export class AuthModule {}
