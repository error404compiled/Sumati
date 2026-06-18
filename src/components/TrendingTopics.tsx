import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";
import { FadeIn } from "./Motion";
import { ArrowRightIcon, SparkleIcon } from "./icons";

export function TrendingTopics({
  categories,
}: {
  categories: (Category & { count: number })[];
}) {
  return (
    <section className="container-page mt-14">
      <FadeIn>
        <div className="mb-4 flex items-center justify-center gap-2">
          <SparkleIcon className="h-5 w-5 text-blush-500" />
          <h2 className="font-display text-xl font-bold text-ink">
            Trending Topics
          </h2>
        </div>

        <div className="card flex flex-wrap items-center justify-center gap-x-6 gap-y-5 rounded-[2rem] px-6 py-6 sm:px-8">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-2"
            >
              <span className="relative">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover shadow-soft transition-transform duration-300 group-hover:-translate-y-1"
                />
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-blush-500 px-1.5 text-[11px] font-bold text-white shadow-soft">
                  {cat.count}
                </span>
              </span>
              <span className="text-xs font-semibold text-ink transition-colors group-hover:text-blush-600">
                {cat.name}
              </span>
            </Link>
          ))}

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted">or…</span>
            <Link href="/categories" className="btn-primary">
              Explore All
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
