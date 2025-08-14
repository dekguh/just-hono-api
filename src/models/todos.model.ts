import { pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { usersSchema } from './users.model'
import { relations } from 'drizzle-orm'

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
