import { Hono } from 'hono'
import { usersRoute } from './routes/users.route'
import { sql } from 'drizzle-orm'
import { db } from './config/postgres'
import { cors } from 'hono/cors'
import env from './config/env'
import { openAPISpecs } from 'hono-openapi'
import { swaggerUI } from '@hono/swagger-ui'

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
  exposeHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600
}))
app.route('/users', usersRoute)

app.get('/open-api', openAPISpecs(app, {
  documentation: {
    info: {
      title: 'Todo API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  }
}))

app.get('/swagger', swaggerUI({
  url: '/open-api',
  title: 'Just Hono API'
}))


export default app
