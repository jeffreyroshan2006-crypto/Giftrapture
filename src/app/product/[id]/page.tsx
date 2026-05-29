"use client";

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useMemo, use, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Star, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import ProductReviews from "@/components/ProductReviews";

// Dynamic Product Details Pool
const PRODUCTS_POOL: Record<string, {
  id: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  tag: string;
  description: string;
  inclusions: string[];
  reviews: { author: string; text: string; rating: number }[];
}> = {
  "royal-azure": {
    id: "bs-1",
    name: "The Royal Azure Box",
    price: 6800,
    strike_price: 7999,
    image: "/images/themed-hampers/IMG_3723.jpg",
    tag: "Bestseller",
    description: "Our signature premium hamper packed in a majestic indigo leather trunk, decorated with dried golden lavender stems. Features top-tier organic dry fruits, custom almond dragees, and an exquisite scented soy candle.",
    inclusions: ["Indigo Leather Trunk with Brass Latch", "Gourmet Roasted Salted Almonds (200g)", "Artisanal White Chocolate Dragees (150g)", "Midnight Lavender Scented Candle", "Handwritten Calligraphy Wish Card"],
    reviews: [
      { author: "Ananya S.", text: "Absolutely stunning presentation. It looked so grand and royal!", rating: 5 },
      { author: "Vikram K.", text: "High quality leather trunk, and the chocolates were divine.", rating: 5 }
    ]
  },
  "blush-peony": {
    id: "bs-2",
    name: "Blush Peony Symphony",
    price: 4200,
    strike_price: 4999,
    image: "/images/bouquets/IMG_3895.jpg",
    tag: "Premium",
    description: "An elegant, hand-tied premium floral bouquet showcasing premium blush Dutch peonies, miniature pastel pink roses, and fresh eucalyptus foliage, wrapped in heavy waterproof Parisian craft paper.",
    inclusions: ["10 Fresh Imported Blush Peonies", "8 Premium Miniature Pink Roses", "Fresh Eucalyptus Stems", "Parisian Waterproof Wrapping & Silk Ribbon", "Water-pack hydration wrapping"],
    reviews: [
      { author: "Sneha R.", text: "Peonies are incredibly hard to find fresh. These were pristine and smelled beautiful!", rating: 5 }
    ]
  },
  "corporate-kit": {
    id: "bs-3",
    name: "Corporate Executive Kit",
    price: 9999,
    strike_price: 12499,
    image: "/images/themed-hampers/IMG_3899.jpg",
    tag: "Signature",
    description: "A state-of-the-art corporate gifting case engineered for executive partnerships. Conceived with premium writing tools, insulated thermal cups, gourmet teas, and custom leather accessories.",
    inclusions: ["Sleek Charcoal Wooden Case with Logo Slot", "Insulated Brushed Gold Thermos (500ml)", "Handmade Leather Journal with Pen", "Assorted Kashmiri Saffron Tea Bags (20)", "Single Estate Organic Honey Jar with Dipper"],
    reviews: [
      { author: "Meghna D.", text: "Our clients absolutely loved these for Diwali. Great corporate finish.", rating: 5 }
    ]
  },
  "trousseau-trunk": {
    id: "bs-4",
    name: "Classic Trousseau Trunk",
    price: 15000,
    strike_price: 18499,
    image: "/images/themed-hampers/IMG_3915.jpg",
    tag: "Wedding Special",
    description: "An opulent wedding trousseau chest made of sheer wood and brass. Beautifully decorated with pastel roses, orchids, and custom net wrapping. The ultimate chest for bridal blessings.",
    inclusions: ["Opulent Pine Wood Trousseau Trunk", "Pastel Silk Net Draping & Floral Garlands", "Curated Signature Scented Drawer Sachets", "Custom gold foil greeting board"],
    reviews: [
      { author: "Rahul P.", text: "Beautifully decorated! It became the centerpiece of our wedding gifts.", rating: 5 }
    ]
  },
  "bq-6": {
    id: "bq-6",
    name: "Classic Ranunculus Bouquet",
    price: 2499,
    strike_price: 2999,
    image: "/images/bouquets/IMG_3926.png",
    tag: "Best Seller",
    description: "A breathtaking hand-tied bouquet featuring fresh imported ranunculus, garden roses, and eucalyptus foliage, wrapped in premium Parisian craft paper. Perfect for birthdays, anniversaries, and heartfelt celebrations.",
    inclusions: ["Fresh Imported Ranunculus Stems", "Premium Garden Roses", "Fresh Eucalyptus Foliage", "Parisian Craft Paper Wrapping & Silk Ribbon", "Handwritten Luxury Note Card"],
    reviews: [
      { author: "Priya M.", text: "The ranunculus were incredibly fresh and lasted over a week. Stunning presentation!", rating: 5 },
      { author: "Arjun K.", text: "Beautiful bouquet, exactly as pictured. My wife loved it.", rating: 5 }
    ]
  },
  "hm-6": {
    id: "hm-6",
    name: "Signature Silk Trousseau Box",
    price: 5999,
    strike_price: 7299,
    image: "/images/themed-hampers/IMG_3915.jpg",
    tag: "Handcrafted",
    description: "An exquisite silk-lined trousseau box crafted for weddings and bridal gifting. Filled with premium keepsakes, artisanal treats, and a bespoke fragrance collection, wrapped in hand-dyed silk and finished with a wax seal.",
    inclusions: ["Handcrafted Silk-Lined Wooden Box", "Artisanal Almond & Saffron Brittle (200g)", "Bespoke Luxury Scented Candle", "Hand-Embroidered Silk Pouch with Keepsakes", "Personalised Greeting Card with Wax Seal"],
    reviews: [
      { author: "Lakshmi R.", text: "The presentation was absolutely royal! The silk lining made it feel so luxurious.", rating: 5 },
      { author: "Devika S.", text: "Perfect for my sister's wedding. Every item inside felt curated with love.", rating: 5 }
    ]
  },
  "hm-3": {
    id: "hm-3",
    name: "Artisanal Chocolate Hamper",
    price: 3250,
    strike_price: 3999,
    image: "/images/themed-hampers/IMG_3900.jpg",
    tag: "Indulgent",
    description: "A decadent hamper for the true chocolate connoisseur, featuring an assortment of single-origin, bean-to-bar chocolates, handmade truffles, and premium cocoa-dipped almonds, presented in a reusable luxury keepsake box.",
    inclusions: ["Reusable Luxury Wooden Keepsake Box", "Single-Origin Dark Chocolate Bar (70%)", "Handmade Hazelnut Truffles (12 pcs)", "Premium Cocoa-Dipped Almonds (150g)", "Artisan Hot Cocoa Mix with Whisk"],
    reviews: [
      { author: "Rohan T.", text: "Best chocolate hamper I've ever gifted. The single-origin bar was exceptional.", rating: 5 },
      { author: "Ananya P.", text: "Looks so premium and tastes even better. Will definitely reorder.", rating: 5 }
    ]
  },
  "bq-3": {
    id: "bq-3",
    name: "Premium Peony Arrangement",
    price: 4799,
    strike_price: 4999,
    image: "/images/bouquets/IMG_3893.jpg",
    tag: "Limited Edition",
    description: "An opulent arrangement of the finest imported Dutch peonies, hand-selected at peak bloom, paired with soft blush roses and cascading greenery. A rare and luxurious floral gift for the most discerning recipient.",
    inclusions: ["12 Fresh Imported Dutch Peonies", "8 Premium Blush Roses", "Seasonal Eucalyptus & Dusty Miller", "Elegant Vase-Ready Wrapping", "Care Guide & Hydration Sachet"],
    reviews: [
      { author: "Meera J.", text: "Peonies are my favourite and these were absolutely perfect. Full, fluffy, and incredibly fragrant.", rating: 5 },
      { author: "Kunal S.", text: "Worth every rupee. The arrangement looked like it came straight from a luxury florist in London.", rating: 5 }
    ]
  },
  "bq-1": {
    id: "bq-1",
    name: "Velvet Crimson Rose",
    price: 3499,
    strike_price: 4299,
    image: "/images/bouquets/IMG_3893.jpg",
    tag: "Bestseller",
    description: "A hand-tied arrangement of deep velvet crimson roses, layered with lush greenery and seasonal wildflowers. Wrapped in premium textured kraft with a satin crimson bow, this bouquet speaks passion, elegance, and heartfelt emotion.",
    inclusions: ["15 Velvet Crimson Roses", "Fresh Seasonal Greenery", "Textured Premium Kraft Wrap", "Satin Crimson Ribbon", "Luxury Greeting Card"],
    reviews: [
      { author: "Rhea K.", text: "The colour was impossibly deep and rich. It felt like receiving luxury itself.", rating: 5 },
      { author: "Arun P.", text: "Delivered on time and looked better than the photos. Will order again.", rating: 5 }
    ]
  },
  "bq-2": {
    id: "bq-2",
    name: "Ethereal White Lilies",
    price: 2999,
    strike_price: 3599,
    image: "/images/bouquets/IMG_3894.jpg",
    tag: "Classic",
    description: "Pure, ethereal white lilies paired with fragrant jasmine and silver-dollar eucalyptus. A classic and sophisticated choice for celebrations, condolences, and moments of grace.",
    inclusions: ["12 White Oriental Lilies", "Fragrant Jasmine Sprigs", "Silver-Dollar Eucalyptus", "Ivory Wrap & Silk Tie", "Hydration Mist"],
    reviews: [
      { author: "Nisha M.", text: "The lilies were so fragrant and the wrapping was exquisite. A truly elegant gift.", rating: 5 },
      { author: "Omar F.", text: "Perfect for sending condolences with dignity and beauty.", rating: 5 }
    ]
  },
  "bq-4": {
    id: "bq-4",
    name: "Midnight Orchid Cascade",
    price: 5499,
    strike_price: 6499,
    image: "/images/bouquets/IMG_3897.jpg",
    tag: "Signature",
    description: "A dramatic cascade of midnight orchids intertwined with deep purple anthuriums and trailing amaranthus. Designed for those who appreciate the extraordinary and the bold.",
    inclusions: ["Architectural Orchid Spray", "Deep Purple Anthuriums", "Trailing Amaranthus", "Hand-dyed Black Gossamer Wrap", "Matte Gift Envelope"],
    reviews: [
      { author: "Dev L.", text: "Bold, dramatic and absolutely stunning. A true piece of floral art.", rating: 5 }
    ]
  },
  "bq-5": {
    id: "bq-5",
    name: "Sunset Orange Tulips",
    price: 2750,
    strike_price: 3199,
    image: "/images/bouquets/IMG_3898.jpg",
    tag: "Seasonal",
    description: "A vibrant burst of orange, yellow, and coral tulips, hand-arranged with sprigs of eucalyptus and babys breath. A perfect way to celebrate new beginnings and joyful milestones.",
    inclusions: ["Seasonal Euro Tulip Mix (25 stems)", "Baby Breath Fillers", "Eucalyptus Sprigs", "Waterproof Kraft Wrap", "Care Instruction Card"],
    reviews: [
      { author: "Priya S.", text: "The tulips brought so much brightness to the room. Beautifully arranged.", rating: 5 }
    ]
  },
  "bq-7": {
    id: "bq-7",
    name: "Pastel Hydrangea Cloud",
    price: 3800,
    strike_price: 4599,
    image: "/images/bouquets/IMG_3927.png",
    tag: "Elegant",
    description: "A dreamy, cloud-like arrangement of pastel hydrangeas in shades of lavender, blue and white, accented with ruscus and ferns. Ideal for baby showers and congratulatory gifts.",
    inclusions: ["Pastel Hydrangea Heads (3 large)", "Ruscus & Fern Accents", "Lilac Wrap Paper", "Silk Bow Tie", "Hydration Kit"],
    reviews: [
      { author: "Ayesha K.", text: "Looked like a cloud! Perfect for my sisters baby shower.", rating: 5 }
    ]
  },
  "bq-8": {
    id: "bq-8",
    name: "Royal Purple Iris",
    price: 3100,
    strike_price: 3699,
    image: "/images/bouquets/IMG_3928.png",
    tag: "Exotic",
    description: "Majestic royal purple irises paired with lavender sprigs and white alstroemeria. A symbol of wisdom and admiration, wrapped in deep purple luxe paper.",
    inclusions: ["Purple Bearded Iris Stems", "Lavender Sprigs", "White Alstroemeria", "Deep Purple Luxe Wrap", "Gift Tag"],
    reviews: [
      { author: "Kiran R.", text: "The irises were majestic. Such an unusual and striking bouquet.", rating: 5 }
    ]
  },
  "bq-9": {
    id: "bq-9",
    name: "Wildflower Meadows",
    price: 2650,
    strike_price: 3199,
    image: "/images/bouquets/IMG_3930.png",
    tag: "Rustic",
    description: "A rustic, free-spirited mix of seasonal wildflowers and dried botanicals. Hand gathered with care and wrapped in hessian for a countryside charm feel.",
    inclusions: ["Seasonal Wildflower Mix", "Dried Wheat & Pampas", "Hessian Linen Wrap", "Jute String & Tag", "Botanical Care Guide"],
    reviews: [
      { author: "Leela N.", text: "So rustic and charming, it felt like it was picked straight from a wild meadow.", rating: 5 }
    ]
  },
  "bq-10": {
    id: "bq-10",
    name: "Scarlet Passion Mix",
    price: 4500,
    strike_price: 5499,
    image: "/images/bouquets/IMG_3931.png",
    tag: "Romantic",
    description: "A passionate blend of deep red roses, burgundy dahlias and scarlet ranunculus, accented with dark foliage. A dramatic expression of love and desire.",
    inclusions: ["14 Deep Red Roses", "Burgundy Dahlias", "Scarlet Ranunculus", "Dark Oak Leaf Foliage", "Passionate Message Card"],
    reviews: [
      { author: "Sameer J.", text: "Wifes jaw dropped. The depth of colour was insane.", rating: 5 }
    ]
  },
  "bq-11": {
    id: "bq-11",
    name: "Frosty Morning Blooms",
    price: 3300,
    strike_price: 3999,
    image: "/images/bouquets/IMG_3932.png",
    tag: "Fresh",
    description: "Cool-toned blooms of white hyacinth, pale blue delphiniums and frosted greenery, perfect for winter celebrations and new year beginnings.",
    inclusions: ["White Hyacinth Bulbs", "Pale Blue Delphiniums", "Frosted Greenery Mix", "Ice-blue Silk Wrap", "Festive Ribbon"],
    reviews: [
      { author: "Tara W.", text: "The frosty white and blue combination is so unique. Truly a winter wonder.", rating: 5 }
    ]
  },
  "bq-12": {
    id: "bq-12",
    name: "Enchanted Forest Ferns",
    price: 2899,
    strike_price: 3499,
    image: "/images/bouquets/IMG_3933.png",
    tag: "Verdant",
    description: "An enchanted forest arrangement of fiddlehead ferns, baby ferns, soft star-shaped flowers and trailing ivy in an earthy moss green wrapping.",
    inclusions: ["Fiddlehead Ferns", "Baby Ferns", "Star-shaped Wildflowers", "Trailing Ivy", "Moss Green Kraft Wrap"],
    reviews: [
      { author: "Meena K.", text: "Looks like a little enchanted forest on my desk. So wild and beautiful.", rating: 4 }
    ]
  },
  "bq-13": {
    id: "bq-13",
    name: "Candy Pink Carnations",
    price: 1999,
    strike_price: 2399,
    image: "/images/bouquets/IMG_3936.png",
    tag: "Sweet",
    description: "A cheerful mix of candy pink carnations, spray roses and hypericum berries. Sweet, playful and universally loved.",
    inclusions: ["Candy Pink Carnation Bunch", "Spray Rose Buds", "Hypericum Berries", "Polka Dot Wrap", "Sweet Greeting"],
    reviews: [
      { author: "Anil G.", text: "Simple, sweet, and absolutely delightful. Carnations done right.", rating: 5 }
    ]
  },
  "bq-14": {
    id: "bq-14",
    name: "Sapphire Blue Delphinium",
    price: 4100,
    strike_price: 4899,
    image: "/images/bouquets/IMG_3937.png",
    tag: "Rare",
    description: "Rare sapphire blue delphiniums tower above a base of white roses and pale blue statice. Truly a sight to behold for the most discerning recipient.",
    inclusions: ["Sapphire Blue Delphinium Spires", "White Premium Roses", "Pale Blue Statice", "Silver Reflective Wrap", "Artisan Card"],
    reviews: [
      { author: "Rohit S.", text: "The blue was so vivid, it barely looks real. Incredible quality.", rating: 5 }
    ]
  },
  "bq-15": {
    id: "bq-15",
    name: "Majestic Imperial Lily",
    price: 5999,
    strike_price: 7299,
    image: "/images/bouquets/IMG_3941.png",
    tag: "Signature",
    description: "A majestic arrangement of 49 imperial lilies set in a premium golden vase, exuding luxury and reverence. The ultimate floral gift.",
    inclusions: ["49 Imperial Lillies", "Premium Ceramic Golden Vase", "Decorative Moss Base", "Complimentary Ostrich Feather Adornment", "Heritage Gift Box"],
    reviews: [
      { author: "Deepak J.", text: "It was literally the size of a small tree. Pure luxury!", rating: 5 }
    ]
  },
  "hm-1": {
    id: "hm-1",
    name: "Royal Celebration Hamper",
    price: 7499,
    strike_price: 8999,
    image: "/images/themed-hampers/IMG_3723.jpg",
    tag: "Premium",
    description: "A royal celebration hamper overflowing with the finest hand-picked treats. Includes premium nuts, artisanal chocolates, and a bespoke metallic keepsake chest.",
    inclusions: ["Hand-Carved Metallic Keepsake Chest", "Premium Roasted Mixed Nuts (400g)", "Artisanal Gold-Leaf Chocolate Bar", "Bespoke Scented Ceramic Diffuser", "Royal Velvet Pouch with Dry Fruits"],
    reviews: [
      { author: "Naina R.", text: "The chest was so grand she kept it for her jewellery afterward!", rating: 5 }
    ]
  },
  "hm-2": {
    id: "hm-2",
    name: "Gilded Indulgence Box",
    price: 6999,
    strike_price: 8499,
    image: "/images/themed-hampers/IMG_3899.jpg",
    tag: "Signature",
    description: "A gilded box of pure indulgence, featuring gold leaf macarons, champagne truffles, velvet pouches of saffron, and a luxury scented candle.",
    inclusions: ["Gold-Leaf Macaron Box (8 pcs)", "Champagne Truffle Selection (12 pcs)", "Silk Saffron Pouch (15g)", "Luxury Scented Soy Candle 30cl", "Gilded Serving Spoon"],
    reviews: [
      { author: "Kunal P.", text: "Candle smelled amazing, and the gold-leaf chocolates were a hit!", rating: 5 }
    ]
  },
  "hm-4": {
    id: "hm-4",
    name: "Midnight Bliss Hamper",
    price: 8200,
    strike_price: 9999,
    image: "/images/themed-hampers/IMG_3912.jpg",
    tag: "Signature",
    description: "A midnight-themed hamper of dark wonders. Includes midnight jasmine tea, espresso beans, truffle chocolates, and an obsidian glass candle.",
    inclusions: ["Midnight Jasmine Tea Sampler", "Single-Estate Espresso Beans (250g)", "Dark Truffle Chocolate Box (6pc)", "Obsidian Glass Scented Candle", "Charcoal Biscuits (100g)"],
    reviews: [
      { author: "Deepak M.", text: "Dark, indulgent, and perfect for night owls. Loved the coffee!", rating: 5 }
    ]
  },
  "hm-5": {
    id: "hm-5",
    name: "Golden Glow Festive Basket",
    price: 4999,
    strike_price: 5999,
    image: "/images/themed-hampers/IMG_3914.jpg",
    tag: "Festive",
    description: "A festive golden glow hamper packed with premium treats, artisanal cookies, dry fruits, and a festive gold-wrapped chocolate collection.",
    inclusions: ["Festive Gold-Wrapped Chocolate Box", "Premium Artisanal Cookie Assortment", "Royal Dry Fruit Selection (300g)", "Brass Peacock Diya", "Festive Greeting Scroll"],
    reviews: [
      { author: "Aarti D.", text: "The brass diya was beautiful! A perfect festive gift.", rating: 5 }
    ]
  },
  "hm-7": {
    id: "hm-7",
    name: "Opulent Harvest Tray",
    price: 3899,
    strike_price: 4699,
    image: "/images/themed-hampers/IMG_3916.jpg",
    tag: "Organic",
    description: "A wholesome organic harvest tray featuring raw honey, farm-fresh nuts, cold-pressed oils, freshly baked sourdough, and organic preserves.",
    inclusions: ["Organic Raw Honey (500g)", "Farm-Fresh Almonds & Walnuts (400g)", "Cold-Pressed Olive Oil (250ml)", "Freshly Baked Sourdough Loaf", "Seasonal Fruit Preserve (250g)"],
    reviews: [
      { author: "Vikram B.", text: "The honey was thick and pure. Super thoughtful gift.", rating: 5 }
    ]
  },
  "hm-8": {
    id: "hm-8",
    name: "Champagne & Roses Box",
    price: 9500,
    strike_price: 11499,
    image: "/images/themed-hampers/IMG_3917.jpg",
    tag: "Ultimate",
    description: "The ultimate indulgence — a champagne and roses box pairing a premium sparkling wine with artisanal treats, a live orchid, and silk roses.",
    inclusions: ["Premium Sparkling Wine (Standard Bottle)", "Live Mini Orchid Plant", "Artisan Silk Rose Arrangement", "Gourmet Treat Selection (200g)", "Champagne Flute (Pair)"],
    reviews: [
      { author: "Sonia K.", text: "The champagne and orchid combo was such a show stopper!", rating: 5 }
    ]
  },
  "hm-9": {
    id: "hm-9",
    name: "Sweet Serenade Basket",
    price: 4500,
    strike_price: 5499,
    image: "/images/themed-hampers/IMG_3918.png",
    tag: "Sweet",
    description: "A sweet serenade basket of macarons, honey, gourmet candy and a luxury silk sleep mask. A melody of comfort and sweetness.",
    inclusions: ["Artisan Macaron Box (6pc)", "Creamed Honey (200g)", "Luxury Halva (150g)", "Silk Embroidered Sleep Eye Mask", "Personalised Wish Card"],
    reviews: [
      { author: "Noor F.", text: "The halva and macarons were divine. I am officially obsessed.", rating: 5 }
    ]
  },
  "hm-10": {
    id: "hm-10",
    name: "Blossom & Bites Platter",
    price: 5100,
    strike_price: 6199,
    image: "/images/themed-hampers/IMG_3920.png",
    tag: "Curated",
    description: "A curated platter pairing fresh seasonal florals with gourmet treats — dried fruits, artisan crackers, and truffle cheese. Best of both worlds.",
    inclusions: ["Seasonal Fresh Flower Bouquet", "Premium Dried Fruit Platter (250g)", "Artisan Cracker Selection", "Truffle Cheese Wedge (100g)", "Decorative Serving Wood Board"],
    reviews: [
      { author: "Ishan T.", text: "Got this for my mom. The flowers plus treats idea is genius.", rating: 5 }
    ]
  },
  "hm-11": {
    id: "hm-11",
    name: "Gourmet Symphony Trunk",
    price: 7999,
    strike_price: 9699,
    image: "/images/themed-hampers/IMG_3921.png",
    tag: "Gourmet",
    description: "A gourmets delight trunk featuring aged balsamic vinegar, truffle oil, heirloom pasta, and a curated recipe book within an engraved box.",
    inclusions: ["Aged Balsamic Vinegar (100ml)", "Black Truffle Oil (100ml)", "Heirloom Organic Pasta (250g)", "Curated Recipe Book by Giftrapture", "Engraved Gourmet Trunk"],
    reviews: [
      { author: "Gaurav S.", text: "Finally, a hamper for people who actually cook! Loved the truffle oil.", rating: 5 }
    ]
  },
  "hm-12": {
    id: "hm-12",
    name: "Aura of Gold Hamper",
    price: 6750,
    strike_price: 8199,
    image: "/images/themed-hampers/IMG_3922.png",
    tag: "Limited",
    description: "A limited edition gold hamper with hand-numbered luxury items, 24k gold-infused honey, and a signed artisan certificate of authenticity.",
    inclusions: ["24K Gold-Infused Raw Honey (100g)", "Numbered Artisan Certificate", "Gold-Leaf Chocolate Collection", "Limited Edition Scented Candle", "Premium Brass Key (Keepsake)"],
    reviews: [
      { author: "Rhea P.", text: "It felt like unboxing a limited-edition treasure. So special.", rating: 5 }
    ]
  },
  "hm-13": {
    id: "hm-13",
    name: "Pink Petal Perfection Box",
    price: 4200,
    strike_price: 4999,
    image: "/images/themed-hampers/IMG_3923.png",
    tag: "Romantic",
    description: "A romantic pink petal perfection box, overflowing with rose-scented candles, petals, a silk scarf, and a personalised photo frame.",
    inclusions: ["Rose Scented Soy Candle", "Rose Petal Potpourri Sachet", "Silk Chiffon Scarf", "Personalised Polaroid Photo Frame", "Hand-Sealed Love Note"],
    reviews: [
      { author: "Anita R.", text: "The scarf was such a lovely touch. Very romantic and thoughtful.", rating: 5 }
    ]
  },
  "hm-14": {
    id: "hm-14",
    name: "Artisan Casket",
    price: 8900,
    strike_price: 10799,
    image: "/images/themed-hampers/IMG_3929.png",
    tag: "Custom",
    description: "A bespoke artisan casket offering fully customisable contents. Engrave your initials and fill it with your choice of five select items.",
    inclusions: ["Bespoke Engraved Wooden Casket", "Five Custom Fillers of Choice", "Velvet Interior Lining", "Personalised Metal Nameplate", "Care & Storage Instruction"],
    reviews: [
      { author: "Varun M.", text: "Got our initials engraved. My wife said it was the best gift ever.", rating: 5 }
    ]
  },
  "hm-15": {
    id: "hm-15",
    name: "Ethereal Treats Tray",
    price: 3600,
    strike_price: 4299,
    image: "/images/themed-hampers/IMG_3938.jpg",
    tag: "Delight",
    description: "A delicate tray of ethereal treats including meringues, sugar-free artisanal delights, lavender cookies, and a hand-blown glass jar of fairy dust sugar.",
    inclusions: ["Handcrafted Meringue Selection (8pcs)", "Sugar-Free Artisanal Cookie Tin", "Lavender Infused Shortbread", "Hand-Blown Glass Sugar Jar", "Cotton Gift Bag"],
    reviews: [
      { author: "Pooja T.", text: "So lightly sweet and beautifully presented. Perfect for my diabetic friend.", rating: 5 }
    ]
  },
  "hm-16": {
    id: "hm-16",
    name: "Deluxe Wellness Hamper",
    price: 5800,
    strike_price: 6999,
    image: "/images/themed-hampers/IMG_3940.jpg",
    tag: "Wellness",
    description: "A deluxe wellness hamper promoting holistic well-being with herbal teas, ceramide candles, an incense set, and an eye pillow.",
    inclusions: ["Herbal Wellness Tea Assortment (12 sachets)", "Ceramic Aromatherapy Candle", "Brass Incense Holder & Cones", "Silk Eye Pillow with Lavender Fill", "Self-Care Affirmation Cards"],
    reviews: [
      { author: "Fatima L.", text: "The incense and silk eye pillow combo is pure self-care magic.", rating: 5 }
    ]
  },
  "eh-1": {
    id: "eh-1",
    name: "Al-Noor Premium Eid Box",
    price: 6499,
    strike_price: 7799,
    image: "/images/eid-hampers/IMG_3848.png",
    tag: "Premium",
    description: "An opulent Eid box curated with Turkish delight, dates, gold-wrapped chocolates, and a beautifully embroidered prayer cap.",
    inclusions: ["Premium Dates (Assorted Varieties 500g)", "Turkish Delight Box (250g)", "Embroidered Prayer Cap", "Gold Foil Chocolate Collection", "Eid Mubarak Greeting Scroll"],
    reviews: [
      { author: "Huda K.", text: "The Turkish delight was fresh and the prayer cap was stunning.", rating: 5 }
    ]
  },
  "eh-2": {
    id: "eh-2",
    name: "Hilal Delights Basket",
    price: 5200,
    strike_price: 6299,
    image: "/images/eid-hampers/IMG_3942.png",
    tag: "Festive",
    description: "A festive crescent-shaped basket brimming with date varieties, nut platters, and a limited edition Eid keepsake.",
    inclusions: ["Medjool & Khudri Date Selection", "Artisan Nut Platter (400g)", "Eid Crescent Shaped Wicker Basket", "Brass Dates Serving Plate", "Hand-Painted Wooden Coaster Set"],
    reviews: [
      { author: "Zara M.", text: "Such a thoughtful Eid gift! The date assortment was beautiful.", rating: 5 }
    ]
  },
  "eh-3": {
    id: "eh-3",
    name: "Royal Mubarak Trunk",
    price: 8500,
    strike_price: 10299,
    image: "/images/eid-hampers/IMG_3943.png",
    tag: "Signature",
    description: "A majestic trunk fit for royalty, packed with the finest hibiscus tea, saffron, Moroccan dates, and an engraved lantern.",
    inclusions: ["Moroccan Hibiscus Tea Leaves (50g)", "Iranian Saffron Threads (5g)", "Medjool Dates (300g)", "Engraved Moroccan Lantern", "Heritage Velvet Pouch"],
    reviews: [
      { author: "Amir H.", text: "The lantern alone is worth it. Fan of the saffron too.", rating: 5 }
    ]
  },
  "eh-4": {
    id: "eh-4",
    name: "Sacred Bloom Platter",
    price: 4800,
    strike_price: 5799,
    image: "/images/eid-hampers/IMG_3944.png",
    tag: "Elegant",
    description: "An elegant platter of natural beauty with fresh rose petals, attar, a pearl tasbih, and a hand-painted Eid card.",
    inclusions: ["Fresh Red Rose Petals (50g)", "Premium Attar (10ml)", "Pearl Tasbih (99 beads)", "Hand-painted Eid Greeting Card", "Silk Drawstring Pouch"],
    reviews: [
      { author: "Sarah I.", text: "The tasbih was delicate and the petals smelled divine. Perfectly curated.", rating: 5 }
    ]
  },
  "eh-5": {
    id: "eh-5",
    name: "Barakah Abundance Hamper",
    price: 7299,
    strike_price: 8799,
    image: "/images/eid-hampers/IMG_3945.png",
    tag: "Bestseller",
    description: "This Eid best seller offers abundance in beauty and taste — dates, nuts, chocolate, and an ornate serving tray.",
    inclusions: ["Woven Abundant Date & Nut Tower", "Artisanal Chocolate Box (12pc)", "Ornate Bone Inlay Serving Tray", "Spiced Tea Sampler", "Eid Premium Gift Tag"],
    reviews: [
      { author: "Imran S.", text: "The serving tray was a piece of art.", rating: 5 }
    ]
  },
  "eh-6": {
    id: "eh-6",
    name: "Zamarud Gold Artisan Tray",
    price: 3999,
    strike_price: 4799,
    image: "/images/eid-hampers/IMG_3946.png",
    tag: "Handcrafted",
    description: "A handcrafted zafran and gold artisan tray featuring saffron threads, gold-dusted dates, and marbled halwa.",
    inclusions: ["Saffron Threads (Iranian 3g)", "Gold-Dusted Dates (200g)", "Marbled Halwa (300g)", "Gold Artisan Serving Tray", "Heritage Recipe Card"],
    reviews: [
      { author: "Sana R.", text: "Halwa and gold-dusted dates were the highlight of our Eid table!", rating: 5 }
    ]
  }
};

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  images?: string[];
  relations?: string[];
  tag: string;
  description: string;
  inclusions: string[];
  reviews: { author: string; text: string; rating: number }[];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const poolProduct = useMemo(() => PRODUCTS_POOL[id], [id]);
  const [product, setProduct] = useState<ProductDetail | null>(poolProduct || null);
  const [loading, setLoading] = useState(!poolProduct);
  const [fetchError, setFetchError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (poolProduct) {
      setProduct(poolProduct);
      setLoading(false);
    }

    async function fetchDbProduct() {
      setLoading(!poolProduct);
      try {
        const { supabase } = await import("@/lib/supabaseClient");

        // 1. Try lookup by slug first (how DB products are linked)
        let { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", id)
          .maybeSingle();

        // 2. Fall back to UUID lookup if slug didn't match
        if (!data && !error) {
          const result = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .maybeSingle();
          data = result.data;
          error = result.error;
        }

        if (error) {
          console.error("Error fetching product from Supabase:", error);
          if (!poolProduct) {
            setFetchError(true);
          }
        } else if (!data) {
          // Product not found in Supabase — notFound() will serve the 404 page
          if (!poolProduct) {
            setFetchError(true);
          }
        } else {
          // Parse images - Supabase JSONB returns parsed arrays, but fallback to string parse
          let parsedImages: string[] = [];
          if (Array.isArray(data.images) && data.images.length > 0) {
            parsedImages = data.images as string[];
          } else if (typeof data.images === "string") {
            try { parsedImages = JSON.parse(data.images); } catch {}
          }
          // Always ensure the main image is included
          if (parsedImages.length === 0 && data.image) {
            parsedImages = [data.image];
          } else if (data.image && !parsedImages.includes(data.image)) {
            parsedImages = [data.image, ...parsedImages];
          }

          // Parse relations similarly
          let parsedRelations: string[] = [];
          if (Array.isArray(data.relations) && data.relations.length > 0) {
            parsedRelations = data.relations as string[];
          } else if (typeof data.relations === "string") {
            try { parsedRelations = JSON.parse(data.relations); } catch {}
          }
          if (parsedRelations.length === 0) {
            parsedRelations = [data.relation || "For Couples"];
          }

          // Fallbacks for luxury metadata if not fully specified in simple database rows
          const dbProduct = {
            id: data.id,
            name: data.name,
            price: Number(data.price),
            strike_price: data.strike_price ? Number(data.strike_price) : undefined,
            image: data.image,
            images: parsedImages,
            relations: parsedRelations,
            tag: data.tag || "Premium",
            description: data.description || "An exquisite selection curated by GIFTRAPTURE to bring elegance, luxury, and curated joy to your special gifting moments.",
            inclusions: Array.isArray(data.inclusions)
              ? data.inclusions
              : (typeof data.inclusions === "string" ? JSON.parse(data.inclusions) : ["Premium gift wrapping", "Signature Giftrapture satin ribbon", "Handwritten luxury note card"]),
            reviews: Array.isArray(data.reviews)
              ? data.reviews
              : [
                  { author: "Verified Patron", text: "Stunning presentation, top-notch quality, and incredibly fast delivery. Will order again!", rating: 5 }
                ]
          };
          setProduct(dbProduct);
          setFetchError(false);
        }
      } catch (err) {
        console.error("Failed to load product from DB:", err);
        if (!poolProduct) {
          setFetchError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDbProduct();
  }, [id, poolProduct]);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <Navbar />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-soft-gray font-serif italic text-lg">Curating your selection...</p>
        </div>
        <MobileBottomNav />
      </main>
    );
  }

  if (fetchError && !product) {
    notFound();
  }

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />

      <div className="pt-32 px-6 max-w-7xl mx-auto py-24">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-soft-gray hover:text-text-main transition-colors mb-12 group font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6">
         <div className="relative">
              <ImageGallery
                images={product.images && product.images.length > 0 ? product.images : [product.image || "/images/placeholder.jpg"]}
                alt={product.name}
                className="w-full"
              />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="lg:col-span-6 space-y-8">
             <div>
                <h1 className="text-4xl md:text-5xl font-serif text-text-main mb-4 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  {product.strike_price && product.strike_price > product.price && (
                    <>
                      <span className="text-xl font-sans text-soft-gray line-through decoration-red-400">
                        ₹{product.strike_price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full">
                        {Math.round(((product.strike_price - product.price) / product.strike_price) * 100)}% OFF
                      </span>
                    </>
                  )}
                  <p className="text-3xl font-serif text-accent-gold font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
             </div>

            <p className="text-soft-gray leading-relaxed text-sm md:text-base font-sans font-light">
              {product.description}
            </p>

             {/* What's Included? */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-text-main/5 shadow-sm">
                <h3 className="font-serif italic text-lg font-bold text-text-main">What&apos;s Included?</h3>
               <p className="text-xs md:text-sm text-soft-gray font-sans font-medium">
                 {product.inclusions.join(", ")}.
               </p>
             </div>

            {/* Cart & Quick Checkout Triggers */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-5 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main hover:scale-[1.02] flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              {successMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl text-center font-bold animate-pulse-slow">
                  ✓ Successfully added to your bag!
                </div>
              )}
            </div>



             {/* Trust Accoutrements */}
             <div className="grid grid-cols-2 gap-4 pt-6 border-t border-text-main/10 text-center font-sans text-[10px] uppercase tracking-wider font-bold text-soft-gray">
               <div className="flex flex-col items-center gap-2">
                 <Truck className="w-5 h-5 text-accent-sage" />
                 <span>Express Courier</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-accent-sage" />
                 <span>Secure Checkout</span>
               </div>
             </div>
          </div>
        </div>

         {/* Reviews Section */}
         <ProductReviews productId={product.id} />
      </div>

      <MobileBottomNav />
    </main>
  );
}
