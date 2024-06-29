import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { OrgPermission } from '../entites/org-permission.enum';
import { PERMISSIONS_KEY } from '../decorators/org-permissions.decorator';
import { Reflector } from '@nestjs/core';
import ClerkJwtPayload from '../entites/clerk-jwt.payload';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions: OrgPermission[] =
      this.reflector.getAllAndOverride<OrgPermission[]>(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    const jwtPayload: ClerkJwtPayload = context
      .switchToHttp()
      .getRequest().user;

    if (!jwtPayload.org_id) {
      // No organization ID found in the JWT payload. Permissions are not relevant,
      // therefore we can allow the request to continue without any more checks.
      this.logger.debug('No organization ID found in the JWT payload.');
      return true;
    }

    if (!requiredPermissions) {
      // Authenticate the request if no permission is required.
      return true;
    }

    this.logger.debug(
      'Required permissions: ' + JSON.stringify(requiredPermissions),
    );

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
