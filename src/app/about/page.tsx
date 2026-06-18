import type { Metadata } from "next";
import Image from "next/image";
import { getAuthor } from "@/lib/content";
import { FadeIn } from "@/components/Motion";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SparkleIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Sumati",
  description:
    "The story, mission, and values behind Sumati's Seeds of Wisdom — a space for mindful growth and timeless reflection.",
};

const timeline = [
  {
    year: "The Beginning",
    text: "A lifelong love of stories, philosophy, and the quiet questions that shape a meaningful life.",
  },
  {
    year: "The Practice",
    text: "Years of study in mindfulness, spirituality, and personal growth — learning to live wisdom, not just read it.",
  },
  {
    year: "The Sharing",
    text: "Seeds of Wisdom was born: a gentle space to share reflections and walk alongside others on their journey.",
  },
  {
    year: "Today",
    text: "A growing community of seekers, planting small seeds of insight that blossom into more peaceful, purposeful lives.",
  },
];

const values = [
  { title: "Presence", text: "Meeting each moment fully, with attention and care." },
  { title: "Compassion", text: "Holding ourselves and others with gentleness." },
  { title: "Growth", text: "Honoring the slow, sacred work of becoming." },
  { title: "Authenticity", text: "Sharing truth with humility and openness." },
];

const gallery = [
  "/images/posts/sublime.svg",
  "/images/posts/mountains.svg",
  "/images/posts/gratitude.svg",
  "/images/posts/purpose.svg",
  "/images/posts/music.svg",
  "/images/posts/health.svg",
];

export default function AboutPage() {
  const author = getAuthor("sumati");

  return (
    <div className="container-page pt-12">
      {/* Bio */}
      <section className="grid items-center gap-10 lg:grid-cols-[280px_1fr]">
        <FadeIn>
          <div className="relative mx-auto w-fit">
            <div className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-blush-200 to-lotus-200 blur-2xl" />
            {author && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={240}
                height={240}
                className="h-56 w-56 rounded-full object-cover shadow-float ring-4 ring-white"
              />
            )}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            <span className="chip">Founder &amp; Wisdom Writer</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-ink">
              Hello, I&rsquo;m Sumati
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {author?.bio}
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              I believe wisdom isn&rsquo;t found in grand gestures, but in the
              quiet, daily practice of paying attention — to ourselves, to one
              another, and to the sacred ordinary moments that make up a life.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Mission */}
      <FadeIn>
        <section className="mt-16 rounded-[2rem] bg-gradient-to-br from-blush-100 to-lotus-100 p-8 text-center sm:p-12">
          <SparkleIcon className="mx-auto h-7 w-7 text-blush-500" />
          <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            My Mission
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            To make timeless wisdom practical and accessible — planting small
            seeds of insight that help each of us grow with purpose, presence,
            and peace.
          </p>
        </section>
      </FadeIn>

      {/* Timeline */}
      <section className="mt-16">
        <FadeIn>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-ink">
            The Journey
          </h2>
        </FadeIn>
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-blush-200 sm:left-1/2" />
          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.05}>
                <div
                  className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? "sm:pr-10 sm:text-right"
                      : "sm:ml-auto sm:pl-10"
                  }`}
                >
                  <span
                    className={`absolute left-2.5 top-2 h-3 w-3 rounded-full bg-blush-500 ring-4 ring-blush-100 sm:left-auto ${
                      i % 2 === 0 ? "sm:-right-1.5" : "sm:-left-1.5"
                    }`}
                  />
                  <div className="card p-5">
                    <p className="font-display text-lg font-bold text-blush-600">
                      {item.year}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-16">
        <FadeIn>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-ink">
            What I Value
          </h2>
        </FadeIn>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.05}>
              <div className="card h-full p-6 text-center">
                <h3 className="font-display text-lg font-bold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{value.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-16">
        <FadeIn>
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-ink">
            Moments of Reflection
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((src, i) => (
            <FadeIn key={src} delay={i * 0.04}>
              <div className="overflow-hidden rounded-3xl shadow-card">
                <Image
                  src={src}
                  alt="Reflection illustration"
                  width={400}
                  height={250}
                  className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        id="newsletter"
        className="mt-16 rounded-[2rem] bg-white/80 p-8 text-center shadow-card"
      >
        <h2 className="font-display text-2xl font-bold text-ink">
          Walk with me
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Subscribe for weekly seeds of wisdom and gentle reflections.
        </p>
        <div className="mx-auto mt-5 max-w-md">
          <NewsletterForm buttonLabel="Subscribe" />
        </div>
      </section>
    </div>
  );
}
