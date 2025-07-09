import { sql } from 'drizzle-orm';
import { db } from '../db';
import { lists, tasks, taskStatusEnum } from '../db/schema';
import { publicProcedure, router } from '../trpc';

export const databaseRouter = router({
  reset: publicProcedure
    .mutation(async () => {
      // Drop all tables
      await db.execute(sql`DROP TABLE IF EXISTS tasks CASCADE;`);
      await db.execute(sql`DROP TABLE IF EXISTS lists CASCADE;`);
      await db.execute(sql`DROP TYPE IF EXISTS task_status CASCADE;`);

      // Reset sequences
      // await db.execute(sql`ALTER SEQUENCE tasks_id_seq RESTART WITH 1;`);
      // await db.execute(sql`ALTER SEQUENCE lists_id_seq RESTART WITH 1;`);

      return { success: true };
    }),

  seed: publicProcedure
    .mutation(async () => {
      // Create the task_status enum type
      await db.execute(sql`
        CREATE TYPE task_status AS ENUM ('todo', 'inprogress', 'completed');
      `);

      // Create the lists table
      await db.execute(sql`
        CREATE TABLE lists (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);

      // Create the tasks table
      await db.execute(sql`
        CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,
          list_id INTEGER REFERENCES lists(id),
          name TEXT NOT NULL,
          description TEXT,
          deadline TIMESTAMP,
          status task_status NOT NULL DEFAULT 'todo',
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
      `);

      // Create sample lists
      const personalList = await db.insert(lists).values({
        name: "Personal Tasks",
      }).returning().then(rows => rows[0]);

      const workList = await db.insert(lists).values({
        name: "Work Projects",
      }).returning().then(rows => rows[0]);

      // Create sample tasks
      await db.insert(tasks).values([
        {
          name: "Learn Next.js",
          description: "Complete the tutorial",
          listId: personalList.id,
          status: 'todo',
        },
        {
          name: "Build Portfolio",
          description: "Create personal website",
          listId: personalList.id,
          status: 'inprogress',
        },
        {
          name: "Write Blog",
          description: "Tech article",
          listId: personalList.id,
          status: 'completed',
        },
        {
          name: "Project Planning",
          description: "Create roadmap for Q2",
          listId: workList.id,
          status: 'todo',
        },
        {
          name: "Client Meeting",
          description: "Discuss requirements",
          listId: workList.id,
          status: 'todo',
        },
      ]);

      return { success: true };
    }),
}); 