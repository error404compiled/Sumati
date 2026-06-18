"use client";

import { useState } from "react";

export function CommentsForm({ slug }: { slug: string }) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          data as unknown as Record<string, string>
        ).toString(),
      });
    } catch {
      /* ignore local dev errors */
    }
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <p
        role="status"
        className="rounded-2xl bg-blush-50 px-4 py-3 text-sm font-medium text-blush-600"
      >
        🙏 Thank you for sharing your reflection. It will appear after review.
      </p>
    );
  }

  return (
    <form
      name="comments"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="card flex flex-col gap-4 p-6"
    >
      <input type="hidden" name="form-name" value="comments" />
      <input type="hidden" name="post-slug" value={slug} />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="c-name"
            name="name"
            required
            className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            name="email"
            required
            className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
          />
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-ink">
          Your reflection
        </label>
        <textarea
          id="c-message"
          name="comment"
          rows={4}
          required
          className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
        />
      </div>
      <button type="submit" className="btn-primary self-start">
        Post comment
      </button>
    </form>
  );
}
