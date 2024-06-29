import { pgSchema } from 'drizzle-orm/pg-core';
import { users } from 'src/users/entities/user.schema';

export const dbSchema = {
  users,
};
