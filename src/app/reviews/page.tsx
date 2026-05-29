"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SubmitReviewPage() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!text.trim() || !author.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      text: text.trim(),
      author: author.trim(),
      is_approved: true, // auto-approve for now; can change to false for moderation
    });

    setIsSubmitting(false);
    if (error) {
      setError("Failed to submit. Please try again.");
      console.error(error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-3xl shadow-lg max-w-lg w-full text-center">
          <h2 className="text-3xl font-serif mb-4 italic text-text-main">Thank You!</h2>
          <p className="text-soft-gray mb-8">
            Your review has been submitted successfully. We appreciate your honest feedback.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 group px-8 py-3 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-soft-gray hover:text-text-main mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg">
          <div className="text-center mb-10">
            <span className="text-accent-gold text-[10px] tracking-[0.3em] font-sans uppercase font-bold mb-4 block">
              Testimonials
            </span>
            <h1 className="text-4xl font-serif italic text-text-main">Share Your Experience</h1>
            <p className="text-soft-gray mt-4 max-w-md mx-auto">
              Your honest review helps others discover the joy of gifting with Giftrapture.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="author" className="block text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2">
                Your Name
              </label>
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="text" className="block text-xs uppercase tracking-widest font-bold text-text-main/60 mb-2">
                Your Review
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows={5}
                className="w-full px-5 py-4 rounded-2xl border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold transition-all resize-none"
                placeholder="Tell us about your experience with Giftrapture..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 px-6 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}