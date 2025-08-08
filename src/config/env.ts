import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(1),
  ALLOWED_ORIGINS: z.string().min(1)
})

const env = envSchema.parse(process.env)

export default env
