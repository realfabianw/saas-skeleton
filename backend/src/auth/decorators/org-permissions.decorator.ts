import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const OrgPermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
