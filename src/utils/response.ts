import { z } from '@hono/zod-openapi'

export const getResponseSchema = (statusCode: number, data: unknown) => z.object({
  success: z.boolean(),
  statusCode: z.number().default(statusCode),
  message: z.string(),
  data: data
})

export const globalResponse = (statusCode: number, message: string, data: unknown) => {
  return getResponseSchema(statusCode, data).parse({
    success: statusCode < 300,
    statusCode,
    message,
    data
  })
}
