"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Gift, ImageIcon, Loader2, Package, Plus, Sparkles, Trash2, X } from "lucide-react";
import MultiImageUpload from "@/components/MultiImageUpload";

type Option = { id: string; name: string; description?: string; price?: number; image?: string; category?: string };
type Tab = "packaging" | "items" | "personalization";

function EditorModal({
  title,
  option,
  onClose,
  onSave,
  uploading,
}: {
  title: string;
  option: Option;
  onClose: () => void;
  onSave: (next: Option) => void;
  uploading: boolean;
}) {
  const [name, setName] = useState(option.name || "");
  const [description, setDescription] = useState(option.description || "");
  const [price, setPrice] = useState(String(option.price ?? 0));
  const [category, setCategory] = useState(option.category || "Gourmet");
  const [images, setImages] = useState<string[]>(option.image ? [option.image] : []);

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
        <div className="sticky top-0 bg-secondary z-10 px-8 py-6 border-b border-text-main/5 flex items-center justify-between backdrop-blur-xl">
          <h2 className="text-2xl font-serif text-text-main">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <X className="w-5 h-5 text-text-main" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="Option name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          {option.id.startsWith("fill-") && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="Gourmet">Gourmet</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Floral">Floral</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gray pointer-events-none" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-text-main/10 bg-white text-text-main text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-2 focus:ring-accent-gold/10 transition-all resize-none"
              placeholder="Describe this option..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest">Image</label>
            <div className="rounded-2xl border border-text-main/5 bg-white p-4">
              <MultiImageUpload images={images} onChange={setImages} singleImage />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => onSave({ ...option, name: name.trim(), description: description.trim(), price: Number(price) || 0, image: images[0] || "", category: option.id.startsWith("fill-") ? category : option.category })}
              disabled={uploading}
              className="w-full py-4 bg-text-main text-white font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-accent-gold hover:text-text-main text-sm uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminCustomBoxClient({
  initialPackaging,
  initialPersonalization,
  initialItems,
}: {
  initialPackaging: Option[];
  initialPersonalization: Option[];
  initialItems: Option[];
}) {
  const [tab, setTab] = useState<Tab>("packaging");
  const [packaging, setPackaging] = useState<Option[]>(initialPackaging);
  const [personalization, setPersonalization] = useState<Option[]>(initialPersonalization);
  const [items, setItems] = useState<Option[]>(initialItems);
  const [editing, setEditing] = useState<Option | null>(null);
  const [saving, setSaving] = useState(false);

  const currentList = useMemo(() => {
    if (tab === "packaging") return packaging;
    if (tab === "personalization") return personalization;
    return items;
  }, [tab, packaging, personalization, items]);

  const refreshList = async (nextTab: Tab = tab) => {
    const res = await fetch(`/api/admin/custom-box/${nextTab}`);
    const json = await res.json();
    if (nextTab === "packaging") setPackaging(json.data || []);
    else if (nextTab === "personalization") setPersonalization(json.data || []);
    else setItems(json.data || []);
  };

  const getTitle = () => {
    if (tab === "packaging") return "Packaging";
    if (tab === "items") return "Items";
    return "Personalization";
  };

  const openNew = () => {
    const base: Option = {
      id: `new-${crypto.randomUUID()}`,
      name: "",
      description: "",
      price: 0,
      image: "",
      category: tab === "items" ? "Gourmet" : undefined,
    };
    setEditing(base);
  };

  const openEdit = (item: Option) => setEditing(item);

  const save = async (next: Option) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/custom-box/${tab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error("Save failed");
      setEditing(null);
      await refreshList(tab);
    } catch (error) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`/api/admin/custom-box/${tab}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) await refreshList(tab);
    else alert("Delete failed");
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-white rounded-[2rem] shadow-premium border border-text-main/5 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-accent-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-3 block">Bespoke Admin</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-main italic">Manage Make Your Own Box</h2>
              <p className="text-soft-gray mt-3 max-w-2xl">
                Edit packaging, catalog items, and personalization options with the same polished workflow as the product editor.
              </p>
            </div>

            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-gold text-white font-bold rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              New {getTitle()}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["packaging", "items", "personalization"] as Tab[]).map((nextTab) => (
              <button
                key={nextTab}
                onClick={() => setTab(nextTab)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold uppercase tracking-widest transition-colors ${
                  tab === nextTab ? "bg-text-main text-white border-text-main" : "bg-white text-text-main/70 border-text-main/10 hover:border-accent-gold hover:text-text-main"
                }`}
              >
                {nextTab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {currentList.map((item) => (
            <div key={item.id} className="group rounded-[2rem] bg-white shadow-sm border border-text-main/10 overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-primary/10 relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-soft-gray bg-gradient-to-br from-white to-secondary/60">
                    <div className="text-center">
                      <ImageIcon className="w-10 h-10 mx-auto mb-2 text-soft-gray/40" />
                      <span className="text-sm">No image</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg text-text-main leading-tight">{item.name}</h3>
                    <span className="text-sm font-bold text-accent-gold whitespace-nowrap">₹{item.price}</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-bold text-accent-sage mt-2">{item.category || getTitle()}</p>
                  <p className="text-sm text-soft-gray mt-2 leading-relaxed">{item.description || "No description added yet."}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="px-4 py-2 rounded-full border border-text-main/10 text-sm font-semibold text-text-main hover:border-accent-gold hover:text-text-main transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="px-4 py-2 rounded-full border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {editing && (
            <EditorModal
              title={`${editing.id.startsWith("new-") ? "Add" : "Edit"} ${getTitle()}`}
              option={editing}
              onClose={() => setEditing(null)}
              onSave={save}
              uploading={saving}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
