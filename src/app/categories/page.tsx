import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories, getCategoryPostCount } from "@/lib/content";
import { FadeIn } from "@/components/Motion";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore wisdom by theme — spirituality, mindfulness, life lessons, gratitude, and more.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="container-page pt-12">
      <FadeIn>
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold text-ink">
            Explore by Theme
          </h1>
          <p className="mt-3 text-muted">
            Every seed of wisdom belongs to a garden. Wander through the themes
            that speak to your journey.
          </p>
        </header>
      </FadeIn>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <FadeIn key={cat.slug} delay={i * 0.05}>
            <Link
              href={`/categories/${cat.slug}`}
              className="card group block overflow-hidden transition hover:shadow-float"
            >
              <div
                className="relative flex h-36 items-center justify-center"
                style={{ background: `${cat.color}22` }}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={88}
                  height={88}
                  className="h-20 w-20 rounded-full shadow-soft transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-ink">
                    {cat.name}
                  </h2>
                  <span className="chip">{getCategoryPostCount(cat.slug)}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{cat.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blush-600">
                  Read articles
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
