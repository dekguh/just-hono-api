import { createClient } from '@supabase/supabase-js'

const supabaseUrl = Bun.env.SUPABASE_URL!
const supabaseAnonKey = Bun.env.SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = Bun.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
