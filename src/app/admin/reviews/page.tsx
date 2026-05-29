"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";
import { Trash2, Star, MessageSquare, Loader2, Crown, LogOut, ArrowLeft } from "lucide-react";

type ReviewType = "product" | "testimonial";

interface ProductReview {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_approved: boolean;
}

interface Testimonial {
  id: string;
  text: string;
  author: string;
  created_at: string;
  is_approved: boolean;
}

export default function AdminReviewsPage() {
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ReviewType>("product");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{type: 'success'|'error'; text: string} | null>(null);
  const router = useRouter();

  const fetchAllReviews = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    // Fetch product reviews
    const { data: productData, error: productError } = await supabase
      .from("product_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch testimonials
    const { data: testimonialData, error: testimonialError } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!productError && productData) setProductReviews(productData);
    if (!testimonialError && testimonialData) setTestimonials(testimonialData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  const handleDelete = async (type: ReviewType, id: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) return;
    setDeletingId(id);
    setMessage(null);
    const supabase = getSupabaseClient();
    const table = type === "product" ? "product_reviews" : "testimonials";
    const { error } = await supabase.from(table).delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      console.error("Delete error:", error);
      setMessage({ type: "error", text: `Failed to delete: ${error.message}` });
    } else {
      setMessage({ type: "success", text: "Review deleted successfully." });
      // Refresh lists
      await fetchAllReviews();
    }
  };

  const currentReviews = activeTab === "product" ? productReviews : testimonials;

  return (
    <main className="min-h-screen bg-secondary">
      {/* Admin Top Bar */}
      <nav className="bg-white border-b border-text-main/5 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="p-2 hover:bg-primary/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text-main" />
            </button>
            <div>
              <h1 className="text-lg font-serif text-text-main font-bold leading-tight">Review Moderation</h1>
              <p className="text-[10px] text-soft-gray uppercase tracking-widest">Manage Customer Feedback</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await getSupabaseClient().auth.signOut();
              router.push("/admin/login");
            }}
            className="p-2.5 hover:bg-red-50 rounded-xl transition-colors group"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-text-main/60 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-text-main/10 pb-4">
          <button
            onClick={() => setActiveTab("product")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === "product"
                ? "bg-accent-gold text-white shadow-lg"
                : "bg-white text-text-main hover:bg-secondary"
            }`}
          >
            <Star className="w-4 h-4" />
            Product Reviews ({productReviews.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonial")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === "testimonial"
                ? "bg-accent-gold text-white shadow-lg"
                : "bg-white text-text-main hover:bg-secondary"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Testimonials ({testimonials.length})
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-600'}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
          </div>
        ) : (
          <div className="space-y-4">
            {currentReviews.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[2rem] border border-text-main/5">
                <p className="text-soft-gray text-lg">No {activeTab === "product" ? "product reviews" : "testimonials"} yet.</p>
              </div>
            ) : (
              currentReviews.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-text-main/5 flex items-start justify-between gap-6">
                  <div className="flex-1">
                    {activeTab === "product" ? (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-text-main">{(item as ProductReview).author_name}</span>
                          <span className="text-soft-gray">•</span>
                          <span className="text-xs text-soft-gray">Product: {(item as ProductReview).product_id}</span>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(star => (
                              <Star key={star} className={`w-4 h-4 ${star <= (item as ProductReview).rating ? 'fill-accent-gold text-accent-gold' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-soft-gray italic mb-4">&ldquo;{(item as ProductReview).review_text}&rdquo;</p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-text-main">{(item as Testimonial).author}</span>
                          <span className="text-soft-gray">•</span>
                          <span className="text-xs text-soft-gray">Global Testimonial</span>
                        </div>
                        <p className="text-soft-gray italic mb-4">&ldquo;{(item as Testimonial).text}&rdquo;</p>
                      </>
                    )}
                    <p className="text-xs text-soft-gray">
                      {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(activeTab, item.id)}
                    disabled={deletingId === item.id}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                    title="Delete review"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
