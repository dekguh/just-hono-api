import { z } from '@hono/zod-openapi'

export const getResponseSchema = <T extends z.ZodTypeAny>(statusCode: number, data: T) => z.object({
  success: z.boolean(),
  statusCode: z.number().default(statusCode),
  message: z.string(),
  data: data
})

export const globalResponse = <T extends any>(statusCode: number, message: string, data: T) => {
  return {
    success: statusCode < 300,
    statusCode,
    message,
    data
  }
}
