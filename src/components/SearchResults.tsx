"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/types";
import { formatDate } from "@/utils";
import { SearchIcon } from "@/components/icons";

export function SearchResults({ posts }: { posts: PostMeta[] }) {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [p.title, p.excerpt, p.category, ...p.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, posts]);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <div className="flex items-center gap-3 rounded-full border border-blush-200 bg-white px-5 py-3 shadow-soft">
          <SearchIcon className="h-5 w-5 text-blush-500" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wisdom, reflections, topics…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Search articles"
          />
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        {query.trim()
          ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
          : `Browse all ${posts.length} reflections`}
      </p>

      <div className="mx-auto mt-8 grid max-w-3xl gap-4">
        {results.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card group flex items-center gap-4 p-4 transition hover:shadow-float"
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={72}
              height={72}
              className="h-18 w-18 shrink-0 rounded-2xl object-cover"
              style={{ height: 72, width: 72 }}
            />
            <div className="min-w-0">
              <span className="chip mb-1">{post.category}</span>
              <h2 className="text-base font-semibold text-ink transition group-hover:text-blush-600">
                {post.title}
              </h2>
              <p className="line-clamp-1 text-sm text-muted">{post.excerpt}</p>
              <p className="mt-1 text-xs text-muted">{formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
        {results.length === 0 && (
          <p className="text-center text-muted">
            No reflections found. Try another word.
          </p>
        )}
      </div>
    </div>
  );
}
