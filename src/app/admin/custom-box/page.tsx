import { getServerClient } from "@/lib/supabaseServerClient";
import AdminCustomBoxClient from "./AdminCustomBoxClient";

export default async function AdminCustomBoxPage() {
  const supabase = await getServerClient();

  const [packagingResult, personalizationResult, itemsResult] = await Promise.all([
    supabase.from("packaging_options").select("*").order("created_at", { ascending: true }),
    supabase.from("personalization_options").select("*").order("created_at", { ascending: true }),
    supabase.from("custom_box_items").select("*").order("created_at", { ascending: true }),
  ]);

  return (
    <AdminCustomBoxClient
      initialPackaging={packagingResult.data || []}
      initialPersonalization={personalizationResult.data || []}
      initialItems={itemsResult.data || []}
    />
  );
}
