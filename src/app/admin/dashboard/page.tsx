import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { getServerClient } from "@/lib/supabaseServerClient";

export default async function AdminDashboardPage() {
  const supabase = await getServerClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  const isAdmin = user?.user_metadata?.role === "admin";

  if (error || !user || !isAdmin) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
