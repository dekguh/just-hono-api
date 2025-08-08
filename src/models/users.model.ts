import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { z } from 'zod'

export const usersSchemaZod = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string()
})

export type UsersSchemaZod = z.infer<typeof usersSchemaZod>

export const usersSchema = pgTable('users', {
  id: serial('id').primaryKey().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: varchar('user_id', { length: 255 }).notNull()
})
