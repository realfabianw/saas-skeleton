import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  @Get('ping')
  ping(@Req() request: Request, @Res() response: Response) {
    this.logger.log('Request: ' + request['user']);
    response.status(200).send();
  }
}
