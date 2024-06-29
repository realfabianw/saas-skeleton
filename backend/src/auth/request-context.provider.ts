import { Injectable, Req, Scope } from '@nestjs/common';
import { Request } from 'express';
import ClerkJwtPayload from './entites/clerk-jwt.payload';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextProvider {
  constructor(@Req() private readonly request: Request) {}

  public getJwtPayload(): ClerkJwtPayload {
    return this.request['user'];
  }

  public getUserId(): string {
    return this.getJwtPayload().sub;
  }

  public getOrganizationId(): string {
    return this.getJwtPayload().org_id;
  }

  public getOrgPermissions(): string[] {
    return this.getJwtPayload().org_permissions;
  }
}
