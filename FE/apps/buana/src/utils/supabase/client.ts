import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  console.log('ini url', process.env.NEXT_PUBLIC_SUPA_API_URL!)
  console.log('ini anon key', process.env.NEXT_PUBLIC_SUPA_ANON_KEY!)
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPA_API_URL!,
    process.env.NEXT_PUBLIC_SUPA_ANON_KEY!
  )
}