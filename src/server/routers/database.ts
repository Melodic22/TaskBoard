import { sql } from 'drizzle-orm';
import { db } from '../db';
import { lists, tasks } from '../db/schema';
import { publicProcedure, router } from '../trpc';

export const databaseRouter = router({
  reset: publicProcedure
    .mutation(async () => {
      // Delete all data from tables in correct order
      await db.delete(tasks);
      await db.delete(lists);

      // Reset sequences
      await db.execute(sql`ALTER SEQUENCE tasks_id_seq RESTART WITH 1;`);
      await db.execute(sql`ALTER SEQUENCE lists_id_seq RESTART WITH 1;`);

      return { success: true };
    }),

  seed: publicProcedure
    .mutation(async () => {
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