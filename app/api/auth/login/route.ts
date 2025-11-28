import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return NextResponse.json({ token: data.session?.access_token })
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
