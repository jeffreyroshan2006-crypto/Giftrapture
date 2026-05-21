import { supabase } from "./supabaseClient";

// Check if the current user is authenticated as admin
export async function getAdminSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) return null;

  // Verify admin role in user metadata
  const isAdmin = session.user.user_metadata?.role === "admin";
  if (!isAdmin) return null;

  return session;
}

// Sign out admin
export async function adminSignOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
