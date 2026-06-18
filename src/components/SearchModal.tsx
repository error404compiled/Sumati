"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { SearchItem } from "@/types/search";
import { CloseIcon, SearchIcon } from "./icons";

export function SearchModal({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter((item) => {
        const haystack = [
          item.title,
          item.excerpt,
          item.category,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, items]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 px-4 pt-24 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Search articles"
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-float"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-blush-100 px-5 py-4">
              <SearchIcon className="h-5 w-5 text-blush-500" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wisdom, reflections, topics…"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-1 text-muted transition hover:bg-blush-50 hover:text-blush-600"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && results.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-muted">
                  No reflections found for &ldquo;{query}&rdquo;.
                </p>
              )}
              {results.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  onClick={onClose}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-blush-50"
                >
                  <span className="chip mb-1">{item.category}</span>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="line-clamp-1 text-xs text-muted">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
              {!query.trim() && (
                <p className="px-4 py-6 text-center text-sm text-muted">
                  Start typing to search across titles, content, categories and
                  tags.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
