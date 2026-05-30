import { getServerClient } from "@/lib/supabaseServerClient";
import CustomBoxClient from "../../../components/CustomBoxClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Option = { id: string; name: string; description?: string | null; price: number; image?: string | null; category?: string | null };

export default async function CustomBoxPage() {
  const supabase = await getServerClient();

  const [packagingResult, itemsResult, personalizationResult] = await Promise.all([
    supabase.from("packaging_options").select("*").order("created_at", { ascending: true }).throwOnError(),
    supabase.from("custom_box_items").select("*").order("created_at", { ascending: true }).throwOnError(),
    supabase.from("personalization_options").select("*").order("created_at", { ascending: true }).throwOnError(),
  ]);

  return (
    <CustomBoxClient
      packaging={(packagingResult.data || []) as Option[]}
      items={(itemsResult.data || []) as Option[]}
      personalization={(personalizationResult.data || []) as Option[]}
    />
  );
}
