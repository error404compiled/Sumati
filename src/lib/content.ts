import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import readingTime from "reading-time";
import type { Author, Category, Post, PostMeta } from "@/types";

const contentDir = path.join(process.cwd(), "content");
const postsDir = path.join(contentDir, "posts");
const authorsDir = path.join(contentDir, "authors");
const categoriesDir = path.join(contentDir, "categories");

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

/** Deterministic pseudo-random view count derived from the slug. */
function viewsForSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 800 + (hash % 9200);
}

export function getPostSlugs(): string[] {
  return readDir(postsDir).map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const posts = getPostSlugs()
    .map((slug) => {
      const fullPath = path.join(postsDir, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const fm = data as PostMeta;
      return {
        ...fm,
        slug: fm.slug || slug,
        tags: fm.tags || [],
        readingTime: readingTime(content).text,
        views: viewsForSlug(fm.slug || slug),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  const fm = data as Post;
  return {
    ...fm,
    slug: fm.slug || slug,
    tags: fm.tags || [],
    contentHtml: processed.toString(),
    readingTime: readingTime(content).text,
    views: viewsForSlug(fm.slug || slug),
  };
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getPopularPosts(limit = 4): PostMeta[] {
  return [...getAllPosts()].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getRecentPosts(limit = 3): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getAllAuthors(): Author[] {
  return readDir(authorsDir).map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(path.join(authorsDir, file), "utf8");
    const { data } = matter(fileContents);
    return { slug, ...(data as Omit<Author, "slug">) };
  });
}

export function getAuthor(slug: string): Author | undefined {
  return getAllAuthors().find((a) => a.slug === slug);
}

export function getAllCategories(): Category[] {
  return readDir(categoriesDir).map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fileContents = fs.readFileSync(path.join(categoriesDir, file), "utf8");
    const { data } = matter(fileContents);
    return { slug, ...(data as Omit<Category, "slug">) };
  });
}

export function getCategory(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getCategoryPostCount(slug: string): number {
  return getPostsByCategory(slug).length;
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
