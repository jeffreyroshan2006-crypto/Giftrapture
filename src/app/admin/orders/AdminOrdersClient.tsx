"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseBrowserClient";
import {
  AlertCircle,
  Loader2,
  LogOut,
  Package,
  RefreshCw,
  Search,
  ChevronRight,
  MapPin,
  CalendarDays,
  IndianRupee,
  Crown,
} from "lucide-react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderRecord {
  id: string;
  order_number: string;
  address: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
  created_at: string;
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabaseClient = getSupabaseClient();
      const { data, error: fetchError } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setOrders(((data as OrderRecord[]) || []).filter(Boolean));
    } catch (err: any) {
      console.error("Fetch orders error:", err);
      setError(err?.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) => {
      const haystack = [
        order.order_number || "",
        order.address || "",
        order.status || "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, searchQuery]);

  const handleLogout = async () => {
    const supabaseClient = getSupabaseClient();
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
  };

  const toggleOrder = (id: string) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-text-main/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/30 rounded-full flex items-center justify-center border border-accent-gold/20">
              <Crown className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h1 className="text-lg font-serif text-text-main font-bold leading-tight">
                Orders
              </h1>
              <p className="text-[10px] text-soft-gray uppercase tracking-widest">
                GIFTRAPTURE Order Pipeline
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-text-main/10 hover:bg-secondary/50 transition-colors text-xs font-bold uppercase tracking-widest text-text-main/70"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-text-main/10 hover:bg-secondary/50 transition-colors text-xs font-bold uppercase tracking-widest text-text-main/70"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 hover:bg-red-50 rounded-xl transition-colors group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-text-main/60 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-text-main/5 p-4 md:p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray/60" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order, address, or status"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[2rem] shadow-premium border border-text-main/5 overflow-hidden">
          {loading ? (
            <div className="h-80 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
              <p className="text-sm text-soft-gray animate-pulse">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="h-80 flex flex-col items-center justify-center gap-4 text-center px-6">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-sm text-soft-gray">{error}</p>
              <button
                onClick={fetchOrders}
                className="px-6 py-2 rounded-full bg-text-main text-white text-xs font-bold uppercase tracking-widest"
              >
                Retry
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center gap-4">
              <Package className="w-12 h-12 text-soft-gray/20" />
              <p className="text-lg font-serif text-soft-gray">No orders found</p>
              <p className="text-sm text-soft-gray/60">
                Orders captured from WhatsApp checkout will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-text-main/5">
              {filteredOrders.map((order) => (
                <div key={order.id} className="group">
                  {/* Summary Row */}
                  <button
                    onClick={() => toggleOrder(order.id)}
                    className="w-full flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 md:p-8 text-left transition-colors hover:bg-secondary/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-soft-gray uppercase tracking-widest">
                          Order
                        </span>
                        <span className="text-xs font-mono text-accent-gold font-bold">
                          #{order.order_number}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-soft-gray">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-1">
                      <span className="flex items-center gap-1 text-lg font-serif text-accent-gold font-bold">
                        <IndianRupee className="w-4 h-4" />
                        {order.total_amount}
                      </span>
                      <span className="px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-[10px] font-semibold uppercase tracking-widest text-text-main">
                        {order.status || "pending"}
                      </span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-soft-gray group-hover:text-accent-gold transition-colors">
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-300 ${
                            expandedOrderId === order.id ? "rotate-90" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {expandedOrderId === order.id && (
                    <div className="px-6 md:px-8 pb-8 pt-2 space-y-6 bg-secondary/20 rounded-b-[2rem]">
                      {/* Address */}
                      <div className="bg-white rounded-2xl p-5 border border-text-main/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-accent-gold" />
                          <span className="text-xs font-bold uppercase tracking-widest text-text-main/60">
                            Delivery Address
                          </span>
                        </div>
                        <p className="text-sm text-text-main whitespace-pre-line leading-relaxed">
                          {order.address}
                        </p>
                      </div>

                      {/* Items */}
                      <div className="bg-white rounded-2xl p-5 border border-text-main/5 shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-main/60 mb-3 block">
                          Ordered Items
                        </span>
                        <div className="space-y-3">
                          {order.items?.map((item) => (
                            <div
                              key={`${order.id}-${item.id}`}
                              className="flex items-center justify-between gap-4"
                            >
                              <div>
                                <p className="font-semibold text-text-main text-sm">
                                  {item.name}
                                </p>
                                <p className="text-xs text-soft-gray">
                                  Qty {item.quantity} × ₹{item.price} = ₹
                                  {item.price * item.quantity}
                                </p>
                              </div>
                              <p className="text-sm font-bold text-text-main">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
