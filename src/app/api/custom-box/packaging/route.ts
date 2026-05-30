import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabaseServerClient';

export async function GET() {
  const supabase = await getServerClient();
  const { data, error } = await supabase.from('packaging_options').select('*').order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
