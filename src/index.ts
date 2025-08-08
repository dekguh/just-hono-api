import { Hono } from 'hono'
import { usersRoute } from './routes/users.route'
import { sql } from 'drizzle-orm'
import { db } from './config/postgres'
import { cors } from 'hono/cors'
import env from './config/env'

const app = new Hono()

// Test database connection on startup
async function testDbConnection() {
  try {
    await db.execute(sql`SELECT 1 as test`)
    console.log('✅ Database connection successful')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  }
}

// Run the test
testDbConnection()

app.use('*', cors({
  origin: env.ALLOWED_ORIGINS,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Type', 'Authorization']
}))
app.route('/users', usersRoute)

export default app
