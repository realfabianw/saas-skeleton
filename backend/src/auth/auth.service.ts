import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Organization, User, WebhookEvent } from '@clerk/clerk-sdk-node';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  async handleClerkWebhookEvent(event: WebhookEvent) {
    switch (event.type) {
      case 'user.created':
        /**
         * The method User.fromJSON() does not work since version 5.0.11. Works in version 4.13.20.
         * 'User' cannot be used as a value because it was exported using 'export type'.ts(1362)
         * TODO: Update to the latest version.
         */
        this.usersService.create(User.fromJSON(event.data));
        break;
      case 'user.updated':
        this.usersService.update(event.data.id, User.fromJSON(event.data));
        break;
      case 'user.deleted':
        this.usersService.remove(event.data.id);
        break;
      case 'organization.created':
        this.organizationsService.create(Organization.fromJSON(event.data));
        break;
      case 'organization.updated':
        this.organizationsService.update(
          event.data.id,
          Organization.fromJSON(event.data),
        );
        break;
      case 'organization.deleted':
        this.organizationsService.remove(event.data.id);
        break;
      default:
        this.logger.log(
          'Unhandled Clerk Webhook Event: ' + JSON.stringify(event),
        );
        break;
    }
  }
}
