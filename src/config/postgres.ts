import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../models'

// Use local Supabase Docker database
const connectionString = Bun.env.DATABASE_URL as string

console.log('Database connection string:', connectionString)
const client = postgres(connectionString)

export const db = drizzle(client, { schema })
export type DbType = typeof db
