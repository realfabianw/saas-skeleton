import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { OrgRole } from '../../auth/entites/org-role.enum';
import { users } from '../../users/entities/user.schema';
import { organizations } from '../../organizations/entities/organization.schema';

export const organizationRoles = pgEnum('org_roles', [
  OrgRole.admin,
  OrgRole.member,
]);

export const organizationMemberships = pgTable(
  'organization_memberships',
  {
    organizationId: text('organization_id').references(() => organizations.id, {
      onDelete: 'cascade',
    }),
    userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
    role: organizationRoles('org_role').notNull().default(OrgRole.member),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.organizationId, table.userId] }),
    };
  },
);

export const organizationMembershipRelations = relations(
  organizationMemberships,
  ({ one }) => ({
    organization: one(organizations),
    user: one(users),
  }),
);

export type DbOrganizationMembership =
  typeof organizationMemberships.$inferSelect;
