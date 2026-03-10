# Channel 47 Site

Astro 5 → channel47.dev via Vercel. Fresh rebuild — minimal placeholder live, everything else is a blank canvas.

## What Exists

- `src/pages/index.astro` — placeholder page (logo + "coming soon")
- `src/pages/api/subscribe.ts` — Kit email subscription endpoint (keep)
- `src/components/LogoAnimated.astro` — animated "47" logo with scramble effect
- `src/layouts/BaseLayout.astro` — HTML shell (meta, fonts, scroll reveal)
- `src/styles/main.css` — full design system (tokens, component CSS, animations)
- `src/scripts/` — scroll-reveal, nav-scroll, copy-to-clipboard

## Design System (main.css)

- Light-first. Body: Geist. Headlines: Geist. Mono: Geist Mono. Accent: amber `#fcaa2d`.
- Warm gray neutrals (not pure gray). `--color-bg: #fffef2`.
- Component patterns defined in CSS: `.hero`, `.proof-bar`, `.credibility`, `.directory`, `.rupture` (dark inversion), `.product`, `.cta`, `.btn-signal`, `.email-signup`, `.email-form`, `.faq-item`.
- Scroll reveal: `[data-reveal]`, `[data-reveal-child]`, `[data-section]`, `[data-animate]`.

## Commands

```bash
npm run dev      # localhost:4321+
npm run build
npm run preview
```

## Environment

`KIT_API_KEY` for subscribe endpoint.

## Conventions

- Guard double-init with `data-initialized` attribute
- State classes: `.is-visible`, `.is-loading`, `.is-success`, `.is-error`
- `[data-*]` attributes for JS targeting
- Footer attribution: `ctrlswing`, not `jackson`
- Email framing: "Join the community", not "Subscribe to the newsletter"
- No MCP, no PaidBrief, no "tool calls" or "API" in user-facing copy
