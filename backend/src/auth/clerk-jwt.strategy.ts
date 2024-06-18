import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import ClerkJwtPayload from './entites/clerk-jwt.payload';
import { passportJwtSecret } from 'jwks-rsa';

/**
 * The JWT strategy for authenticating Clerk JWTs.
 * JWTs are extracted from the request session token, which is transmitted as a cookie and verified manually.
 * https://clerk.com/docs/backend-requests/handling/manual-jwt
 */
@Injectable()
export class ClerkJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(ClerkJwtStrategy.name);

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
    this.logger.debug(`Validating JWT payload: ${JSON.stringify(payload)}`);
    return payload;
  }
}
