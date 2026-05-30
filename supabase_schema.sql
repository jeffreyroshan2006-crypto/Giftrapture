-- ====================================================================
-- GIFTRAPTURE SUPABASE DATABASE SCHEMA INITIALIZER
-- ====================================================================
-- Copy and paste this script directly into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mhpdpejpjisidlypmwpb/sql/new
-- ====================================================================

-- 1. Create products table
 CREATE TABLE IF NOT EXISTS public.products (
   id TEXT PRIMARY KEY,
   name TEXT NOT NULL,
   price NUMERIC NOT NULL,
   strike_price NUMERIC,
   image TEXT DEFAULT '/images/placeholder.jpg' NOT NULL,
   images JSONB DEFAULT '[]'::jsonb,
   tag TEXT,
   category TEXT NOT NULL,
   relation TEXT DEFAULT 'For Couples',
   relations JSONB DEFAULT '[]'::jsonb,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
 );

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. Create public read policy (anyone can view products)
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT USING (true);

-- 4. Create admin full write policy (only authenticated users can edit products)
CREATE POLICY "Allow admin all access" ON public.products
  FOR ALL TO authenticated USING (true);

-- 5. Create orders table (auto-captures address & items before WhatsApp redirect)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL,
  address TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'whatsapp_pending',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Enable Row Level Security (RLS) for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 7. Allow anyone to insert/read their own orders (public),
