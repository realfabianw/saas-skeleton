import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequiresPermissions } from './auth/decorators/permissions.decorator';
import { Permission } from './auth/entites/permission.enum';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('ping')
  ping(@Req() request: Request, @Res() response: Response) {
    response.status(200).send();
  }

  @RequiresPermissions(Permission.organization_manage)
  @Get('ping-authorized')
  authorizedPing(@Req() request: Request, @Res() response: Response) {
    response.status(200).send();
  }
}
