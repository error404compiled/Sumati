import Image from "next/image";
import Link from "next/link";
import type { Author, Category, PostMeta } from "@/types";
import { formatDate } from "@/utils";
import { NewsletterForm } from "./NewsletterForm";
import { FadeIn } from "./Motion";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  SparkleIcon,
  YoutubeIcon,
} from "./icons";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="section-title mb-3">
      <SparkleIcon className="h-4 w-4 text-blush-500" />
      {children}
    </h3>
  );
}

export function AboutCard({ author }: { author: Author }) {
  return (
    <FadeIn>
      <div>
        <Heading>About Sumati</Heading>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <Image
              src={author.avatar}
              alt={author.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-blush-100"
            />
            <div>
              <p className="font-display text-base font-bold text-ink">
                {author.name}
              </p>
              <p className="text-xs text-blush-500">{author.title}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{author.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {author.socials.instagram && (
              <SocialLink href={author.socials.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </SocialLink>
            )}
            {author.socials.youtube && (
              <SocialLink href={author.socials.youtube} label="YouTube">
                <YoutubeIcon className="h-4 w-4" />
              </SocialLink>
            )}
            {author.socials.facebook && (
              <SocialLink href={author.socials.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </SocialLink>
            )}
            {author.socials.linkedin && (
              <SocialLink href={author.socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </SocialLink>
            )}
            {author.socials.website && (
              <SocialLink href={author.socials.website} label="Website">
                <GlobeIcon className="h-4 w-4" />
              </SocialLink>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white"
    >
      {children}
    </a>
  );
}

export function TagCloud({ tags }: { tags: string[] }) {
  return (
    <FadeIn>
      <div>
        <Heading>Wisdom Categories</Heading>
        <div className="card flex flex-wrap gap-2 p-5">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="chip"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function PostRow({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-blush-50"
    >
      <Image
        src={post.featuredImage}
        alt={post.title}
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-blush-600">
          {post.title}
        </p>
        <p className="mt-1 text-xs text-muted">{formatDate(post.date)}</p>
      </div>
    </Link>
  );
}

export function RecentPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <FadeIn>
      <div>
        <Heading>Recent Posts</Heading>
        <div className="card flex flex-col gap-1 p-3">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export function PopularPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <FadeIn>
      <div>
        <Heading>Popular Posts</Heading>
        <div className="card flex flex-col gap-1 p-3">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export function NewsletterWidget() {
  return (
    <FadeIn>
      <div>
        <Heading>Newsletter</Heading>
        <div className="card bg-gradient-to-br from-blush-50 to-lotus-50 p-5">
          <p className="font-display text-base font-bold text-ink">
            Seeds in your inbox
          </p>
          <p className="mt-1 text-sm text-muted">
            Gentle reflections and wisdom, delivered weekly. No noise, just
            growth.
          </p>
          <div className="mt-4">
            <NewsletterForm variant="compact" buttonLabel="Subscribe" />
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export function Sidebar({
  author,
  tags,
  recentPosts,
  popularPosts,
}: {
  author: Author;
  tags: string[];
  recentPosts: PostMeta[];
  popularPosts: PostMeta[];
}) {
  return (
    <aside className="flex flex-col gap-8">
      <AboutCard author={author} />
      <TagCloud tags={tags} />
      <RecentPosts posts={recentPosts} />
      <PopularPosts posts={popularPosts} />
      <NewsletterWidget />
    </aside>
  );
}
