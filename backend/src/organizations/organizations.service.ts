import { Inject, Injectable } from '@nestjs/common';
import { Organization } from '@clerk/clerk-sdk-node';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { takeUniqueOrThrow } from '../drizzle/drizzle.extensions';
import { eq } from 'drizzle-orm';
import { DbOrganization, schema } from '../drizzle/schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(clerkOrganization: Organization): Promise<DbOrganization> {
    return await this.db
      .insert(schema.organizations)
      .values(clerkOrganization)
      .returning()
      .then(takeUniqueOrThrow);
  }

  async findAll(): Promise<DbOrganization[]> {
    return await this.db.select().from(schema.organizations);
  }

  async findOne(id: string): Promise<DbOrganization> {
    return await this.db.query.organizations.findFirst({
      where: eq(schema.organizations.id, id),
    });
  }

  async update(
    id: string,
    clerkOrganization: Organization,
  ): Promise<DbOrganization> {
    return await this.db
      .update(schema.organizations)
      .set(clerkOrganization)
      .where(eq(schema.organizations.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }

  async remove(id: string): Promise<DbOrganization> {
    return this.db
      .delete(schema.organizations)
      .where(eq(schema.organizations.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }
}
