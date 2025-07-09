import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const client = postgres({
  host: 'localhost',
  port: 5433,
  user: 'taskboard_user',
  password: 'taskboard_password',
  database: 'taskboard_db',
});

export const db = drizzle(client, { schema }); 