import { OpenAPIObjectConfigure } from '@hono/zod-openapi'
import env from './env'

export const openApiDocs : OpenAPIObjectConfigure<any, any> = {
  openapi: '3.0.0',
  info: {
    title: 'Just Hono API',
    version: '1.0.0'
  },
  servers: [
    {
      url: `${env.HOST}:${env.PORT}`
    }
  ]
}

