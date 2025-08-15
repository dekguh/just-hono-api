import { sql } from 'drizzle-orm'
import { db } from './config/postgres'
import { cors } from 'hono/cors'
import env from './config/env'
import { swaggerUI } from '@hono/swagger-ui'
import { openApiDocs } from './config/open-api'
import { OpenAPIHono } from '@hono/zod-openapi'
import { usersRoute } from './routes/users.route'
import { globalResponse } from './utils/response'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'

const app = new OpenAPIHono()

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

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    console.error(err)
    return c.json(globalResponse(err.status, err.message, {
      message: err.message
    }), err.status)
  }

  if (err instanceof ZodError) {
    return c.json(globalResponse(400, 'Bad Request', {
      message: err.message
    }), 400)
  }

  return c.json(globalResponse(500, 'Internal server error', {
    message: 'Internal server error'
  }), 500)
})

app.route('/users', usersRoute)

app.doc('/docs/open-api', openApiDocs)
app.get('/swagger', swaggerUI({
  url: '/docs/open-api',
  title: 'Just Hono API'
}))

export default app
