'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function login(email : string, password : string) {
  const supabase = await createClient()

  const data = {
    email: email,
    password: password,
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { 
    success: true, 
    user: user,
    redirect: '/'
  };
}

export async function logout() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login2')
}
