import { router } from '../trpc';
import { listRouter } from './list';
import { taskRouter } from './task';
import { databaseRouter } from './database';

export const appRouter = router({
  list: listRouter,
  task: taskRouter,
  database: databaseRouter,
});

export type AppRouter = typeof appRouter; 