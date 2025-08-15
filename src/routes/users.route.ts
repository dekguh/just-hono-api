import { UsersService } from '../services/users.service'
import { UsersRepository } from '../repository/users.repository'
import { db } from '../config/postgres'
import { OpenAPIHono } from '@hono/zod-openapi'
import { loginDocs } from '../docs/users.docs'
import { globalResponse } from '../utils/response'

const usersRoute = new OpenAPIHono()
const usersService = new UsersService(new UsersRepository(db))

usersRoute.openapi(loginDocs, async (c) => {
  const userData = c.req.valid('json')
  const user = await usersService.signIn(userData)

  return c.json(globalResponse(200, 'User signed in successfully', {
    id: user?.id || '',
    email: user?.email || '',
    name: user?.name || '',
    token: user?.token || ''
  }))
})

export { usersRoute }
