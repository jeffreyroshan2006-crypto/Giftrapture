"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Star } from "lucide-react";

interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_approved: boolean;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error'; text: string} | null>(null);

  // Fetch approved reviews
  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data, error } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    }
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Submitting review", { productId, rating: formData.rating, ratingType: typeof formData.rating, formData });
    const { data: inserted, error } = await supabase
      .from("product_reviews")
      .insert({
        product_id: productId,
        author_name: formData.name,
        rating: Number.parseInt(String(formData.rating), 10),
        review_text: formData.text,
        is_approved: true,
      })
      .select();
    setSubmitting(false);
    if (error) {
      setMessage({ type: "error", text: "Failed to submit. Please try again." });
    } else {
      setMessage({ type: "success", text: "Thank you! Your review has been submitted." });
      setFormData({ name: "", rating: 5, text: "" });
      setShowForm(false);
      // Refresh reviews
      if (inserted && inserted.length > 0) {
        // Normalize rating in returned row(s) then prepend to reviews
        const rows = inserted.map((r: any) => ({ ...r, rating: Number.parseInt(String(r.rating || 0), 10) }));
        setReviews((prev) => [...rows, ...prev]);
      } else {
        const { data } = await supabase.from("product_reviews").select("*").eq("product_id", productId).eq("is_approved", true).order("created_at", { ascending: false });
        if (data) setReviews(data.map((r: any) => ({ ...r, rating: Number.parseInt(String(r.rating || 0), 10) })));
      }
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + Number((r as any).rating || 0), 0) / reviews.length
    : 0;

  return (
    <div className="mt-24 pt-16 border-t border-text-main/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 italic text-center">Words of Appreciation</h2>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="text-5xl font-serif text-accent-gold">{averageRating.toFixed(1)}</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'fill-accent-gold text-accent-gold' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-xs text-soft-gray uppercase tracking-wide">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-soft-gray">No reviews yet. Be the first to share your experience!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-text-main/5">
                <div className="flex items-center gap-1 mb-4">
                  {(() => {
                    const ratingValue = Math.min(5, Math.max(0, Math.round(Number((review as any).rating || 0))));
                    return [...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < ratingValue ? 'fill-accent-gold text-accent-gold' : 'text-gray-300'}`} />
                    ));
                  })()}
                </div>
                <p className="text-soft-gray italic mb-6 text-sm">&ldquo;{review.review_text}&rdquo;</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xs text-text-main">— {review.author_name}</p>
                  <span className="text-xs text-soft-gray">
                    {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write a Review */}
        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 group px-8 py-4 bg-accent-gold text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-text-main/5">
            <h3 className="font-serif text-xl font-bold mb-6">Share Your Thoughts</h3>
            {message && (
              <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-600'}`}>
                {message.text}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-secondary/30 focus:outline-none focus:border-accent-gold"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: r }))}
                      className={`p-2 rounded-full transition-colors ${formData.rating === r ? 'bg-accent-gold text-white' : 'bg-secondary text-soft-gray hover:bg-accent-gold/20'}`}
                    >
                      <Star className={`w-6 h-6 ${r <= formData.rating ? 'fill-white' : 'fill-current'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-secondary/30 focus:outline-none focus:border-accent-gold resize-none"
                  placeholder="What did you love about this product?"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-text-main text-white font-bold rounded-full hover:bg-accent-gold hover:text-text-main transition-all disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 border border-text-main/20 text-text-main font-bold rounded-full hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
