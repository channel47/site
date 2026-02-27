# CH47 Homepage Redesign

**Date:** 2026-02-26
**Status:** Approved
**Goal:** Convert channel47.dev from a tool registry into a newsletter landing page.

## Problem

The current registry homepage (filter tabs, featured strip, card grid) is overbuilt for 27 tools. It optimizes for browsing when the real goal is email capture. The site needs one job: convert visitors to Build Notes subscribers.

## Design

### Page Structure

```
NAV:    [47 logo]
HERO:   Headline + subline + email form
SEARCH: Filter-as-you-type input
TOOLS:  Full-width stacked cards (name + one-liner + type badge)
        Paid Briefs featured card mixed in
FOOTER: Notes | Labs | Subscribe | Social
```

### Nav

- Logo only. Animated ASCII "47" with scramble effect.
- Fixed position, glass background.
- No other links.

### Hero

- Two-tone headline: key phrase in `--color-primary` (#f5f5f4), context in `--color-gray-600` (#a8a29e). Space Grotesk.
- One-sentence subline. JetBrains Mono.
- Inline email capture form: input + button on the same row.
- No stats, badges, or secondary content.
- Single email form on the page (no repeat CTA below).

### Search

- Full-width text input below hero section.
- Client-side filter-as-you-type against tool name, description, and type.
- JetBrains Mono placeholder text.
- Filters the card list in real-time.

### Tool Cards

- Full-width, stacked vertically. One card per row.
- Each card shows:
  - Tool name (left-aligned, `--color-primary`)
  - One-liner description (below name, `--color-gray-600`)
  - Type badge (right-aligned): SKILL | MCP | PLUGIN | SUBAGENT
- Cards with a GitHub repo: link opens repo in new tab.
- Cards without a repo: link goes to `/coming-soon` page.
- Minimal interaction — subtle cursor change on hover, no lift/glow.

### Paid Briefs Card

- Visually distinct variant among the tool cards.
- Dashed amber border (`--color-amber` #f59e0b).
- Shows "PRODUCT" badge instead of tool type.
- Links to paidbriefs.com (external).
- Positioned mid-list (not first, not last).

### Footer

- Three groups:
  - Content: Notes | Labs | Subscribe
  - Social: X | GitHub | LinkedIn
  - Copyright: Channel 47
- `--color-gray-600` text on dark background.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage (described above) |
| `/notes` | Build Notes archive (unchanged) |
| `/notes/[slug]` | Individual note (unchanged) |
| `/labs` | Skills Labs landing (unchanged) |
| `/coming-soon` | Shared empty state: "This tool isn't public yet" + email form |
| `/subscribe` | Standalone subscribe page (unchanged) |
| `/api/subscribe` | Kit API proxy (unchanged) |

### Removed Routes

All 301 redirect to `/`: `/tools`, `/ecosystem`, `/plugins`, `/build`, `/hire`

## What Changes

- Homepage layout: registry grid replaced with newsletter landing + flat tool list
- Nav: stripped to logo only
- ToolCard component: grid card becomes full-width row
- Remove: filter tabs, featured strip, category system, grid layout
- Add: search input with client-side filtering
- Add: Paid Briefs featured card variant
- Add: `/coming-soon` page

## What Stays

- All design tokens (colors, typography, radius, motion) in Tailwind v4 `@theme`
- Tools content collection (markdown frontmatter schema)
- Email capture via Kit API proxy (`/api/subscribe`)
- BaseLayout wrapper
- /notes and /labs pages
- Existing redirects for removed routes
