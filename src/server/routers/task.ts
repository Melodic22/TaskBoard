import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { tasks, taskStatusEnum } from '../db/schema';
import { publicProcedure, router } from '../trpc';

const taskStatusSchema = z.enum(['todo', 'inprogress', 'completed']);

export const taskRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(tasks);
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      deadline: z.string().optional(),
      listId: z.number(),
      status: taskStatusSchema.default('todo'),
    }))
    .mutation(async ({ input }) => {
      const deadline = input.deadline ? new Date(input.deadline) : undefined;
      return await db.insert(tasks).values({ ...input, deadline }).returning();
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      deadline: z.string().optional(),
      status: taskStatusSchema.optional(),
      listId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      const deadline = updateData.deadline ? new Date(updateData.deadline) : undefined;
      return await db
        .update(tasks)
        .set({ ...updateData, deadline })
        .where(eq(tasks.id, id))
        .returning();
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.delete(tasks).where(eq(tasks.id, input.id)).returning();
    }),

  setStatus: publicProcedure
    .input(z.object({ 
      id: z.number(),
      status: taskStatusSchema
    }))
    .mutation(async ({ input }) => {
      const result = await db
        .update(tasks)
        .set({ status: input.status })
        .where(eq(tasks.id, input.id))
        .returning();

      // Mock email notification
      if (input.status === 'completed') {
        console.log(`Task ${result[0].name} has been completed!`);
      }
      return result;
    }),

  moveToList: publicProcedure
    .input(z.object({
      taskIds: z.array(z.number()),
      targetListId: z.number(),
    }))
    .mutation(async ({ input }) => {
      const updates = input.taskIds.map(taskId =>
        db
          .update(tasks)
          .set({ listId: input.targetListId })
          .where(eq(tasks.id, taskId))
          .returning()
      );
      return await Promise.all(updates);
    }),

  deleteBulk: publicProcedure
    .input(z.object({
      taskIds: z.array(z.number()),
    }))
    .mutation(async ({ input }) => {
      return await db
        .delete(tasks)
        .where(input.taskIds.map(id => eq(tasks.id, id)).reduce((a, b) => a.or(b)))
        .returning();
    }),
}); 