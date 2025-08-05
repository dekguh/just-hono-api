import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import type { ValidationTargets } from 'hono'
import * as z from 'zod'
import { HTTPException } from 'hono/http-exception'

const app = new Hono()

app.onError((error, context) => {
  if (error instanceof HTTPException) {
    return context.json({
      status: error.status,
      message: error.message
    }, error.status)
  }
  return context.json({
    message: 'Internal server error'
  }, 500)
})

const paramsSignInSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long'
  })
})

const signInValidator = <T extends z.ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) => zValidator(target, schema, (result) => {
    if (!result.success) {
      throw new HTTPException(400, {
        cause: result.error,
        message: 'Invalid request'
      })
    }
  })

app.post('/auth/sign-in', signInValidator('json', paramsSignInSchema), (context) => {
  console.log(context)
  const validation =context.req.valid('json')
  return context.json({
    message: 'Hello Hono!',
    validation
  })
})

export default app
