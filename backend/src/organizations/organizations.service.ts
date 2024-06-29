import { Inject, Injectable } from '@nestjs/common';
import { Organization } from '@clerk/clerk-sdk-node';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { takeUniqueOrThrow } from '../drizzle/drizzle.extensions';
import { eq } from 'drizzle-orm';
import * as dbSchema from 'src/drizzle/schema';
import { DbOrganization } from 'src/drizzle/schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof dbSchema>,
  ) {}

  async create(clerkOrganization: Organization): Promise<DbOrganization> {
    return await this.db
      .insert(dbSchema.organizations)
      .values(clerkOrganization)
      .returning()
      .then(takeUniqueOrThrow);
  }

  async findAll(): Promise<DbOrganization[]> {
    return await this.db.select().from(dbSchema.organizations);
  }

  async findOne(id: string): Promise<DbOrganization> {
    return await this.db.query.organizations.findFirst({
      where: eq(dbSchema.organizations.id, id),
    });
  }

  async update(
    id: string,
    clerkOrganization: Organization,
  ): Promise<DbOrganization> {
    return await this.db
      .update(dbSchema.organizations)
      .set(clerkOrganization)
      .where(eq(dbSchema.organizations.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }

  async remove(id: string): Promise<DbOrganization> {
    return this.db
      .delete(dbSchema.organizations)
      .where(eq(dbSchema.organizations.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }
}
