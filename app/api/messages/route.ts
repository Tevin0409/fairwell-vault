import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, type = 'personal' } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and Message are required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([{ name, message, type }])
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    // Verify Supabase token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
