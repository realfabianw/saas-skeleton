import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  Organization,
  OrganizationMembership,
  User,
  WebhookEvent,
} from '@clerk/clerk-sdk-node';
import { OrganizationsService } from '../organizations/organizations.service';
import { OrganizationMembershipsService } from '../organization-memberships/organization-memberships.service';

@Injectable()
export class ClerkService {
  private readonly logger = new Logger(ClerkService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
    private readonly organizationMembershipsService: OrganizationMembershipsService,
  ) {}

  async handleClerkWebhookEvent(event: WebhookEvent) {
    try {
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
        case 'organizationMembership.created':
          this.organizationMembershipsService.create(
            OrganizationMembership.fromJSON(event.data),
          );
          break;
        case 'organizationMembership.updated':
          this.organizationMembershipsService.update(
            event.data.id,
            OrganizationMembership.fromJSON(event.data),
          );
          break;
        case 'organizationMembership.deleted':
          this.organizationMembershipsService.remove(event.data.id);
          break;

        default:
          this.logger.log(
            'Unhandled Clerk Webhook Event: ' + JSON.stringify(event),
          );
          break;
      }
    } catch (error) {
      this.logger.error('Error handling Clerk Webhook Event: ' + error);
    }
  }
}
