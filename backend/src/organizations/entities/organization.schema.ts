import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { organizationMemberships } from '../../organization-memberships/entities/organization-membership.schema';

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
  memberships: many(organizationMemberships),
}));

export type DbOrganization = typeof organizations.$inferSelect;
