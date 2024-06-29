import { Inject, Injectable } from '@nestjs/common';

import { User } from '@clerk/clerk-sdk-node';
import { DbUser } from './entities/user.schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { dbSchema } from 'src/drizzle/db.schema';
import { takeUniqueOrThrow } from 'src/drizzle/drizzle.extensions';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DB_PROD') private db: PostgresJsDatabase<typeof dbSchema>,
  ) {}
  async create(clerkUser: User): Promise<DbUser> {
    return await this.db
      .insert(dbSchema.users)
      .values({
        id: clerkUser.id,
      })
      .returning()
      .then(takeUniqueOrThrow);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, user: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
