# Directory Site Structure Design

**Goal:** Restructure channel47.dev from a newsletter landing page into a marketing AI directory — a registry of skills, MCPs, and plugins for marketers, with individual detail pages as the SEO engine. Inspired by playbooks.com and skills.sh. Simple on the surface, intentional underneath.

**Model:** Newsletter + directory hybrid (Approach C). The tool list IS the product. The newsletter is the capture mechanism. Hub-and-spoke SEO architecture with detail pages as the traffic targets.

**Taxonomy:** Skills / MCPs / Plugins

**Design system:** No changes. Mono font (JetBrains Mono), amber accent (#F59E0B), dark-first, existing CSS tokens. No new dependencies.

---

## Page Architecture

```
/                      Homepage — hero + newsletter bar + directory (all types)
/skills/               Skills hub — filtered listing, SEO-optimized
/skills/[slug]         Skill detail page
/mcps/                 MCPs hub — filtered listing, SEO-optimized
/mcps/[slug]           MCP detail page
/plugins/              Plugins hub — filtered listing, SEO-optimized
/plugins/[slug]        Plugin detail page
/privacy               Privacy policy (required for Kit email collection + Google Ads OAuth)
/notes/                Build Notes (existing, unchanged)
/notes/[slug]          Individual note (existing, unchanged)
/coming-soon           Placeholder for unreleased tools (existing, unchanged)
/subscribe             Standalone signup (existing, unchanged)
```

---

## Homepage (`/`)

```
┌──────────────────────────────────────────────┐
│  [Logo]                          [Subscribe] │  ← minimal nav
├──────────────────────────────────────────────┤
│  The marketing AI directory.                 │  ← headline (h1)
│                                              │
│  New tools and breakdowns weekly.            │  ← newsletter bar
│  [you@domain.com] [Subscribe]                │     compact
├──────────────────────────────────────────────┤
│  [All] [Skills] [MCPs] [Plugins]  🔍 Search  │  ← filter tabs + search
├──────────────────────────────────────────────┤
│  27 tools shipped                            │
│                                              │
│  ┌─ Tool Row ─────────────────────── SKILL ┐ │
│  │  Content Miner                          │ │  ← links to /skills/content-miner
│  │  Extract high-signal content from...    │ │
│  ├─ Tool Row ──────────────────────── MCP ─┤ │
│  │  Google Ads MCP                         │ │  ← links to /mcps/google-ads-mcp
│  │  Full Google Ads API access from...     │ │
│  ├─ Paid Briefs Card ──────────── PRODUCT ─┤ │  ← featured, dashed border
│  │  AI-powered Google Ads briefs...        │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  Notes · Labs · Subscribe · Privacy          │
│  Built by ctrlswing                          │
└──────────────────────────────────────────────┘
```

### Decisions

- **`<title>`:** "Channel 47 — The Marketing AI Directory"
- **Headline:** "The marketing AI directory." — positional, four words, lets the tool list speak
- **Newsletter bar:** One line of text + inline email input. No newsletter name. "New tools and breakdowns weekly." CTA: "Subscribe"
- **Filter tabs:** [All] [Skills] [MCPs] [Plugins] — show/hide by type, "All" is default
- **Tool rows:** Each row links to its type-prefixed detail page. Full-width row with name, description, type badge.
- **Search:** Filters across name, description, and type. Client-side, vanilla JS.
- **Paid Briefs card:** Stays mid-list with dashed amber border, PRODUCT badge. Links to paidbriefs.com.
- **Tool count:** "27 tools shipped" shown above the list.
- **Footer:** Notes · Labs · Subscribe · Privacy. "Built by ctrlswing" linking to https://x.com/ctrlswing.

---

## Hub Pages (`/skills/`, `/mcps/`, `/plugins/`)

```
┌──────────────────────────────────────────────┐
│  [Logo]                          [Subscribe] │
├──────────────────────────────────────────────┤
│  Home > Skills                               │  ← breadcrumb
│                                              │
│  Marketing skills for agents.                │  ← SEO headline (h1)
│                                              │
│  🔍 Search skills                            │
├──────────────────────────────────────────────┤
│  13 skills                                   │
│                                              │
│  ┌─ Tool Row ─────────────────────── SKILL ┐ │
│  │  Content Miner                          │ │
│  │  ...                                    │ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  Notes · Labs · Subscribe · Privacy          │
│  Built by ctrlswing                          │
└──────────────────────────────────────────────┘
```

### Decisions

- **No newsletter capture** — pure utility pages
- **Hub-specific headlines and titles:**
  - `/skills/` — h1: "Marketing skills for agents." title: "Marketing Skills for Agents — Channel 47"
  - `/mcps/` — h1: "MCP servers for marketing workflows." title: "MCP Servers for Marketing Workflows — Channel 47"
  - `/plugins/` — h1: "Claude Code plugins for marketers." title: "Claude Code Plugins for Marketers — Channel 47"
- **Breadcrumb:** Home > Skills (Home links to `/`)
- **Same list component as homepage**, filtered to one type. No filter tabs needed.
- **Lightweight** — mostly reusing the homepage list component with a filtered data set and SEO-specific head tags

---

## Detail Pages (`/skills/[slug]`, `/mcps/[slug]`, `/plugins/[slug]`)

```
┌──────────────────────────────────────────────┐
│  [Logo]                          [Subscribe] │
├──────────────────────────────────────────────┤
│  Home > Skills > Content Miner               │  ← breadcrumbs
├──────────────────────────────────────────────┤
│  Content Miner                       SKILL   │  ← name + type badge
│                                              │
│  Extract high-signal content from recent     │
│  activity and package for distribution.      │
│                                              │
│  ┌─ Install ───────────────────────────────┐ │
│  │  npx skills add channel47/skills        │ │  ← copy-to-clipboard
│  │  --skill content-miner                  │ │     (command varies by type)
│  └─────────────────────────────────────────┘ │
│                                              │
│  By Jackson Dean · Source: channel47         │
│  Tags: content, distribution                 │
│  Works with: Claude Code, Cursor, Cline,     │
│  Windsurf, Codex CLI                         │
│                                              │
│  ─────────────────────────────────────────── │
│                                              │
│  Related Tools                               │  ← internal linking (SEO)
│  ┌─ Twitter Algorithm Optimizer ── SKILL ──┐ │
│  ├─ Kit Newsletter ──────────────── SKILL ─┤ │
│  └─────────────────────────────────────────┘ │
│                                              │
│  ─────────────────────────────────────────── │
│                                              │
│  New tools and breakdowns weekly.            │  ← bottom newsletter CTA
│  [you@domain.com] [Subscribe]                │
│                                              │
│  Notes · Labs · Subscribe · Privacy          │
│  Built by ctrlswing                          │
└──────────────────────────────────────────────┘
```

### Decisions

- **Install command** is the hero action. Varies by type, pulled from tool frontmatter:
  - Skills: `npx skills add channel47/skills --skill [name]`
  - MCPs: varies (npm install, manual config, etc.)
  - Plugins: `/plugin install [name]@channel47`
- **"Works with"** shows compatible agents (Skills + MCPs are cross-platform; Plugins are Claude-specific)
- **Related tools** section provides internal linking for hub-and-spoke SEO
- **Schema markup:** SoftwareApplication for rich search results
- **Newsletter CTA at bottom only** — contextual, not interruptive
- **Breadcrumbs:** Home > [Type Hub] > [Tool Name] (e.g., Home > Skills > Content Miner)

### Content Collection Updates

Tool frontmatter needs to expand from current minimal format:

```yaml
# Current
name: "Content Miner"
description: "Extract high-signal content from recent activity"
type: "skill"
author: "Jackson Dean"
source: "channel47"
tags: ["content", "distribution"]
featured: false

# New fields needed
slug: "content-miner"          # URL slug for detail page
install: "npx skills add channel47/skills --skill content-miner"
compatibleWith: ["Claude Code", "Cursor", "Cline", "Windsurf", "Codex CLI"]
relatedTools: ["twitter-algorithm-optimizer", "kit-newsletter"]
longDescription: ""            # Optional expanded description for detail page
repo: ""                       # GitHub repo URL if public
```

---

## Navigation

- **Nav:** Logo left, "Subscribe" right. That's it.
- **No type tabs in nav** — discoverable from homepage filter tabs and breadcrumbs
- **Hub pages are SEO entry points**, not primary navigation destinations

---

## Footer

```
Notes · Labs · Subscribe · Privacy

Built by ctrlswing
```

- "ctrlswing" links to https://x.com/ctrlswing
- "Privacy" links to /privacy
- Notes, Labs, Subscribe link to existing pages

---

## SEO Architecture

### Hub-and-Spoke Model

```
Homepage (/)
├── /skills/          ← hub page (ranks for "marketing skills for agents")
│   ├── /skills/content-miner
│   ├── /skills/gaql
│   ├── /skills/prompt-optimizer
│   └── ...           ← spoke pages (rank for individual tool queries)
├── /mcps/            ← hub page (ranks for "MCP servers marketing")
│   ├── /mcps/google-ads-mcp
│   ├── /mcps/bing-ads-mcp
│   └── ...
└── /plugins/         ← hub page (ranks for "Claude Code plugins marketers")
    ├── /plugins/media-buyer
    └── ...
```

- Hub pages link to all their child detail pages
- Detail pages breadcrumb back to their hub
- Detail pages link to related tools (cross-linking within and across hubs)
- Homepage links to all three hubs and all tools
- Every page reachable within 2-3 clicks from homepage

### Programmatic SEO Potential

Each detail page is an indexable URL targeting specific queries:
- "/skills/gaql" → "GAQL skill Claude Code", "Google Ads query language AI"
- "/mcps/google-ads-mcp" → "Google Ads MCP server", "Claude Google Ads API"
- "/plugins/media-buyer" → "media buyer Claude Code plugin"

As catalog grows, this scales automatically — each new tool creates a new ranking opportunity.

---

## What Doesn't Change

- `/notes/`, `/labs/`, `/subscribe` stay as-is
- Subscribe API endpoint unchanged
- Design system: mono font, amber accent, dark-first, existing CSS tokens
- No new dependencies
- Astro 5 + Tailwind CSS v4 + vanilla JS

---

## Inspiration

- **playbooks.com** — directory model, programmatic SEO at scale, sponsored placements, hub/spoke architecture
- **skills.sh** — minimal aesthetic, flat list homepage, clean detail pages, utility-first
- **ch47 brand voice** — hero is a thesis not a benefit claim, CTA is plain ("Subscribe"), restraint IS the persuasion
