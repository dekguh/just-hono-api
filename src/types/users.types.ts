import { z } from '@hono/zod-openapi'

export const LoginParamsSchema = z.object({
  email: z.string({ message: 'email is required' }).min(1, 'email is required'),
  password: z.string({ message: 'password is required' }).min(8, 'password must be at least 8 characters long')
})

export type TLoginParamsSchema = z.infer<typeof LoginParamsSchema>

export const ReturnLoginSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  token: z.string().optional()
})

export type TReturnLoginSchema = z.infer<typeof ReturnLoginSchema>

export const ReturnRegisterSchema = z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional()
})

export type TReturnRegisterSchema = z.infer<typeof ReturnRegisterSchema>

export const RegisterParamsSchema = z.object({
  email: z.string({ message: 'email is required' }).min(1, 'email is required').regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email format is invalid'),
  password: z.string({ message: 'password is required' }).min(8, 'password must be at least 8 characters long'),
  name: z.string({ message: 'name is required' }).min(1, 'name is required').regex(/^[a-zA-Z\s]+$/, 'name must contain only letters and spaces')
})

export type TRegisterParamsSchema = z.infer<typeof RegisterParamsSchema>