--    and authenticated (admins) can see all orders.
CREATE POLICY "Allow public insert and select" ON public.orders
  FOR ALL TO public USING (true) WITH CHECK (true);

 -- 8. Seed the initial 37 luxury bouquets, themed hampers, and Eid hampers
 INSERT INTO public.products (id, name, price, strike_price, image, tag, category, relation) VALUES
   -- Bouquets
   ('bq-1', 'Velvet Crimson Rose', 3499, 4499, '/images/bouquets/IMG_3893.jpg', 'Bestseller', 'bouquets', 'For Her'),
   ('bq-2', 'Ethereal White Lilies', 2999, 3599, '/images/bouquets/IMG_3894.jpg', 'Classic', 'bouquets', 'For Parents'),
   ('bq-3', 'Blush Peony Symphony', 4200, 4999, '/images/bouquets/IMG_3895.jpg', 'Premium', 'bouquets', 'For Her'),
   ('bq-4', 'Midnight Orchid Cascade', 5499, 6499, '/images/bouquets/IMG_3897.jpg', 'Luxury', 'bouquets', 'For Couples'),
   ('bq-5', 'Sunset Orange Tulips', 2750, 3199, '/images/bouquets/IMG_3898.jpg', 'Seasonal', 'bouquets', 'For Siblings'),
   ('bq-6', 'Golden Sunflower Burst', 2299, 2799, '/images/bouquets/IMG_3926.png', 'Vibrant', 'bouquets', 'For Colleagues'),
   ('bq-7', 'Pastel Hydrangea Cloud', 3800, 4599, '/images/bouquets/IMG_3927.png', 'Elegant', 'bouquets', 'For Her'),
   ('bq-8', 'Royal Purple Iris', 3100, 3699, '/images/bouquets/IMG_3928.png', 'Exotic', 'bouquets', 'For Him'),
   ('bq-9', 'Wildflower Meadows', 2650, 3199, '/images/bouquets/IMG_3930.png', 'Rustic', 'bouquets', 'For Siblings'),
   ('bq-10', 'Scarlet Passion Mix', 4500, 5499, '/images/bouquets/IMG_3931.png', 'Romantic', 'bouquets', 'For Her'),
   ('bq-11', 'Frosty Morning Blooms', 3300, 3999, '/images/bouquets/IMG_3932.png', 'Fresh', 'bouquets', 'For Parents'),
   ('bq-12', 'Enchanted Forest Ferns', 2899, 3499, '/images/bouquets/IMG_3933.png', 'Verdant', 'bouquets', 'For Colleagues'),
   ('bq-13', 'Candy Pink Carnations', 1999, 2399, '/images/bouquets/IMG_3936.png', 'Sweet', 'bouquets', 'For Siblings'),
   ('bq-14', 'Sapphire Blue Delphinium', 4100, 4899, '/images/bouquets/IMG_3937.png', 'Rare', 'bouquets', 'For Him'),
   ('bq-15', 'Majestic Imperial Lily', 5999, 7299, '/images/bouquets/IMG_3941.png', 'Signature', 'bouquets', 'For Parents'),

   -- Themed Hampers
   ('hm-1', 'Royal Celebration Hamper', 7499, 8999, '/images/themed-hampers/IMG_3723.jpg', 'Premium', 'hampers', 'For Couples'),
   ('hm-2', 'Gilded Indulgence Box', 6999, 8499, '/images/themed-hampers/IMG_3899.jpg', 'Luxury', 'hampers', 'For Colleagues'),
   ('hm-3', 'Velvet Treasure Chest', 5499, 6699, '/images/themed-hampers/IMG_3900.jpg', 'Bestseller', 'hampers', 'For Her'),
   ('hm-4', 'Midnight Bliss Hamper', 8200, 9999, '/images/themed-hampers/IMG_3912.jpg', 'Signature', 'hampers', 'For Him'),
   ('hm-5', 'Golden Glow Festive Basket', 4999, 5999, '/images/themed-hampers/IMG_3914.jpg', 'Festive', 'hampers', 'For Parents'),
   ('hm-6', 'Classic Elegance Trunk', 6200, 7499, '/images/themed-hampers/IMG_3915.jpg', 'Classic', 'hampers', 'For Parents'),
   ('hm-7', 'Opulent Harvest Tray', 3899, 4699, '/images/themed-hampers/IMG_3916.jpg', 'Organic', 'hampers', 'For Siblings'),
   ('hm-8', 'Champagne & Roses Box', 9500, 11499, '/images/themed-hampers/IMG_3917.jpg', 'Ultimate', 'hampers', 'For Couples'),
   ('hm-9', 'Sweet Serenade Basket', 4500, 5499, '/images/themed-hampers/IMG_3918.png', 'Sweet', 'hampers', 'For Siblings'),
   ('hm-10', 'Blossom & Bites Platter', 5100, 6199, '/images/themed-hampers/IMG_3920.png', 'Curated', 'hampers', 'For Her'),
   ('hm-11', 'Gourmet Symphony Trunk', 7999, 9699, '/images/themed-hampers/IMG_3921.png', 'Gourmet', 'hampers', 'For Colleagues'),
   ('hm-12', 'Aura of Gold Hamper', 6750, 8199, '/images/themed-hampers/IMG_3922.png', 'Limited', 'hampers', 'For Him'),
   ('hm-13', 'Pink Petal Perfection Box', 4200, 4999, '/images/themed-hampers/IMG_3923.png', 'Romantic', 'hampers', 'For Her'),
   ('hm-14', 'Luxury Artisan Casket', 8900, 10799, '/images/themed-hampers/IMG_3929.png', 'Custom', 'hampers', 'For Colleagues'),
   ('hm-15', 'Ethereal Treats Tray', 3600, 4299, '/images/themed-hampers/IMG_3938.jpg', 'Delight', 'hampers', 'For Siblings'),
   ('hm-16', 'Deluxe Wellness Hamper', 5800, 6999, '/images/themed-hampers/IMG_3940.jpg', 'Wellness', 'hampers', 'For Parents'),

   -- Eid Hampers
   ('eh-1', 'Al-Noor Premium Eid Box', 6499, 7799, '/images/eid-hampers/IMG_3848.png', 'Premium', 'eid-hampers', 'For Couples'),
   ('eh-2', 'Hilal Delights Basket', 5200, 6299, '/images/eid-hampers/IMG_3942.png', 'Festive', 'eid-hampers', 'For Parents'),
   ('eh-3', 'Royal Mubarak Trunk', 8500, 10299, '/images/eid-hampers/IMG_3943.png', 'Luxury', 'eid-hampers', 'For Couples'),
   ('eh-4', 'Sacred Bloom Platter', 4800, 5799, '/images/eid-hampers/IMG_3944.png', 'Elegant', 'eid-hampers', 'For Her'),
   ('eh-5', 'Barakah Abundance Hamper', 7299, 8799, '/images/eid-hampers/IMG_3945.png', 'Bestseller', 'eid-hampers', 'For Parents'),
  ('eh-6', 'Zamarud Gold Artisan Tray', 3999, 4799, '/images/eid-hampers/IMG_3946.png', 'Handcrafted', 'eid-hampers', 'For Colleagues')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  strike_price = EXCLUDED.strike_price,
  image = EXCLUDED.image,
  tag = EXCLUDED.tag,
  category = EXCLUDED.category,
  relation = EXCLUDED.relation;

-- 9. Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_approved BOOLEAN DEFAULT true
);

-- 10. Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 11. Public read policy (only approved testimonials)
CREATE POLICY "Allow public read approved testimonials" ON public.testimonials
  FOR SELECT USING (is_approved = true);

