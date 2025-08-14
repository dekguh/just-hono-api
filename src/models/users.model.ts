import { relations } from 'drizzle-orm'
import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'
import { z } from 'zod'
import { todosSchema } from './todos.model'

export const usersSchemaZod = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const loginSchema = z.object({
  email: z.string({ message: 'email is required' }).min(1, 'email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'invalid email format' }),
  password: z.string({ message: 'password is required' }).min(8, 'password must be at least 8 characters long')
})

export const registerSchema = z.object({
  email: z.string({ message: 'email is required' }).min(1, 'email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'invalid email format' }),
  password: z.string({ message: 'password is required' }).min(8, 'password must be at least 8 characters long'),
  name: z.string({ message: 'name is required' }).min(1, 'name is required')
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
export type UsersSchemaZod = z.infer<typeof usersSchemaZod>

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
