import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import ClerkJwtPayload from './entites/clerk-jwt.payload';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getRequest(): Request {
    return this.request;
  }
  getJwtPayload(): ClerkJwtPayload {
    return this.request['user'];
  }

  getUserId(): string {
    return this.getJwtPayload().sub;
  }

  getOrganizationId(): string {
    return this.getJwtPayload().org_id;
  }

  getOrgPermissions(): string[] {
    return this.getJwtPayload().org_permissions;
  }
}
