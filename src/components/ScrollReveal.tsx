"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const initializeObservers = () => {
      try {
        if (!("IntersectionObserver" in window)) {
          // Fallback: make everything visible immediately
          document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          document.querySelectorAll(".terminal-line").forEach((el) => el.classList.add("visible"));
          return;
        }

        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        const terminalObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.querySelectorAll(".terminal-line").forEach((line) => {
                  line.classList.add("visible");
                });
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
        // Retry for async-mounted content
        setTimeout(observe, 800);
        setTimeout(observe, 2000);

        return () => {
          revealObserver.disconnect();
          terminalObserver.disconnect();
        };
      } catch (err) {
        console.warn("ScrollReveal init failed gracefully:", err);
        // Fallback: show everything
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        document.querySelectorAll(".terminal-line").forEach((el) => el.classList.add("visible"));
      }
    };

    const cleanup = initializeObservers();
    return cleanup;
  }, []);

  return null;
}
