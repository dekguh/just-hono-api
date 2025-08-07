import { Hono } from 'hono'
import { usersRoute } from './routes/users.route'
import { sql } from 'drizzle-orm'
import { db } from './config/postgres'

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

app.route('/users', usersRoute)

export default app
