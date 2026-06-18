import Link from "next/link";
import type { Category } from "@/types";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./icons";

export function Footer({ categories }: { categories: Category[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-blush-100 bg-white/60 backdrop-blur">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Planting seeds of wisdom for a more mindful, purposeful, and peaceful
            life — one reflection at a time.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={siteConfig.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white">
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-blush-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Categories</h3>
          <ul className="space-y-2 text-sm text-muted">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="transition hover:text-blush-600"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-ink">Newsletter</h3>
          <p className="mb-3 text-sm text-muted">
            Join the journey. Receive gentle wisdom in your inbox.
          </p>
          <Link href="/#newsletter" className="btn-ghost">
            Subscribe
          </Link>
        </div>
      </div>

      <div className="border-t border-blush-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {year} Sumati&rsquo;s Seeds of Wisdom. Crafted with care &amp; intention.
          </p>
          <p>Made with 🌱 for mindful growth.</p>
        </div>
      </div>
    </footer>
  );
}
