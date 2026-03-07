# Channel 47 Site

Astro 5 → channel47.dev via Vercel. Static output + one serverless endpoint (`api/subscribe.ts`).

**Status: Rewrite in progress.** See `docs/site-rewrite-plan.md` for the full plan.

## Work Discipline

- **Commit after every completed task.** Don't batch. Each turn that changes files should end with a commit.
- **Update `docs/site-rewrite-plan.md`** when a task is completed, modified, or removed. Keep the plan doc current — it's the source of truth for what's done and what's left.
- Read the plan doc at the start of every session before making changes.

## Plan Doc

`docs/site-rewrite-plan.md` — covers site architecture, content strategy, page CRO, email sequence, AI SEO, launch strategy, schema markup, analytics tracking, and copywriting decisions. **Read this first.**

## Strategy Docs

- `../.claude/product-marketing-context.md` — positioning, audience, voice, competitive landscape
- `../plugins/product-marketing-context.md` — plugin-specific positioning

## Commands

```bash
npm run dev      # localhost:4321+
npm run build
npm run preview
npm test         # node --test
```

## Environment

`KIT_API_KEY` for subscribe endpoint. `PUBLIC_GA_*` / `PUBLIC_META_*` for analytics.

## CSS

Tailwind CSS v4 via `@tailwindcss/vite`. Single entry: `src/styles/main.css`.

- Dark-first design. Body text: JetBrains Mono. Headlines: Space Grotesk. Accent: amber `#F59E0B`.
- Gray scale inverted — `gray-0` is black, `gray-700` is near-white.

## Component Conventions

- Guard double-init with `data-initialized` attribute
- State classes: `.is-visible`, `.is-loading`, `.is-success`, `.is-error`, `.is-server-error`
- `[data-*]` attributes for JS targeting
- Vanilla JS for Astro components, React for shadcn/ui

## Gotchas

- **`:global()` required** for cross-component ancestor selectors in scoped styles
- **Scroll reveal** — `[data-reveal-child]` and `[data-reveal]` start at `opacity: 0`. Blank sections = reveal system.
- **Footer attribution** — `ctrlswing`, not `jackson`. Link: `https://x.com/ctrlswing`.
- **Copy vocabulary** — Read the PMC before writing any copy. No MCP, no PaidBrief, no "tool calls" or "API" in user-facing copy.
- **Email framing** — "Join the community", not "Subscribe to the newsletter."
