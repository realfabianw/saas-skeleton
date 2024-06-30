import { Inject, Injectable } from '@nestjs/common';
import { OrganizationMembership } from '@clerk/clerk-sdk-node';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { ParseOrgRole } from '../auth/entites/org-role.enum';
import { takeUniqueOrThrow } from '../drizzle/drizzle.extensions';
import { eq } from 'drizzle-orm';
import * as dbSchema from 'src/drizzle/schema';
import { DbOrganizationMembership } from 'src/drizzle/schema';

@Injectable()
export class OrganizationMembershipsService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof dbSchema>,
  ) {}

  async create(
    clerkOrganizationMembership: OrganizationMembership,
  ): Promise<DbOrganizationMembership> {
    return await this.db
      .insert(dbSchema.organizationMemberships)
      .values({
        organizationId: clerkOrganizationMembership.organization.id,
        userId: clerkOrganizationMembership.publicUserData.userId,
        role: ParseOrgRole(clerkOrganizationMembership.role),
      })
      .returning()
      .then(takeUniqueOrThrow);
  }

  async findAll(): Promise<DbOrganizationMembership[]> {
    return await this.db.select().from(dbSchema.organizationMemberships);
  }

  async findOne(id: string): Promise<DbOrganizationMembership> {
    return await this.db.query.organizationMemberships.findFirst({
      where: eq(dbSchema.organizationMemberships.userId, id),
    });
  }

  async update(
    id: string,
    clerkOrganizationMembership: OrganizationMembership,
  ): Promise<DbOrganizationMembership> {
    return await this.db
      .update(dbSchema.organizationMemberships)
      .set({
        organizationId: clerkOrganizationMembership.organization.id,
        userId: clerkOrganizationMembership.id,
        role: ParseOrgRole(clerkOrganizationMembership.role),
      })
      .where(eq(dbSchema.organizationMemberships.userId, id))
      .returning()
      .then(takeUniqueOrThrow);
  }

  async remove(id: string): Promise<DbOrganizationMembership> {
    return this.db
      .delete(dbSchema.organizationMemberships)
      .where(eq(dbSchema.organizationMemberships.userId, id))
      .returning()
      .then(takeUniqueOrThrow);
  }
}
