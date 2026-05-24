"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  placeholder?: string;
  maxHeight?: string;
}

export default function MultiSelect({
  options,
  selected,
  onChange,
  label,
  placeholder = "Select options",
  maxHeight = "200px",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option: string) => {
    onChange(selected.filter((s) => s !== option));
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="text-xs font-bold text-text-main/60 uppercase tracking-widest block mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={
          "w-full px-4 py-3 rounded-xl border bg-white text-left transition-all duration-200 flex items-center justify-between gap-2 " +
          (isOpen
            ? "border-accent-gold/50 ring-2 ring-accent-gold/10"
            : "border-text-main/10 hover:border-text-main/20")
        }
      >
        <div className="flex-1 flex flex-wrap gap-1 min-h-[20px]">
          {selected.length === 0 ? (
            <span className="text-sm text-soft-gray/50">{placeholder}</span>
          ) : (
            <span className="text-sm text-text-main">
              {selected.length} selected
            </span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-soft-gray" />
      </button>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((option) => (
            <span
              key={option}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-gold/10 text-text-main text-xs font-medium rounded-lg border border-accent-gold/20"
            >
              {option}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
                className="w-3.5 h-3.5 rounded-full bg-accent-gold/20 flex items-center justify-center hover:bg-red-100 transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-text-main/10 rounded-xl shadow-xl overflow-hidden">
          <div className="p-3 border-b border-text-main/5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-lg border border-text-main/10 bg-secondary/30 text-sm focus:outline-none focus:border-accent-gold/50 transition-all"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="overflow-y-auto" style={{ maxHeight }}>
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-soft-gray/50 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className={
                      "w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 " +
                      (isSelected
                        ? "bg-accent-gold/5 text-accent-gold hover:bg-accent-gold/10"
                        : "text-text-main hover:bg-secondary/50")
                    }
                  >
                    <div
                      className={
                        "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors " +
                        (isSelected
                          ? "bg-accent-gold border-accent-gold"
                          : "border-text-main/20 bg-white")
                      }
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    {option}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-3 border-t border-text-main/5 flex items-center justify-between">
            <span className="text-xs text-soft-gray">
              {selected.length} selected
            </span>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
