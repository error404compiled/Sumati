"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Author, Category, PostMeta } from "@/types";
import { formatDate } from "@/utils";
import { CalendarIcon, ClockIcon } from "./icons";
import { Rating } from "./Rating";

export function PostCard({
  post,
  author,
  category,
}: {
  post: PostMeta;
  author?: Author;
  category?: Category;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="card group overflow-hidden transition-shadow duration-300 hover:shadow-float sm:flex"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block shrink-0 overflow-hidden sm:w-2/5"
      >
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={400}
          height={300}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blush-600 shadow-soft backdrop-blur">
          {category?.name ?? post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon className="h-3.5 w-3.5 text-blush-400" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5 text-blush-400" />
            {post.readingTime}
          </span>
          <Rating value={post.rating ?? 0} />
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-blush-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-blush-50 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {author && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover ring-2 ring-blush-100"
              />
            )}
            <span className="text-xs font-semibold text-ink">
              {author?.name ?? "Sumati"}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
