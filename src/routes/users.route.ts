import { Hono } from 'hono'
import { UsersService } from '../services/users.service'
import { UsersRepository } from '../repository/users.repository'
import { db } from '../config/postgres'
import { ZodError, z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '../middleware/zValidator.middleware'

const usersRoute = new Hono()
const usersService = new UsersService(new UsersRepository(db))

usersRoute.onError((error, c) => {
  if (error instanceof HTTPException) {
    if (error.cause instanceof ZodError) {
      const err = error.cause as ZodError
      return c.json({ message: err.issues[0].message }, 400)
    }
    return c.json({ message: error.message }, error.status)
  }

  return c.json({ message: 'internal server error' }, 500)
})

const loginSchema = z.object({
  email: z.string({ message: 'email is required' }).min(1, 'email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'invalid email format' }),
  password: z.string({ message: 'password is required' }).min(8, 'password must be at least 8 characters long')
})

usersRoute.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json')
  const user = await usersService.login(email, password)

  return c.json(user)
})

export { usersRoute }
