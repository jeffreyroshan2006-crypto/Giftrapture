import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    return {};
  }

  const contents = fs.readFileSync(envPath, "utf8");
  const env = {};

  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const index = trimmed.indexOf("=");
    if (index === -1) {
      continue;
    }
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }

  return env;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const ALL_PRODUCTS = [
  { name: "Velvet Crimson Rose", price: 3499, image: "/images/bouquets/IMG_3893.jpg", tag: "Bestseller", category: "bouquets", relation: "For Her" },
  { name: "Ethereal White Lilies", price: 2999, image: "/images/bouquets/IMG_3894.jpg", tag: "Classic", category: "bouquets", relation: "For Parents" },
  { name: "Blush Peony Symphony", price: 4200, image: "/images/bouquets/IMG_3895.jpg", tag: "Premium", category: "bouquets", relation: "For Her" },
  { name: "Midnight Orchid Cascade", price: 5499, image: "/images/bouquets/IMG_3897.jpg", tag: "Luxury", category: "bouquets", relation: "For Couples" },
  { name: "Sunset Orange Tulips", price: 2750, image: "/images/bouquets/IMG_3898.jpg", tag: "Seasonal", category: "bouquets", relation: "For Siblings" },
  { name: "Golden Sunflower Burst", price: 2299, image: "/images/bouquets/IMG_3926.png", tag: "Vibrant", category: "bouquets", relation: "For Colleagues" },
  { name: "Pastel Hydrangea Cloud", price: 3800, image: "/images/bouquets/IMG_3927.png", tag: "Elegant", category: "bouquets", relation: "For Her" },
  { name: "Royal Purple Iris", price: 3100, image: "/images/bouquets/IMG_3928.png", tag: "Exotic", category: "bouquets", relation: "For Him" },
  { name: "Wildflower Meadows", price: 2650, image: "/images/bouquets/IMG_3930.png", tag: "Rustic", category: "bouquets", relation: "For Siblings" },
  { name: "Scarlet Passion Mix", price: 4500, image: "/images/bouquets/IMG_3931.png", tag: "Romantic", category: "bouquets", relation: "For Her" },
  { name: "Frosty Morning Blooms", price: 3300, image: "/images/bouquets/IMG_3932.png", tag: "Fresh", category: "bouquets", relation: "For Parents" },
  { name: "Enchanted Forest Ferns", price: 2899, image: "/images/bouquets/IMG_3933.png", tag: "Verdant", category: "bouquets", relation: "For Colleagues" },
  { name: "Candy Pink Carnations", price: 1999, image: "/images/bouquets/IMG_3936.png", tag: "Sweet", category: "bouquets", relation: "For Siblings" },
  { name: "Sapphire Blue Delphinium", price: 4100, image: "/images/bouquets/IMG_3937.png", tag: "Rare", category: "bouquets", relation: "For Him" },
  { name: "Majestic Imperial Lily", price: 5999, image: "/images/bouquets/IMG_3941.png", tag: "Signature", category: "bouquets", relation: "For Parents" },
  { name: "Royal Celebration Hamper", price: 7499, image: "/images/themed-hampers/IMG_3723.jpg", tag: "Premium", category: "hampers", relation: "For Couples" },
  { name: "Gilded Indulgence Box", price: 6999, image: "/images/themed-hampers/IMG_3899.jpg", tag: "Luxury", category: "hampers", relation: "For Colleagues" },
  { name: "Velvet Treasure Chest", price: 5499, image: "/images/themed-hampers/IMG_3900.jpg", tag: "Bestseller", category: "hampers", relation: "For Her" },
  { name: "Midnight Bliss Hamper", price: 8200, image: "/images/themed-hampers/IMG_3912.jpg", tag: "Signature", category: "hampers", relation: "For Him" },
  { name: "Golden Glow Festive Basket", price: 4999, image: "/images/themed-hampers/IMG_3914.jpg", tag: "Festive", category: "hampers", relation: "For Parents" },
  { name: "Classic Elegance Trunk", price: 6200, image: "/images/themed-hampers/IMG_3915.jpg", tag: "Classic", category: "hampers", relation: "For Parents" },
  { name: "Opulent Harvest Tray", price: 3899, image: "/images/themed-hampers/IMG_3916.jpg", tag: "Organic", category: "hampers", relation: "For Siblings" },
  { name: "Champagne & Roses Box", price: 9500, image: "/images/themed-hampers/IMG_3917.jpg", tag: "Ultimate", category: "hampers", relation: "For Couples" },
  { name: "Sweet Serenade Basket", price: 4500, image: "/images/themed-hampers/IMG_3918.png", tag: "Sweet", category: "hampers", relation: "For Siblings" },
  { name: "Blossom & Bites Platter", price: 5100, image: "/images/themed-hampers/IMG_3920.png", tag: "Curated", category: "hampers", relation: "For Her" },
  { name: "Gourmet Symphony Trunk", price: 7999, image: "/images/themed-hampers/IMG_3921.png", tag: "Gourmet", category: "hampers", relation: "For Colleagues" },
  { name: "Aura of Gold Hamper", price: 6750, image: "/images/themed-hampers/IMG_3922.png", tag: "Limited", category: "hampers", relation: "For Him" },
  { name: "Pink Petal Perfection Box", price: 4200, image: "/images/themed-hampers/IMG_3923.png", tag: "Romantic", category: "hampers", relation: "For Her" },
  { name: "Luxury Artisan Casket", price: 8900, image: "/images/themed-hampers/IMG_3929.png", tag: "Custom", category: "hampers", relation: "For Colleagues" },
  { name: "Ethereal Treats Tray", price: 3600, image: "/images/themed-hampers/IMG_3938.jpg", tag: "Delight", category: "hampers", relation: "For Siblings" },
  { name: "Deluxe Wellness Hamper", price: 5800, image: "/images/themed-hampers/IMG_3940.jpg", tag: "Wellness", category: "hampers", relation: "For Parents" },
  { name: "Al-Noor Premium Eid Box", price: 6499, image: "/images/eid-hampers/IMG_3848.png", tag: "Premium", category: "eid-hampers", relation: "For Parents" },
  { name: "Hilal Delights Basket", price: 5200, image: "/images/eid-hampers/IMG_3942.png", tag: "Festive", category: "eid-hampers", relation: "For Couples" },
  { name: "Royal Mubarak Trunk", price: 8500, image: "/images/eid-hampers/IMG_3943.png", tag: "Luxury", category: "eid-hampers", relation: "For Parents" },
  { name: "Sacred Bloom Platter", price: 4800, image: "/images/eid-hampers/IMG_3944.png", tag: "Elegant", category: "eid-hampers", relation: "For Her" },
  { name: "Barakah Abundance Hamper", price: 7299, image: "/images/eid-hampers/IMG_3945.png", tag: "Bestseller", category: "eid-hampers", relation: "For Couples" },
  { name: "Zamarud Gold Artisan Tray", price: 3999, image: "/images/eid-hampers/IMG_3946.png", tag: "Handcrafted", category: "eid-hampers", relation: "For Siblings" },
];

const fileEnv = loadEnvFile();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fileEnv.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || fileEnv.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const rows = ALL_PRODUCTS.map((product) => ({
  slug: slugify(product.name),
  name: product.name,
  price: product.price,
  image: product.image,
  images: [], // Start with empty images array, will be populated through admin
  tag: product.tag || null,
  category: product.category,
  relation: product.relation,
  relations: [product.relation], // Initialize with the single relation
  description: "",
  inclusions: [],
}));

const { error } = await supabase.from("products").upsert(rows, { onConflict: "slug" });

if (error) {
  console.error("Failed to seed products:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} products into Supabase.`);
