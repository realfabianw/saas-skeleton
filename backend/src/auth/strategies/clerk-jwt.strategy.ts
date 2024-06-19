import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import ClerkJwtPayload from '../entites/clerk-jwt.payload';
import { Permission } from '../entites/permission.enum';
import { Role } from '../entites/role.enum';

/**
 * The JWT strategy for authenticating Clerk JWTs.
 * JWTs are extracted from the request session token, which is transmitted as a cookie and verified manually.
 * https://clerk.com/docs/backend-requests/handling/manual-jwt
 */
@Injectable()
export class ClerkJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private static readonly logger = new Logger(ClerkJwtStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let data = null;
          if (request && request.cookies) {
            data =
              request.cookies[
                this.configService.get<string>('CLERK_SESSION_COOKIE_NAME')
              ];
          }
          return data;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),

      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `${configService.get<string>('CLERK_ISSUER_URL')}/.well-known/jwks.json`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
      }),
      issuer: configService.get<string>('CLERK_ISSUER_URL'),
      algorithms: ['RS256'],
    });
  }

  /**
   * This function is called after the token was decoded and verified. The payload can now be validated.
   * Whatever is returned here will be injected into the request object as `request.user`.
   * @param payload
   * @returns
   */
  async validate(payload: ClerkJwtPayload): Promise<ClerkJwtPayload> {
    try {
      if (payload.org_permissions.length === 0) {
        // I've noticed that the permissions are not always included in the JWT payload.
        ClerkJwtStrategy.logger.debug(
          'No permissions found in JWT. Falling back to local role -> permissions mapping.',
        );
        payload.org_permissions = ClerkJwtStrategy.getPermissionsFromRole(
          payload.org_role,
        );
      }
    } catch (error) {}

    ClerkJwtStrategy.logger.debug(`Payload: ${JSON.stringify(payload)}`);
    return payload;
  }

  /**
   * This function maps permissions to roles and returns them as fallback, if the JWT does not contain any permissions but the users role.
   * @param role
   */
  private static getPermissionsFromRole(role: Role): Permission[] {
    switch (role) {
      case Role.admin:
        return [
          Permission.domains_read,
          Permission.domains_manage,
          Permission.members_read,
          Permission.members_manage,
          Permission.organization_manage,
          Permission.organization_delete,
        ];
      case Role.member:
        return [Permission.members_read];
      default:
        this.logger.error(
          `Role ${role} not found. Unable to retrieve permissions.`,
        );
        return [];
    }
  }
}
