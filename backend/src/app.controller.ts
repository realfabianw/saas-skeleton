import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('ping')
  ping(@Res() response: Response) {
    response.status(200).send();
  }
}