-- 12. Public insert policy (anyone can submit)
CREATE POLICY "Allow public insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (true);

-- 13. Delete policy for authenticated users (admin)
CREATE POLICY "Allow authenticated delete testimonials" ON public.testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- 16. Create packaging_options table for custom box builder
CREATE TABLE IF NOT EXISTS public.packaging_options (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image TEXT DEFAULT '/images/placeholder.jpg' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.packaging_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read packaging options" ON public.packaging_options
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all packaging" ON public.packaging_options
  FOR ALL TO authenticated USING (true);

-- 17. Create personalization_options table
CREATE TABLE IF NOT EXISTS public.personalization_options (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  image TEXT DEFAULT '/images/placeholder.jpg' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.personalization_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read personalization options" ON public.personalization_options
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all personalization" ON public.personalization_options
  FOR ALL TO authenticated USING (true);

-- 18. Create custom_box_items table (catalog for custom box builder)
CREATE TABLE IF NOT EXISTS public.custom_box_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT,
  image TEXT DEFAULT ''::text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.custom_box_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read custom box items" ON public.custom_box_items
  FOR SELECT USING (true);

CREATE POLICY "Allow admin all custom box items" ON public.custom_box_items
  FOR ALL TO authenticated USING (true);

-- Seed packaging options (images left empty for manual upload)
INSERT INTO public.packaging_options (id, name, price, description, image) VALUES
  ('box-craft', 'Luxe Craft Cardboard Box', 350, 'Minimalist eco-premium packaging with signature silk ribbon.', ''),
  ('box-pine', 'Premium Pine Wood Trunk', 750, 'Solid, reusable wooden trunk with brass latch for a rustic-royal charm.', ''),
  ('box-velvet', 'Imperial Royal Velvet Chest', 1200, 'Soft, deep velvet casing lined with gold satin sheets.', ''),
  ('basket-wicker', 'Heritage Wicker Basket', 480, 'Handwoven basket finished with satin lining and a custom tag.', ''),
  ('tray-lacquer', 'Lacquered Celebration Tray', 650, 'Glossy keepsake tray for floral + gourmet pairings.', '')
ON CONFLICT (id) DO NOTHING;

-- Seed personalization options (images left empty)
INSERT INTO public.personalization_options (id, name, price, description, image) VALUES
  ('message-card', 'Handwritten Message Card', 150, 'Personalize the presentation for a premium finish.', ''),
  ('ribbon-emerald', 'Emerald Satin Ribbon', 120, 'Personalize the presentation for a premium finish.', ''),
  ('foil-name', 'Gold Foil Name Tag', 250, 'Personalize the presentation for a premium finish.', ''),
  ('color-palette', 'Custom Color Palette Wrap', 180, 'Personalize the presentation for a premium finish.', '')
ON CONFLICT (id) DO NOTHING;

-- Seed custom box catalog items (images left empty for manual upload)
INSERT INTO public.custom_box_items (id, name, price, category, image) VALUES
  ('fill-almonds', 'Gourmet Roasted Almonds (200g)', 450, 'Gourmet', ''),
  ('fill-chocs', 'Artisanal Dark Hazelnut Chocolates', 650, 'Gourmet', ''),
  ('fill-candle', 'Scented Lavender Soy Wax Candle', 399, 'Wellness', ''),
  ('fill-tea', 'Exotic Kashmiri Saffron Tea (50g)', 800, 'Gourmet', ''),
  ('fill-roses', 'Red Velvet Rose Arrangement', 1200, 'Floral', ''),
  ('fill-perfume', 'Handcrafted Sandalwood Perfume (50ml)', 1800, 'Wellness', ''),
  ('fill-cookie', 'Butter Pistachio Cookies (250g)', 520, 'Gourmet', ''),
  ('fill-diffuser', 'Bergamot Reed Diffuser', 950, 'Wellness', '')
ON CONFLICT (id) DO NOTHING;

-- 13. Create product_reviews table
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_approved ON public.product_reviews(is_approved) WHERE is_approved = true;

-- 15. RLS for product_reviews
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- 16. Public read policy (approved reviews only)
CREATE POLICY "Allow public read approved product reviews" ON public.product_reviews
  FOR SELECT USING (is_approved = true);

-- 17. Public insert policy (anyone can submit)
CREATE POLICY "Allow public insert product reviews" ON public.product_reviews
  FOR INSERT WITH CHECK (true);

-- 18. Delete policy for authenticated users (admin)
CREATE POLICY "Allow authenticated delete product reviews" ON public.product_reviews
  FOR DELETE USING (auth.role() = 'authenticated');
