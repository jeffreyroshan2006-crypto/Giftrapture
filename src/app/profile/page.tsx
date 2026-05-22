import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import { User, LogIn, Mail } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Navbar />
      <div className="pt-32 px-6 flex flex-col items-center justify-center max-w-lg mx-auto py-24 text-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-10 animate-pulse shadow-xl border border-white/20">
           <User className="w-10 h-10 text-accent-gold" />
        </div>
        <h1 className="text-4xl font-serif mb-6 italic italic">Welcome to Gift Rapture</h1>
        <p className="text-sm text-soft-gray mb-12 italic">Login or create an account to manage your gifting selections and view previous orders.</p>
        
        <div className="w-full space-y-4">
           <button className="w-full flex items-center justify-center gap-2 group px-8 py-5 bg-text-main text-white font-bold rounded-full transition-all duration-300 hover:shadow-2xl">
              <LogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Sign In with Phone
           </button>
           <button className="w-full flex items-center justify-center gap-2 group px-8 py-5 bg-white border border-text-main/10 text-text-main font-bold rounded-full transition-all duration-300 hover:shadow-xl">
              <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
              Email Login
           </button>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
