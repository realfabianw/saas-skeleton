import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { organizationMemberships } from '../../organization-memberships/entities/organization-membership.schema';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
});

export const userRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMemberships),
}));

export type DbUser = typeof users.$inferSelect;
