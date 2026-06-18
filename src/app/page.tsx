import {
  getAllAuthors,
  getAllCategories,
  getAllPosts,
  getAllTags,
  getAuthor,
  getCategory,
  getCategoryPostCount,
  getPopularPosts,
  getRecentPosts,
} from "@/lib/content";
import { Hero } from "@/components/Hero";
import { TrendingTopics } from "@/components/TrendingTopics";
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { FadeIn } from "@/components/Motion";
import { SparkleIcon } from "@/components/icons";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const sumati = getAuthor("sumati");
  getAllAuthors(); // ensure authors are read at build

  const trending = categories.map((c) => ({
    ...c,
    count: getCategoryPostCount(c.slug),
  }));

  return (
    <>
      <Hero />
      <TrendingTopics categories={trending} />

      <section className="container-page mt-16 grid gap-10 lg:grid-cols-[320px_1fr]">
        {sumati && (
          <Sidebar
            author={sumati}
            tags={tags}
            recentPosts={getRecentPosts(3)}
            popularPosts={getPopularPosts(4)}
          />
        )}

        <div>
          <FadeIn>
            <div className="mb-5 flex items-center gap-2">
              <SparkleIcon className="h-5 w-5 text-blush-500" />
              <h2 className="font-display text-2xl font-bold text-ink">
                Latest Reflections
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                author={getAuthor(post.author)}
                category={getCategory(post.category)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
