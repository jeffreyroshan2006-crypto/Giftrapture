import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabaseServerClient";
import AdminOrdersClient from "./AdminOrdersClient";

export default async function AdminOrdersPage() {
  const supabase = await getServerClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  const isAdmin = user?.user_metadata?.role === "admin";

  if (error || !user || !isAdmin) {
    redirect("/admin/login");
  }

  return <AdminOrdersClient />;
}
