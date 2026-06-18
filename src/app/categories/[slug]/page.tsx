import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllCategories,
  getAuthor,
  getCategory,
  getPostsByCategory,
} from "@/lib/content";
import { PostCard } from "@/components/PostCard";
import { FadeIn } from "@/components/Motion";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug);

  return (
    <div className="container-page pt-12">
      <FadeIn>
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted">
          <Link href="/categories" className="hover:text-blush-600">
            Categories
          </Link>{" "}
          / <span className="text-ink">{category.name}</span>
        </nav>
        <header className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold text-ink">
            {category.name}
          </h1>
          <p className="mt-3 text-muted">{category.description}</p>
        </header>
      </FadeIn>

      <div className="mt-10 flex flex-col gap-6">
        {posts.length === 0 ? (
          <p className="text-muted">No reflections in this theme yet — check back soon.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              author={getAuthor(post.author)}
              category={category}
            />
          ))
        )}
      </div>
    </div>
  );
}
