import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mhpdpejpjisidlypmwpb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ocGRwZWpwamlzaWRseXBtd3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTM4NjMsImV4cCI6MjA5NDY4OTg2M30.20XCpVgopIa_GxgYSy8EENxIW-zJHBC_BjWUkDWKqNM";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("=== Checking Supabase products table ===\n");

  // 1. List all products
  const { data: all, error: allErr } = await supabase
    .from("products")
    .select("id, name, category")
    .order("category");

  if (allErr) {
    console.error("ERROR listing products:", JSON.stringify(allErr, null, 2));
  } else {
    console.log(`Total products in DB: ${all.length}`);
    all.forEach(p => console.log(`  [${p.category}] ${p.id} — ${p.name}`));
  }

  // 2. Test .single() vs .maybeSingle() for a non-existent ID
  console.log("\n=== Testing .single() with non-existent UUID ===");
  const fakeId = "b910c83f-0239-45d1-9a74-881dfc28d431";
  
  const { data: d1, error: e1 } = await supabase
    .from("products")
    .select("*")
    .eq("id", fakeId)
    .single();

  console.log("  .single() data:", d1);
  console.log("  .single() error:", JSON.stringify(e1, null, 2));

  console.log("\n=== Testing .maybeSingle() with non-existent UUID ===");
  const { data: d2, error: e2 } = await supabase
    .from("products")
    .select("*")
    .eq("id", fakeId)
    .maybeSingle();

  console.log("  .maybeSingle() data:", d2);
  console.log("  .maybeSingle() error:", JSON.stringify(e2, null, 2));

  // 3. Test with a known seeded ID
  console.log("\n=== Testing .single() with seeded ID 'bq-1' ===");
  const { data: d3, error: e3 } = await supabase
    .from("products")
    .select("*")
    .eq("id", "bq-1")
    .single();

  console.log("  .single() data:", d3 ? `${d3.name} — ₹${d3.price}` : null);
  console.log("  .single() error:", JSON.stringify(e3, null, 2));

  // 4. Check table columns
  console.log("\n=== Sample product column keys ===");
  if (all && all.length > 0) {
    const { data: full } = await supabase.from("products").select("*").limit(1).single();
    if (full) console.log("  Columns:", Object.keys(full).join(", "));
  }
}

check();
