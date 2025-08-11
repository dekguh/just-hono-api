import { Hono } from 'hono'
import { UsersService } from '../services/users.service'
import { UsersRepository } from '../repository/users.repository'
import { db } from '../config/postgres'
import { ZodError } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '../middleware/zValidator.middleware'
import { globalResponse } from '../utils/response'
import { loginSchema, registerSchema } from '../models'

const usersRoute = new Hono()
const usersService = new UsersService(new UsersRepository(db))

usersRoute.onError((error, c) => {
  if (error instanceof HTTPException) {
    if (error.cause instanceof ZodError) {
      const err = error.cause as ZodError
      return c.json(globalResponse(400, err.issues[0].message), 400)
    }
    return c.json(globalResponse(error.status, error.message), error.status)
  }

  return c.json(globalResponse(500, 'internal server error', error), 500)
})

usersRoute.post('/login', zValidator('json', loginSchema), async (c) => {
  const userData = c.req.valid('json')
  const user = await usersService.signIn(userData)

  return c.json(globalResponse(200, 'user signed in successfully', user), 200)
})

usersRoute.post('/register', zValidator('json', registerSchema), async (c) => {
  const userData = c.req.valid('json')
  const user = await usersService.signUp(userData)

  return c.json(globalResponse(201, 'user created successfully', user), 201)
})

export { usersRoute }
