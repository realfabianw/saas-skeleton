import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Permission } from '../entites/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Reflector } from '@nestjs/core';
import ClerkJwtPayload from '../entites/clerk-jwt.payload';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions: Permission[] = this.reflector.getAllAndOverride<
      Permission[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      // Authenticate the request if no permission is required.
      return true;
    } else {
      this.logger.debug(
        'Required permissions: ' + JSON.stringify(requiredPermissions),
      );
    }

    const jwtPayload: ClerkJwtPayload = context
      .switchToHttp()
      .getRequest().user;

    const requestPermissions = [];

    try {
      requestPermissions.push(...jwtPayload.org_permissions);
      this.logger.debug(
        'Request Permissions: ' + JSON.stringify(requestPermissions),
      );
    } catch (err) {
      // Unable to retrieve permissions from JWT payload.
    }

    return requiredPermissions.some((requiredPermission) =>
      requestPermissions.includes(requiredPermission),
    );
  }
}
