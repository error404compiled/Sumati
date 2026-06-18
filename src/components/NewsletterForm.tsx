"use client";

import { useState } from "react";
import { ArrowRightIcon } from "./icons";

export function NewsletterForm({
  variant = "default",
  buttonLabel = "Start Growing",
}: {
  variant?: "default" | "compact";
  buttonLabel?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
    } catch {
      /* Netlify intercepts at build/deploy; ignore local dev errors */
    }
    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return (
      <p
        role="status"
        className="rounded-2xl bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600"
      >
        🌱 Thank you! A seed of wisdom is on its way to your inbox.
      </p>
    );
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className={
        variant === "compact"
          ? "flex flex-col gap-2"
          : "flex flex-col gap-2 sm:flex-row"
      }
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label htmlFor={`nl-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`nl-${variant}`}
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full flex-1 rounded-full border border-blush-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        {buttonLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
