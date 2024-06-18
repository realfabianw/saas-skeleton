import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

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
  org_permissions?: string[];

  @IsOptional()
  org_slug?: string;

  @IsOptional()
  org_role: string;
}
