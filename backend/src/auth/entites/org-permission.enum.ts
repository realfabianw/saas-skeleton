/**
 * https://clerk.com/docs/organizations/roles-permissions
 */
export enum OrgPermission {
  organization_manage = 'org:sys_profile:manage',
  organization_delete = 'org:sys_profile:delete',
  members_read = 'org:sys_memberships:read',
  members_manage = 'org:sys_memberships:manage',
  domains_read = 'org:sys_domains:read',
  domains_manage = 'org:sys_domains:manage',
}
