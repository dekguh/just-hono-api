import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../models'
import env from './env'

// Use local Supabase Docker database
const connectionString = env.DATABASE_URL

console.log('Database connection string:', connectionString)
const client = postgres(connectionString)

export const db = drizzle(client, { schema })
export type DbType = typeof db
