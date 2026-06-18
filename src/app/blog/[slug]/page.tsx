import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPosts,
  getAuthor,
  getCategory,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/utils";
import { ShareButtons } from "@/components/ShareButtons";
import {
  TableOfContents,
  extractHeadings,
} from "@/components/TableOfContents";
import { PostCard } from "@/components/PostCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CommentsForm } from "@/components/CommentsForm";
import { Rating } from "@/components/Rating";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "@/components/icons";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.featuredImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const author = getAuthor(post.author);
  const category = getCategory(post.category);
  const { html, toc } = extractHeadings(post.contentHtml);

  const allPosts = getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const next = index > 0 ? allPosts[index - 1] : null;
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.featuredImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: author?.name || "Sumati" },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.svg` },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name || post.category,
        item: `${siteConfig.url}/categories/${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="container-page pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-blush-600">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/categories/${post.category}`}
              className="hover:text-blush-600"
            >
              {category?.name || post.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{post.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        <span className="chip mx-auto">{category?.name || post.category}</span>
        <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            {author && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover ring-2 ring-blush-100"
              />
            )}
            {author?.name || "Sumati"}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-blush-400" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-blush-400" />
            {post.readingTime}
          </span>
          <Rating value={post.rating ?? 0} />
        </div>
      </header>

      {/* Hero image */}
      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[2rem] shadow-card">
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={1024}
          height={640}
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_280px]">
        {/* Content */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
          <div
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-muted"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="chip"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Prev / Next */}
          <nav className="mt-10 grid gap-4 border-t border-blush-100 pt-6 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="card p-4 transition hover:shadow-float"
              >
                <span className="text-xs text-muted">← Previous</span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="card p-4 text-right transition hover:shadow-float"
              >
                <span className="text-xs text-muted">Next →</span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {next.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        {/* Sidebar: TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents items={toc} />
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-5 font-display text-2xl font-bold text-ink">
            Related Reflections
          </h2>
          <div className="grid gap-6">
            {related.map((p) => (
              <PostCard
                key={p.slug}
                post={p}
                author={getAuthor(p.author)}
                category={getCategory(p.category)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section
        id="newsletter"
        className="mx-auto mt-16 max-w-5xl rounded-[2rem] bg-gradient-to-br from-blush-100 to-lotus-100 p-8 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-ink">
          Plant a seed of wisdom in your inbox
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Join our growing community and receive gentle, thoughtful reflections
          every week.
        </p>
        <div className="mx-auto mt-5 max-w-md">
          <NewsletterForm buttonLabel="Subscribe" />
        </div>
      </section>

      {/* Comments */}
      <section className="mx-auto mt-16 max-w-3xl">
        <h2 className="mb-5 font-display text-2xl font-bold text-ink">
          Join the conversation
        </h2>
        <CommentsForm slug={post.slug} />
      </section>

      <div className="mx-auto mt-12 max-w-3xl text-center">
        <Link href="/" className="btn-ghost">
          Back to all reflections
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
