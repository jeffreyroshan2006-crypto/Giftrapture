import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerClient } from '@/lib/supabaseServerClient';

export async function GET() {
  const supabase = await getServerClient();
  const { data, error } = await supabase.from('personalization_options').select('*').order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = await getServerClient();
  const body = await request.json();
  const payload = {
    id: body.id || `pers-${Date.now()}`,
    name: body.name,
    price: body.price || 0,
    description: body.description || null,
    image: body.image || '/images/placeholder.jpg',
  };

  const { data, error } = await supabase.from('personalization_options').upsert(payload).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/shop/custom-box');
  revalidatePath('/admin/custom-box');
  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const supabase = await getServerClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('personalization_options').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/shop/custom-box');
  revalidatePath('/admin/custom-box');
  return NextResponse.json({ ok: true });
}
