import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { usersSchema } from './users.model'
import { relations } from 'drizzle-orm'
import { z } from '@hono/zod-openapi'

export const todosSchemaZod = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string()
})

export const createTodoZod = z.object({
  title: z.string(),
  description: z.string(),
  userId: z.string()
})

export type TodosSchemaZod = z.infer<typeof todosSchemaZod>
export type CreateTodoZod = z.infer<typeof createTodoZod>

export const todosSchema = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: uuid('user_id').references(() => usersSchema.id)
})

export const todosRelations = relations(todosSchema, ({ one }) => ({
  user: one(usersSchema, {
    fields: [todosSchema.userId],
    references: [usersSchema.id]
  })
}))
