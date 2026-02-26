# Channel 47 Site

Astro 5 → channel47.dev via Vercel. Static output + one serverless endpoint (`api/subscribe.ts`).

## Commands

```bash
npm run dev      # localhost:4321+
npm run build
npm run preview  # Preview build output locally
npm test         # node --test
```

Tests use `node:test` (no framework). Test files in `tests/`.

## Strategy Docs

- `.claude/product-marketing-context.md` — single source of truth for positioning, competitive landscape, audience, differentiation, messaging, voice, proof points, metrics

## Environment

`KIT_API_KEY` required for subscribe endpoint. `PUBLIC_GA_*` / `PUBLIC_META_*` for analytics.

## Pages

- `/` — Homepage / tool registry with filter tabs
- `/notes` — Build Notes hub (content collection index)
- `/notes/[slug]` — Individual note articles (dynamic route from `src/content/notes/`)
- `/labs` — Skills Labs landing page (monthly live builds → Skool community)
- `/subscribe` — Email signup standalone page
- `/api/subscribe` — POST, proxies to Kit API. Accepts optional `fields` object for custom Kit fields.
- `/ecosystem`, `/tools`, `/build`, `/hire` — 301 redirects to `/`

## Key Files

```
src/
├── layouts/
│   └── BaseLayout.astro          # Default layout (meta, fonts, scroll reveal)
├── pages/
│   ├── index.astro               # Homepage — tool registry with filter tabs
│   ├── labs.astro                 # Skills Labs
│   ├── subscribe.astro           # Email signup
│   ├── notes/index.astro         # Build Notes hub
│   ├── notes/[...slug].astro     # Article page
│   └── api/subscribe.ts          # Kit API proxy (serverless)
├── styles/
│   └── main.css                  # Single CSS entry — Tailwind v4 @theme tokens,
│                                 #   @layer components, keyframes, scroll reveal
├── components/
│   ├── Nav.astro                 # Fixed glass nav bar
│   ├── Footer.astro              # Site footer
│   ├── EmailSignup.astro         # Email capture form (JS state handling)
│   ├── ContentCard.astro         # Note card for grid
│   ├── ToolCard.astro            # Tool card for registry
│   ├── ui/button.tsx             # shadcn/ui Button (React)
│   └── ui/input.tsx              # shadcn/ui Input (React)
├── content/
│   ├── notes/                    # Published web notes (markdown, `notes` collection)
│   ├── tools/                    # Tool registry entries (YAML, `tools` collection)
│   └── newsletters/              # Newsletter drafts (markdown)
└── scripts/
    └── page-motion.js            # IntersectionObserver scroll reveal
```

## Subscribe API

`POST /api/subscribe` proxies to Kit. Accepts JSON or form-encoded.

- `email` (required) — subscriber email
- `tag` (optional) — applies a Kit tag prefixed `ch47-` (e.g., `"home"` → `ch47-home`)
- `fields` (optional) — custom Kit fields. Allowed keys: `name`, `scope`, `brief`, `budget`, `build_role`, `build_task`, `build_tool`

## CSS

Tailwind CSS v4 via `@tailwindcss/vite`. Single entry point: `src/styles/main.css`.

- `@theme` block defines the design token system: warm gray scale, amber accent, font families, radius, animations
- `@layer components` for shared patterns: `.label`, `.wrap`, `.prose`, `.hero`, `.stats`, `.cta`, `.accent-bar`
- Scoped `<style>` blocks for component-specific CSS (animation triggers, JS state classes, `:global()` overrides)
- Body text is JetBrains Mono (mono-first is intentional). Single accent: amber `#F59E0B`
- shadcn/ui semantic tokens (`background`, `foreground`, `ring`, etc.) defined in `@theme` for React component compatibility

## Scroll Reveals (two layers)

1. **Section-level**: `data-section="name"` + IO (threshold 0.15). Adds `.is-visible`. Hero gets it immediately via JS, not IO.
2. **Element-level**: `BaseLayout` observes `[data-animate]` (threshold 0.1). One-time trigger. Stagger with `data-stagger="1..12"`.

## Component Conventions

- Guard double-init with `data-initialized` attribute
- State classes: `.is-visible`, `.is-loading`, `.is-success`, `.is-error`, `.is-server-error`
- Prefer `[data-*]` attributes over classes for JS targeting
- Vanilla JS for Astro components, React for shadcn/ui components

## Gotchas

- **`:global()` required** for cross-component ancestor selectors in scoped styles
- **Newsletter content** lives in `src/content/newsletters/` as markdown with frontmatter (`title`, `date`, `status`, `kit_broadcast_id`)
- **Gray scale is inverted** — `gray-0` is black, `gray-700` is near-white. Dark-first design.
