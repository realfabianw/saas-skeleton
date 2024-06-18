import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  async handleClerkWebhookEvent(event: WebhookEvent) {
    switch (event.type) {
      default:
        this.logger.log(
          'Unhandled Clerk Webhook Event: ' + JSON.stringify(event),
        );
        break;
    }
  }
}
