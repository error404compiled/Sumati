import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import { getAllCategories, getAllPosts } from "@/lib/content";
import type { SearchItem } from "@/types/search";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Daily Wisdom & Mindful Growth`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const searchItems: SearchItem[] = posts.map((p) => ({
    title: p.title,
    excerpt: p.excerpt,
    slug: p.slug,
    category: p.category,
    tags: p.tags,
  }));

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Plausible Analytics — replace data-domain after deployment */}
        <Script
          defer
          data-domain="sumatis-seeds-of-wisdom.netlify.app"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        <Navbar searchItems={searchItems} />
        <main id="content">{children}</main>
        <Footer categories={categories} />

        {/* Netlify Identity — enables Decap CMS login + invite redirects */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function (user) {
              if (!user) {
                window.netlifyIdentity.on("login", function () {
                  document.location.href = "/admin/";
                });
              }
            });
          }`}
        </Script>
      </body>
    </html>
  );
}
