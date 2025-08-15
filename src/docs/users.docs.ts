import { createRoute, z } from '@hono/zod-openapi'
import { LoginParamsSchema } from '../types/users.types'
import { getResponseSchema } from '../utils/response'

export const ReturnLoginSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  token: z.string().optional()
})

export type TReturnLoginSchema = z.infer<typeof ReturnLoginSchema>

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
