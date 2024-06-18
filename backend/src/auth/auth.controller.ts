import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  RawBodyRequest,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { WebhookEvent } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  /**
   * This endpoint is called by Clerk to sync the user data with the application.
   * @see https://clerk.com/docs/integrations/webhooks/sync-data
   * @param request
   */
  @Public()
  @Post('/clerk/sync')
  async clerkWebhookSync(@Req() request: RawBodyRequest<Request>) {
    this.logger.debug('Received Clerk sync webhook');
    const webhookSecret = this.configService.get<string>(
      'CLERK_WEBHOOK_SECRET',
    );

    if (!webhookSecret) {
      throw new InternalServerErrorException('Clerk Webhook secret not found');
    }

    if (
      !request.headers['svix-id'] ||
      !request.headers['svix-timestamp'] ||
      !request.headers['svix-signature']
    ) {
      throw new BadRequestException('Clerk Webhook headers not found');
    }

    const wh = new Webhook(webhookSecret);

    try {
      const webhookEvent: WebhookEvent = wh.verify(
        request.rawBody.toString('utf8'),
        request.headers as Record<string, string>,
      ) as WebhookEvent;
      this.authService.handleClerkWebhookEvent(webhookEvent);
    } catch (err) {
      throw new UnauthorizedException('Clerk Webhook verification failed');
    }
  }
}
