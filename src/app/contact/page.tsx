import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/Motion";
import { siteConfig } from "@/lib/site";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question, reflection, or kind word to share? Get in touch with Sumati.",
};

export default function ContactPage() {
  return (
    <div className="container-page pt-12">
      <FadeIn>
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-bold text-ink">
            Let&rsquo;s Connect
          </h1>
          <p className="mt-3 text-muted">
            Whether you have a question, a reflection to share, or simply want to
            say hello — I&rsquo;d love to hear from you.
          </p>
        </header>
      </FadeIn>

      <div className="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-[1fr_280px]">
        <FadeIn>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1}>
          <aside className="flex flex-col gap-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                Find me online
              </h2>
              <div className="mt-4 flex gap-2">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white"
                >
                  <YoutubeIcon className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-blush-50 to-lotus-50 p-6">
              <h2 className="font-display text-lg font-bold text-ink">
                A gentle note
              </h2>
              <p className="mt-2 text-sm text-muted">
                I read every message personally and reply with care. Thank you
                for your patience and presence. 🌱
              </p>
            </div>
          </aside>
        </FadeIn>
      </div>
    </div>
  );
}
