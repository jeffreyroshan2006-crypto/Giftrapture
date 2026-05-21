"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Crown, AlertCircle } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const normalizedIdentifier = identifier.trim();
      const isEmail = normalizedIdentifier.includes("@");
      let signInResult: {
        data: Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>["data"];
        error: Awaited<ReturnType<typeof supabase.auth.signInWithPassword>>["error"];
      } | null = null;

      if (isEmail) {
        signInResult = await supabase.auth.signInWithPassword({
          email: normalizedIdentifier,
          password,
        });
      } else {
        const phoneWithPlus = normalizedIdentifier.replace(/[^\d+]/g, "");
        const phoneDigits = normalizedIdentifier.replace(/\D/g, "");
        signInResult = await supabase.auth.signInWithPassword({
          phone: phoneWithPlus,
          password,
        });

        if (signInResult?.error && phoneDigits && phoneDigits !== phoneWithPlus) {
          signInResult = await supabase.auth.signInWithPassword({
            phone: phoneDigits,
            password,
          });
        }
      }

      if (!signInResult) {
        setError("Unable to start authentication. Please try again.");
        return;
      }

      const { data, error: signInError } = signInResult;

      if (signInError || !data?.user) {
        setError(signInError?.message || "Invalid credentials. Please try again.");
        return;
      }

      // Verify admin role
      const isAdmin = data.user.user_metadata?.role === "admin";
      if (!isAdmin) {
        setError("Access denied. Administrator privileges required.");
        await supabase.auth.signOut();
        return;
      }

      // Set admin cookie for middleware and redirect
      document.cookie = "isAdmin=true; path=/; max-age=86400; SameSite=Lax";
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-accent-gold/10 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-primary/30 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-premium border border-white/50 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 bg-primary/30 rounded-full flex items-center justify-center border border-accent-gold/20">
              <Crown className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-3xl font-serif text-text-main mb-2 leading-tight">
              <span className="italic">Admin</span> Portal
            </h1>
            <p className="text-soft-gray text-sm font-sans font-light">
              Secure access for Gift Rapture curators
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest ml-1">
                Email or Phone
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray/70" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin@giftrapture.com or +91 72006 23758"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-text-main/10 bg-secondary/50 text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all placeholder:text-soft-gray/40"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray/70" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-text-main/10 bg-secondary/50 text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all placeholder:text-soft-gray/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-soft-gray/70 hover:text-text-main transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                "Secure Access"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-text-main/5 text-center">
            <p className="text-xs text-soft-gray font-light">
              Gift Rapture Administration Portal
            </p>
            <p className="text-[10px] text-soft-gray/50 mt-1">
              Protected by Supabase Auth &middot; Encrypted Connection
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
