"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const initializeObservers = () => {
      try {
        if (!("IntersectionObserver" in window)) {
          document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          document.querySelectorAll(".terminal-container").forEach((el) => {
            const lines = el.querySelector(".terminal-lines");
            if (lines) lines.classList.add("terminal-active");
          });
          return;
        }

        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry && entry.isIntersecting && entry.target) {
                entry.target.classList.add("visible");
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        const terminalObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry && entry.isIntersecting && entry.target) {
                const lines = entry.target.querySelector(".terminal-lines");
                if (lines) lines.classList.add("terminal-active");
              }
            });
          },
          { threshold: 0.5 }
        );

        const observe = () => {
          document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
          document.querySelectorAll(".terminal-container").forEach((el) => terminalObserver.observe(el));
        };

        observe();
        setTimeout(observe, 800);
        setTimeout(observe, 2000);

        return () => {
          revealObserver.disconnect();
          terminalObserver.disconnect();
        };
      } catch (err) {
        console.warn("ScrollReveal init failed gracefully:", err);
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      }
    };

    const cleanup = initializeObservers();
    return cleanup;
  }, []);

  return null;
}
