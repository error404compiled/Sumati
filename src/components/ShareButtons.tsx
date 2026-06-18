"use client";

import { useEffect, useState } from "react";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "./icons";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <TwitterIcon className="h-4 w-4" />,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="h-4 w-4" />,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinIcon className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-muted">Share:</span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-50 text-blush-600 transition hover:bg-blush-500 hover:text-white"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
