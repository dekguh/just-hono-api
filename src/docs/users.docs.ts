import { createRoute, z } from '@hono/zod-openapi'
import { LoginParamsSchema, RegisterParamsSchema, ReturnLoginSchema, ReturnRegisterSchema, ReturnUserMeSchema } from '../types/users.types'
import { getResponseSchema } from '../utils/response'

export const loginDocs = createRoute({
  method: 'post',
  path: '/login',
  tags: ['Authentication'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginParamsSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'User signed in successfully',
      content: {
        'application/json': {
          schema: getResponseSchema(200, ReturnLoginSchema)
        }
      }
    }
  }
})

export const registerDocs = createRoute({
  method: 'post',
  path: '/register',
  tags: ['Authentication'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterParamsSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'User registered successfully',
      content: {
        'application/json': {
          schema: getResponseSchema(200, ReturnRegisterSchema)
        }
      }
    }
  }
})

export const userMeDocs = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Users'],
  responses: {
    200: {
      description: 'Get detail user me',
      content: {
        'application/json': {
          schema: getResponseSchema(200, ReturnUserMeSchema)
        }
      }
    }
  }
})

export const logoutDocs = createRoute({
  method: 'post',
  path: '/logout',
  tags: ['Authentication'],
  responses: {
    200: {
      description: 'When the user signs out, Supabase revokes the refresh token and deletes the JWT from the client-side',
      content: {
        'application/json': {
          schema: getResponseSchema(200, z.object({}))
        }
      }
    }
  }
})
