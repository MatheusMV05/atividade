import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabaseEnabled = Boolean(url && publishableKey)

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, publishableKey as string)
  : null
