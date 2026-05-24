-- ====================================================================
-- GIFTRAPTURE DATABASE MIGRATION
-- ====================================================================
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mhpdpejpjisidlypmwpb/sql/new
-- ====================================================================

-- Step 1: Add missing 'images' column (stores array of image URLs)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Step 2: Add missing 'relations' column (stores array of relation tags)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS relations JSONB DEFAULT '[]'::jsonb;

-- Step 3: Add missing 'slug' column if it does not exist
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS slug TEXT;

-- Step 4: Backfill 'slug' from 'id' for existing products that have none
UPDATE public.products SET slug = id WHERE slug IS NULL;

-- Step 5: Backfill 'images' from 'image' for existing products
-- This ensures existing products with a single image show it in the gallery
UPDATE public.products
  SET images = jsonb_build_array(image)
  WHERE (images IS NULL OR images = '[]'::jsonb)
    AND image IS NOT NULL
    AND image != '/images/placeholder.jpg';

-- Step 6: Backfill 'relations' from 'relation' for existing products
UPDATE public.products
  SET relations = jsonb_build_array(relation)
  WHERE (relations IS NULL OR relations = '[]'::jsonb)
    AND relation IS NOT NULL;

-- Done! Verify:
SELECT id, name, slug, image, images, relations FROM public.products LIMIT 5;
