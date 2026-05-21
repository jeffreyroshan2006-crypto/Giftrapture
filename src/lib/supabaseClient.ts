import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mhpdpejpjisidlypmwpb.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key-for-prerender-evaluation";

// --- Legacy direct supabase-js client ---
// For simple data reads where auth session handling is not required.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
