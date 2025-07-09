import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    port: 5433,
    user: 'taskboard_user',
    password: 'taskboard_password',
    database: 'taskboard_db',
    ssl: false
  },
} satisfies Config; 