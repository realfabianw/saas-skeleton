import { Inject, Injectable } from '@nestjs/common';

import { User } from '@clerk/clerk-sdk-node';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { takeUniqueOrThrow } from 'src/drizzle/drizzle.extensions';
import { eq } from 'drizzle-orm';
import { DbUser, dbSchema } from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof dbSchema>,
  ) {}

  async create(clerkUser: User): Promise<DbUser> {
    return await this.db
      .insert(dbSchema.users)
      .values(clerkUser)
      .returning()
      .then(takeUniqueOrThrow);
  }

  async findAll(): Promise<DbUser[]> {
    return await this.db.select().from(dbSchema.users);
  }

  async findOne(id: string): Promise<DbUser> {
    return await this.db.query.users.findFirst({
      where: eq(dbSchema.users.id, id),
    });
  }

  async update(id: string, user: User): Promise<DbUser> {
    return await this.db
      .update(dbSchema.users)
      .set(user)
      .where(eq(dbSchema.users.id, id))
      .returning()
      .then(takeUniqueOrThrow);
  }

  async remove(id: string): Promise<void> {
    await this.db.delete(dbSchema.users).where(eq(dbSchema.users.id, id));
  }
}
