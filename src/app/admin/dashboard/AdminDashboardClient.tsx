"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  Package,
  Flower2,
  Gift,
  Star,
  ImageIcon,
  Loader2,
  AlertCircle,
  Check,
  Crown,
  Tag,
  Filter,
} from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";
import MultiImageUpload from "@/components/MultiImageUpload";
import MultiSelect from "@/components/MultiSelect";

// Types based on DB schema
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  strike_price?: number;
  image: string;
  images: string[];
  tag: string;
  category: "bouquets" | "hampers" | "eid-hampers";
  relation: string;
  relations: string[];
  description: string;
  inclusions: string[];
  created_at: string;
  bestseller?: boolean;
}

const CATEGORIES = [
  { value: "bouquets", label: "Signature Bouquets", icon: Flower2 },
  { value: "hampers", label: "Themed Hampers", icon: Gift },
  { value: "eid-hampers", label: "Eid Hampers", icon: Package },
] as const;

const ALL_RELATIONS = [
  "For Her",
  "For Him",
  "For Parents",
  "For Siblings",
  "For Colleagues",
  "For Couples",
] as const;

const CATEGORY_META: Record<
  string,
  {
    label: string;
    badge: string;
  }
> = {
  bouquets: {
    label: "Signature Bouquets",
    badge: "bg-pink-50 text-pink-700 border-pink-100",
  },
  hampers: {
    label: "Themed Hampers",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
  },
  "eid-hampers": {
    label: "Eid Hampers",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
};

const FALLBACK_CATEGORY = {
  label: "Other",
  badge: "bg-slate-50 text-slate-600 border-slate-100",
};

function getCategoryMeta(category?: string) {
  return (category && CATEGORY_META[category]) || FALLBACK_CATEGORY;
}

// --- Statistics Card Component ---
function StatCard({
  title,
  value,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string | number;
  icon: any;
  accent: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft border border-text-main/5 hover:shadow-premium transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-3xl font-serif text-text-main mb-1">{value}</p>
      <p className="text-xs text-soft-gray font-medium uppercase tracking-widest">{title}</p>
    </div>
  );
}

// --- Product Form Modal ---
function ProductModal({
  product,
  onClose,
  onSave,
  loading,
}: {
  product?: Product;
  onClose: () => void;
  onSave: (data: any) => void;
  loading: boolean;
}) {
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [strikePrice, setStrikePrice] = useState(product?.strike_price?.toString() || "");
  const [tag, setTag] = useState(product?.tag || "");
  const [category, setCategory] = useState<typeof CATEGORIES[number]["value"]>(
    product?.category || "bouquets"
  );
  const [description, setDescription] = useState(product?.description || "");
  const [inclusions, setInclusions] = useState<string[]>(
    product?.inclusions?.length ? product.inclusions : [""]
  );

  const handleInclusionChange = (index: number, value: string) => {
    const newInclusions = [...inclusions];
    newInclusions[index] = value;
    setInclusions(newInclusions);
  };

  const addInclusion = () => setInclusions([...inclusions, ""]);
  const removeInclusion = (index: number) => {
    const newInclusions = inclusions.filter((_, i) => i !== index);
    setInclusions(newInclusions.length ? newInclusions : [""]);
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const [images, setImages] = useState<string[]>(product?.images ? [product.image, ...product.images.filter((img: string) => img !== product.image)] : []);
  const [relations, setRelations] = useState<string[]>(product?.relations || [product?.relation || "For Her"]);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!product?.slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSlug = product?.slug || slug || generateSlug(name);
    const mainImage = images[0] || "/images/placeholder.jpg";
    
    const strikePriceNum = strikePrice && strikePrice.trim() !== "" ? parseInt(strikePrice) : undefined;
    
    onSave({
      ...(product ? { id: product.id } : {}),
      name: name.trim(),
      slug: finalSlug,
      price: parseInt(price) || 0,
      strike_price: strikePriceNum,
      image: mainImage,
      images: images,
      tag: tag.trim(),
      category,
      relation: relations[0] || "For Couples", // Keep old field for backward compatibility
      relations: relations,
      description: description.trim(),
      inclusions: inclusions.filter((i) => i.trim() !== ""),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-secondary w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl border border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-secondary z-10 px-8 py-6 border-b border-text-main/5 flex items-center justify-between backdrop-blur-xl">
          <h2 className="text-2xl font-serif text-text-main">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <X className="w-5 h-5 text-text-main" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Product Name</label>
              <input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="e.g., Royal Azure Box"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all font-mono text-xs"
                placeholder="royal-azure-box"
              />
            </div>
          </div>

          {/* Price, Strike Price & Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Selling Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="4200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Strike Price (₹)</label>
              <input
                type="number"
                value={strikePrice}
                onChange={(e) => setStrikePrice(e.target.value)}
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="Original price (optional)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Tag</label>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="e.g., Bestseller, Premium, Signature"
              />
            </div>
          </div>

          {/* Category & Relation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as typeof CATEGORIES[number]["value"])}
                  className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all appearance-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray pointer-events-none" />
              </div>
            </div>
            <MultiSelect
              options={[...ALL_RELATIONS]}
              selected={relations}
              onChange={setRelations}
              label="Relations"
              placeholder="Select relations..."
            />
          </div>

          {/* Multi Image Upload */}
          <MultiImageUpload
            images={images}
            onChange={setImages}
            maxImages={8}
            singleImage={false}
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all resize-none"
              placeholder="Describe this signature product..."
            />
          </div>

          {/* Inclusions */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Inclusions</label>
            {inclusions.map((inclusion, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={inclusion}
                  onChange={(e) => handleInclusionChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                  placeholder={`Inclusion item ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeInclusion(index)}
                  className="w-10 h-10 flex-shrink-0 rounded-xl bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addInclusion}
              className="w-full py-3 border-2 border-dashed border-text-main/10 rounded-xl text-soft-gray text-sm font-medium hover:border-accent-gold/30 hover:text-accent-gold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Inclusion Item
            </button>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main text-sm uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  {product ? "Update Product" : "Add Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// --- Delete Confirmation ---
function DeleteConfirmModal({
  product,
  onConfirm,
  onCancel,
  loading,
}: {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-text-main/5 p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-2xl font-serif text-text-main mb-3">Remove Product?</h3>
        <p className="text-soft-gray text-sm mb-8 max-w-xs mx-auto">
          You are about to permanently delete <strong>{product.name}</strong>. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-text-main/10 rounded-xl text-text-main text-sm font-bold hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Remove
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Dashboard Page ---
export default function AdminDashboardClient() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const supabaseClient = getSupabaseClient();
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setProducts([]);
        return;
      }
      setProducts(data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Save product (create or update)
  const handleSaveProduct = async (data: any) => {
    setSaving(true);
    try {
      const supabaseClient = getSupabaseClient();
      
      // Dynamically inspect existing columns from the DB products table to prevent "Could not find column" errors
      let allowedFields: string[] = [];
      try {
        const { data: sampleData } = await supabaseClient.from("products").select("*").limit(1);
        if (sampleData && sampleData.length > 0) {
          allowedFields = Object.keys(sampleData[0]);
        }
      } catch (e) {
        console.error("Error inspecting database columns:", e);
      }

       // Filter payload data to only send columns that actually exist in the DB schema
       const payload: any = {};
       const coreFields = ["name", "slug", "price", "strike_price", "image", "images", "tag", "category", "relation", "relations", "description", "inclusions"];
       const fieldsToFilter = allowedFields.length > 0 ? allowedFields : coreFields;

      Object.keys(data).forEach((key) => {
        if (fieldsToFilter.includes(key)) {
          payload[key] = data[key];
        }
      });

      if (data.id) {
        // Update
        const { error } = await supabaseClient.from("products").update(payload).eq("id", data.id);
        if (error) {
          console.error("Error updating product:", error);
          throw new Error((error as any)?.message || "Failed to update product");
        }
      } else {
        // Create
        // If the database has an 'id' column but we didn't specify one, generate a unique ID
        if (!payload.id && (allowedFields.length === 0 || allowedFields.includes("id"))) {
          payload.id = crypto.randomUUID();
        }
        
        const { error } = await supabaseClient.from("products").insert([payload]);
        if (error) {
          console.error("Error creating product:", error);
          throw new Error((error as any)?.message || "Failed to create product");
        }
      }
      await fetchProducts();
      setModalOpen(false);
      setEditingProduct(undefined);
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;
    setSaving(true);
    try {
      const supabaseClient = getSupabaseClient();
      const { error } = await supabaseClient
        .from("products")
        .delete()
        .eq("id", deleteProduct.id);
      if (error) {
        console.error("Error deleting product:", error);
        throw new Error((error as any)?.message || "Failed to delete product");
      }
      setDeleteProduct(null);
      await fetchProducts();
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    const supabaseClient = getSupabaseClient();
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const productRelations = product.relations ? product.relations.join(" ") : (product.relation || "");
    const searchText = [
      product.name,
      product.slug,
      product.tag || "",
      productRelations,
      getCategoryMeta(product.category).label,
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = normalizedQuery === "" || searchText.includes(normalizedQuery);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalProducts = products.length;
  const bouquetCount = products.filter((p) => p.category === "bouquets").length;
  const hamperCount = products.filter((p) => p.category === "hampers").length;
  const eidCount = products.filter((p) => p.category === "eid-hampers").length;
  const bestsellerCount = products.filter(
    (p) => p.tag?.toLowerCase().includes("bestseller") || p.bestseller
  ).length;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-text-main/5 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center border border-accent-gold/20">
              <Crown className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h1 className="text-lg font-serif text-text-main font-bold leading-tight">Admin Portal</h1>
              <p className="text-[10px] text-soft-gray uppercase tracking-widest">GIFTRAPTURE Curator</p>
            </div>
          </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-xs text-soft-gray bg-secondary/50 px-3 py-1.5 rounded-full">
                Admin
              </span>
              <a
                href="/admin/orders"
                className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full border border-text-main/10 text-xs uppercase tracking-widest font-bold text-text-main/70 hover:text-text-main hover:border-accent-gold/40 transition-colors"
              >
                Orders
              </a>
              <button
                onClick={handleLogout}
                className="p-2.5 hover:bg-red-50 rounded-xl transition-colors group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-text-main/60 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
        </div>
      </nav>

      {/* --- Dashboard Content --- */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={Package}
            accent="bg-gradient-to-br from-accent-gold to-accent-gold/70"
          />
          <StatCard title="Bouquets" value={bouquetCount} icon={Flower2} accent="bg-gradient-to-br from-pink-200 to-pink-100/70" />
          <StatCard title="Hampers" value={hamperCount} icon={Gift} accent="bg-gradient-to-br from-amber-200 to-amber-100/70" />
          <StatCard title="Bestsellers" value={bestsellerCount} icon={Star} accent="bg-gradient-to-br from-yellow-200 to-yellow-100/70" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray/50" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
            />
          </div>

          {/* Category Filter & Add Button */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-9 pr-8 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all appearance-none cursor-pointer text-sm"
              >
                <option value="all">All Categories</option>
                <option value="bouquets">Bouquets</option>
                <option value="hampers">Hampers</option>
                <option value="eid-hampers">Eid Hampers</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray pointer-events-none" />
            </div>
            <button
              onClick={() => {
                setEditingProduct(undefined);
                setModalOpen(true);
              }}
              className="px-6 py-3 bg-text-main text-white rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:scale-[1.02] flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-[2rem] shadow-premium border border-text-main/5 overflow-hidden">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
              <p className="text-sm text-soft-gray animate-pulse">Loading collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Package className="w-12 h-12 text-soft-gray/20" />
              <p className="text-lg font-serif text-soft-gray">No products found</p>
              <p className="text-sm text-soft-gray/60">Add your first signature product to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                 <thead>
                   <tr className="border-b border-text-main/5">
                     <th className="text-left px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest">
                       Product
                     </th>
                     <th className="text-left px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest hidden md:table-cell">
                       Category
                     </th>
                     <th className="text-left px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest hidden sm:table-cell">
                       Price
                     </th>
                     <th className="text-left px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest hidden sm:table-cell">
                       Strike Price
                     </th>
                     <th className="text-left px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest hidden sm:table-cell">
                       Tag
                     </th>
                     <th className="text-right px-6 py-4 text-xs font-bold text-text-main/50 uppercase tracking-widest">
                       Actions
                     </th>
                   </tr>
                 </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const categoryMeta = getCategoryMeta(product.category);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-text-main/5 hover:bg-secondary/30 transition-colors"
                      >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 shrink-0 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-text-main text-sm">{product.name}</p>
                            <p className="text-xs text-soft-gray font-light">{product.slug}</p>
                             <div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
                               <span
                                 className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-widest ${categoryMeta.badge}`}
                               >
                                 {categoryMeta.label}
                               </span>
                             </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest ${categoryMeta.badge}`}
                        >
                          {categoryMeta.label}
                        </span>
                      </td>
                       <td className="px-6 py-4 hidden sm:table-cell">
                         <span className="text-sm font-bold text-accent-gold">
                           ₹{product.price.toLocaleString("en-IN")}
                         </span>
                       </td>
                       <td className="px-6 py-4 hidden sm:table-cell">
                         {product.strike_price && product.strike_price > product.price ? (
                            <span className="text-xs font-sans text-soft-gray line-through decoration-red-400">
                             ₹{product.strike_price.toLocaleString("en-IN")}
                           </span>
                         ) : (
                           <span className="text-xs text-soft-gray/50">—</span>
                         )}
                        </td>
                       <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setModalOpen(true);
                            }}
                            className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center hover:bg-accent-gold/20 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4 text-text-main" />
                          </button>
                          <button
                            onClick={() => setDeleteProduct(product)}
                            className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {modalOpen && (
          <ProductModal
            product={editingProduct}
            onClose={() => {
              setModalOpen(false);
              setEditingProduct(undefined);
            }}
            onSave={handleSaveProduct}
            loading={saving}
          />
        )}
        {deleteProduct && (
          <DeleteConfirmModal
            product={deleteProduct}
            onConfirm={handleDeleteProduct}
            onCancel={() => setDeleteProduct(null)}
            loading={saving}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
