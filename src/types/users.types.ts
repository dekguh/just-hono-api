import { z } from '@hono/zod-openapi'

export const LoginParamsSchema = z.object({
  email: z.string().min(1, 'email is required'),
  password: z.string().min(8, 'password must be at least 8 characters long')
})

export type TLoginParamsSchema = z.infer<typeof LoginParamsSchema>
