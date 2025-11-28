import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { isFavorite } = body

    const { data, error } = await supabaseAdmin
      .from('messages')
      .update({ is_favorite: isFavorite })
      .eq('id', params.id)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
