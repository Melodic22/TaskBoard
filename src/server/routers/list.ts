import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '../db';
import { lists } from '../db/schema';
import { eq } from 'drizzle-orm';

export const listRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(lists);
  }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await db.insert(lists).values(input).returning();
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.delete(lists).where(eq(lists.id, input.id)).returning();
    }),
}); 