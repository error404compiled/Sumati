import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all reflections, wisdom, categories and tags.",
};

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="container-page pt-12">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-ink">
          Search Wisdom
        </h1>
        <p className="mt-3 text-muted">
          Find reflections by title, content, category, or tag.
        </p>
      </header>
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <SearchResults posts={posts} />
      </Suspense>
    </div>
  );
}
