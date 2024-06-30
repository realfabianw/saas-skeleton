import { Inject, Injectable } from '@nestjs/common';

import { User } from '@clerk/clerk-sdk-node';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { takeUniqueOrThrow } from 'src/drizzle/drizzle.extensions';
import { eq } from 'drizzle-orm';
import { DbUser, schema } from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(clerkUser: User): Promise<DbUser> {
    return await this.db
      .insert(schema.users)
      .values(clerkUser)
      .returning()
      .then(takeUniqueOrThrow);
  }

  async findAll(): Promise<DbUser[]> {
    return await this.db.select().from(schema.users);
  }

  async findOne(id: string): Promise<DbUser> {
    return await this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
  }

  async update(id: string, user: User): Promise<DbUser> {
    return await this.db
      .update(schema.users)
      .set(user)
      .where(eq(schema.users.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }

  async remove(id: string): Promise<void> {
    await this.db.delete(schema.users).where(eq(schema.users.id, id));
  }
}
