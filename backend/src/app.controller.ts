import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OrgPermissions } from './auth/decorators/org-permissions.decorator';
import { OrgPermission } from './auth/entites/org-permission.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ping & Healthchecks')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('ping')
  ping(@Req() request: Request, @Res() response: Response) {
    response.status(200).send();
  }

  @OrgPermissions(OrgPermission.organization_manage)
  @Get('ping-authorized')
  authorizedPing(@Req() request: Request, @Res() response: Response) {
    response.status(200).send();
  }
}
