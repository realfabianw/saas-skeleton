import {
  organizationRelations,
  organizations,
} from '../organizations/entities/organization.schema';
import { userRelations, users } from '../users/entities/user.schema';
import {
  organizationMembershipRelations,
  organizationMemberships,
  organizationRoles,
} from '../organization-memberships/entities/organization-membership.schema';

export * from '../users/entities/user.schema';
export * from '../organizations/entities/organization.schema';
export * from '../organization-memberships/entities/organization-membership.schema';

export const dbSchema = {
  users,
  userRelations,
  organizations,
  organizationRelations,
  organizationRoles,
  organizationMemberships,
  organizationMembershipRelations,
};
