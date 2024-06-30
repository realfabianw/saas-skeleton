import { OrganizationMembershipRole } from '@clerk/clerk-sdk-node';

/**
 * https://clerk.com/docs/organizations/roles-permissions
 */
export enum OrgRole {
  admin = 'org:admin',
  member = 'org:member',
}

/**
 * TODO: Is this some weird mismatch between sdk and actual api?
 * @param value
 * @returns
 */
export function ParseOrgRole(value: OrganizationMembershipRole): OrgRole {
  switch (value) {
    case 'org:admin':
      return OrgRole.admin;
    case 'org:member':
      return OrgRole.member;
    case 'org:basic_member':
      return OrgRole.member;
    case 'org:guest_member':
      return OrgRole.member;
    default:
      throw new Error(`Unknown OrganizationMembershipRole: ${value}`);
  }
}
