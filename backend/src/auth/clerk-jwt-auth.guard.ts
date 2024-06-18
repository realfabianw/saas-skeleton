import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class ClerkJwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(ClerkJwtAuthGuard.name);
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      this.logger.debug('Route is public');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];
    if (authorization) {
      this.logger.debug('Found JWT in headers');
    }
    const sessionCookie = request.cookies['__session'];
    if (sessionCookie) {
      this.logger.debug('Found JWT in cookies');
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
