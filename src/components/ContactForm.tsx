"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    if (!String(data.get("name") || "").trim()) next.name = "Please enter your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email.";
    if (!String(data.get("subject") || "").trim())
      next.subject = "Please enter a subject.";
    if (!String(data.get("message") || "").trim())
      next.message = "Please write a message.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const validation = validate(data);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

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
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="card p-8 text-center"
      >
        <div className="text-4xl">🌸</div>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink">
          Message received
        </h2>
        <p className="mt-2 text-sm text-muted">
          Thank you for reaching out. I read every message with care and will
          reply soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="card flex flex-col gap-4 p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} />
        <Field label="Email" name="email" type="email" error={errors.email} />
      </div>
      <Field label="Subject" name="subject" error={errors.subject} />

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-blush-600">{errors.message}</p>
        )}
      </div>

      <button type="submit" className="btn-primary self-start">
        Send message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-200"
      />
      {error && <p className="mt-1 text-xs text-blush-600">{error}</p>}
    </div>
  );
}
