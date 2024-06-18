import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, WebhookEvent } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

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
      default:
        this.logger.log(
          'Unhandled Clerk Webhook Event: ' + JSON.stringify(event),
        );
        break;
    }
  }
}
