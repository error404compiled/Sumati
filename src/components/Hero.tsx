import Image from "next/image";
import { NewsletterForm } from "./NewsletterForm";
import { FadeIn } from "./Motion";

export function Hero() {
  return (
    <section className="container-page pt-10 sm:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <FadeIn>
          <div className="max-w-xl">
            <h1 className="font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Hello, I&rsquo;m{" "}
              <span className="bg-gradient-to-r from-blush-500 to-lotus-500 bg-clip-text text-transparent">
                Sumati
              </span>{" "}
              <span className="inline-block animate-float">👋</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Welcome to <strong className="text-ink">Sumati&rsquo;s Seeds of Wisdom</strong>,
              a space where timeless wisdom meets everyday life. Here I share
              reflections, stories, spiritual insights, life lessons, and
              practical guidance to help you grow with purpose and clarity.
            </p>

            <div className="mt-7" id="newsletter">
              <p className="mb-2 text-sm font-semibold text-ink">
                Let&rsquo;s grow together
              </p>
              <NewsletterForm buttonLabel="Start Growing" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.75rem] bg-gradient-to-br from-blush-200/60 to-lotus-200/50 blur-2xl" />
            <div className="overflow-hidden rounded-[2.25rem] shadow-float">
              <Image
                src="/images/hero.svg"
                alt="A peaceful figure meditating before a sunrise over mountains and lotus flowers"
                width={640}
                height={560}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
