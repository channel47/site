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

- `/` — Landing page
- `/build` — Skill builder funnel (uses `FormPageLayout`)
- `/hire` — Consulting intake form (uses `FormPageLayout`)
- `/subscribe` — Email signup standalone page
- `/api/subscribe` — POST, proxies to Kit API. Accepts optional `fields` object for custom Kit fields.

## Key Files

```
src/
├── layouts/
│   ├── BaseLayout.astro          # Default layout (nav + footer)
│   └── FormPageLayout.astro      # Form pages (logo only, no nav/footer)
├── pages/
│   ├── index.astro               # Homepage
│   ├── build.astro               # Skill builder funnel
│   ├── hire.astro                # Consulting intake
│   ├── subscribe.astro           # Email signup
│   └── api/subscribe.ts          # Kit API proxy (serverless)
├── styles/
│   ├── design-tokens.css         # CSS custom properties
│   ├── global.css                # Base/utility styles
│   ├── sections.css              # Shared section styles (hero, stats, rupture)
│   └── form-page.css             # Form page design system (fp- prefix)
├── components/                   # Astro components
├── scripts/                      # Vanilla JS (page-motion, etc.)
└── content/
    └── newsletters/              # Newsletter drafts (markdown + frontmatter)
```

## Subscribe API

`POST /api/subscribe` proxies to Kit. Accepts JSON or form-encoded.

- `email` (required) — subscriber email
- `tag` (optional) — applies a Kit tag prefixed `ch47-` (e.g., `"home"` → `ch47-home`)
- `fields` (optional) — custom Kit fields. Allowed keys: `name`, `scope`, `brief`, `budget`, `build_role`, `build_task`, `build_tool`

Pages use these tags: `home` (homepage signup), `hire` (/hire form), `build` (/build funnel).

## CSS

Pure CSS custom properties — no Tailwind. `design-tokens.css` for variables, `global.css` for base/utilities, component `<style>` blocks are Astro-scoped. Body text is JetBrains Mono (mono-first is intentional). Single accent: amber `#F59E0B`.

## Form Page Design System

`FormPageLayout.astro` wraps form-focused pages (no nav, no footer, logo top-left). Shared styles in `form-page.css` use `fp-` prefix (e.g., `fp-step`, `fp-heading`, `fp-btn--primary`). Page-specific styles stay scoped with BEM prefix (e.g., `build__skills`, `hire__form`).

## Scroll Reveals (two layers)

1. **Section-level**: `data-section="name"` + IO (threshold 0.15). Adds `.is-visible`. Hero gets it immediately via JS, not IO.
2. **Element-level**: `BaseLayout` observes `[data-animate]` (threshold 0.1). One-time trigger. Stagger with `data-stagger="1..12"`.

## Component Conventions

- Guard double-init with `data-initialized` attribute
- State classes: `.is-visible`, `.is-loading`, `.is-success`, `.is-error`, `.is-server-error`
- Prefer `[data-*]` attributes over classes for JS targeting
- Vanilla JS only — no client frameworks

## Gotchas

- **`:global()` required** for cross-component ancestor selectors in scoped styles
- **`/build` and `/hire`** use `FormPageLayout` (logo, no nav, no footer)
- **Newsletter content** lives in `src/content/newsletters/` as markdown with frontmatter (`title`, `date`, `status`, `kit_broadcast_id`)
