import { relations } from 'drizzle-orm'
import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'
import { z } from 'zod'
import { todosSchema } from './todos.model'

export const UsersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type TUsersSchema = z.infer<typeof UsersSchema>

export const usersSchema = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})


export const usersRelations = relations(usersSchema, ({ many }) => ({
  todos: many(todosSchema)
}))
