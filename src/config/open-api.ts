import { OpenAPIObjectConfigure } from '@hono/zod-openapi'

export const openApiDocs : OpenAPIObjectConfigure<any, any> = {
  openapi: '3.0.0',
  info: {
    title: 'Just Hono API',
    version: '1.0.0'
  }
}

