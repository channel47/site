"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-c47-accent text-lg font-medium">
        You&rsquo;re in. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="newsletter-input flex-1 bg-transparent border-b-2 border-[#333333] text-zinc-100 px-0 py-3 outline-none placeholder:text-zinc-600 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="text-xs font-bold uppercase tracking-widest text-[#888888] hover:text-c47-accent transition-all duration-300 py-3 px-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-1 sm:mt-0 sm:self-center">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
