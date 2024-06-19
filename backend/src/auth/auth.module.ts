import { Module } from '@nestjs/common';
import { ClerkJwtAuthGuard } from './guards/clerk-jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { ClerkJwtStrategy } from './strategies/clerk-jwt.strategy';

/**
 * The AuthModule is responsible for providing the JWT strategy and guard for authenticating Clerk JWTs.
 * All endpoints are protected by default. Protection can be disabled via a custom decorator.
 */
@Module({
  controllers: [AuthController],
  providers: [
    ClerkJwtStrategy,
    { provide: 'APP_GUARD', useClass: ClerkJwtAuthGuard },
    { provide: 'APP_GUARD', useClass: PermissionsGuard },
    AuthService,
    UsersService,
    OrganizationsService,
  ],
})
export class AuthModule {}
