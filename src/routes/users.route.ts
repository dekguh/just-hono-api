import { UsersService } from '../services/users.service'
import { UsersRepository } from '../repository/users.repository'
import { db } from '../config/postgres'
import { OpenAPIHono } from '@hono/zod-openapi'
import { loginDocs, logoutDocs, registerDocs, userMeDocs } from '../docs/users.docs'
import { globalResponse } from '../utils/response'
import { ZodError } from 'zod'
import jwt from 'jsonwebtoken'
import { authMiddleware } from '../middleware/auth.middleware'

const usersRoute = new OpenAPIHono({
  defaultHook: (result, c) => {
    if ('error' in result && result.error instanceof ZodError) {
      return c.json(globalResponse(400, JSON.parse(result.error.message)[0].message, null), 400)
    }
  }
})
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

usersRoute.openapi(registerDocs, async (c) => {
  const userData = c.req.valid('json')
  const user = await usersService.signUp(userData)

  return c.json(globalResponse(200, 'User registered successfully', {
    id: user?.id || '',
    email: user?.email || '',
    name: user?.name || ''
  }))
})

usersRoute.use('/me', authMiddleware)
usersRoute.openapi(userMeDocs, async (c) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  const userData = jwt.decode(token || '') as { user_metadata: { sub: string } }

  const user = await usersService.getUserMe(userData?.user_metadata?.sub)

  return c.json(globalResponse(200, 'Success get detail user', {
    id: user?.id || '',
    email: user?.email || '',
    name: user?.name || ''
  }))
})

usersRoute.use('/logout', authMiddleware)
usersRoute.openapi(logoutDocs, async (c) => {
  await usersService.signOut()

  return c.json(globalResponse(200, 'User logged out successfully', {}))
})

export { usersRoute }
