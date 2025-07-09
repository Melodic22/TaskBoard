import { relations } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const taskStatusEnum = pgEnum('task_status', ['todo', 'inprogress', 'completed']);

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const listRelations = relations(lists, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  listId: serial('list_id').references(() => lists.id),
  name: text('name').notNull(),
  description: text('description'),
  deadline: timestamp('deadline'),
  status: taskStatusEnum('status').default('todo').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  list: one(lists, {
    fields: [tasks.listId],
    references: [lists.id],
  }),
})); 