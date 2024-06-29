import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { OrgPermission } from './org-permission.enum';
import { OrgRole } from './org-role.enum';

/**
 * https://clerk.com/docs/backend-requests/resources/session-tokens
 */
export default class ClerkJwtPayload {
  @IsUrl()
  @IsNotEmpty()
  azp: string;

  @IsNotEmpty()
  exp: number;

  @IsNotEmpty()
  iat: number;

  @IsUrl()
  @IsNotEmpty()
  iss: string;

  @IsNotEmpty()
  nbf: number;

  @IsNotEmpty()
  sid: string;

  @IsNotEmpty()
  sub: string;

  @IsOptional()
  act?: string;

  @IsOptional()
  org_id?: string;

  @IsOptional()
  org_permissions?: OrgPermission[];

  @IsOptional()
  org_slug?: string;

  @IsOptional()
  org_role: OrgRole;
}
