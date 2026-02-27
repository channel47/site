# Homepage Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert channel47.dev from a tool registry into a newsletter landing page with searchable tool list as proof-of-work.

**Architecture:** Rewrite `index.astro` as hero (headline + email form) → search input → flat tool card list → footer. Strip Nav to logo-only. Rewrite ToolCard as full-width row. Add `/coming-soon` page. No new dependencies.

**Tech Stack:** Astro 5, Tailwind CSS v4, vanilla JS (client-side search filter)

---

### Task 1: Strip Nav to Logo Only

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('Nav contains only logo link, no other nav links', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const navPath = resolve(__dirname, '../src/components/Nav.astro');
  const source = await readFile(navPath, 'utf8');

  // Logo link should exist
  assert.match(source, /href="\/"/);
  // No Notes or Labs links
  assert.doesNotMatch(source, /href="\/notes"/);
  assert.doesNotMatch(source, /href="\/labs"/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — Nav currently has `/notes` and `/labs` links.

**Step 3: Rewrite Nav.astro**

Replace entire content of `src/components/Nav.astro` with:

```astro
---
import LogoAnimated from './LogoAnimated.astro';
---

<nav class="fixed top-0 inset-x-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[12px] border-b border-gray-200" aria-label="Main navigation">
  <div class="w-full max-w-[1060px] flex items-center px-8 py-4">
    <a href="/" class="inline-flex focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 rounded-sm" aria-label="Channel 47 home">
      <LogoAnimated />
    </a>
  </div>
</nav>
```

Note: Remove `Props` interface and `currentPath` prop — no longer needed.

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Verify no build errors**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds. Check for any pages passing `currentPath` to `<Nav>` and remove those props.

**Step 6: Commit**

```bash
git add src/components/Nav.astro tests/homepage.test.mjs
git commit -m "feat: strip Nav to logo only"
```

---

### Task 2: Update Footer Links

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('Footer has Notes, Labs, Subscribe links', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const footerPath = resolve(__dirname, '../src/components/Footer.astro');
  const source = await readFile(footerPath, 'utf8');

  assert.match(source, /href="\/notes"/);
  assert.match(source, /href="\/labs"/);
  assert.match(source, /href="\/subscribe"/);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: PASS (footer already has all three links). If it passes, skip to step 5 — footer already matches.

**Step 3: Update footer nav links if needed**

The current footer already has Notes, Labs, and Subscribe. Verify the links match the design. No changes expected unless link order needs adjusting.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Footer.astro tests/homepage.test.mjs
git commit -m "test: add footer link assertions"
```

---

### Task 3: Rewrite ToolCard as Full-Width Row

**Files:**
- Modify: `src/components/ToolCard.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('ToolCard renders as full-width row with name, description, and type badge', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const cardPath = resolve(__dirname, '../src/components/ToolCard.astro');
  const source = await readFile(cardPath, 'utf8');

  // Should NOT have grid card classes
  assert.doesNotMatch(source, /grid-cols/);
  // Should have full-width layout indicators
  assert.match(source, /data-type/);
  // Should have data attributes for search filtering
  assert.match(source, /data-name/);
  assert.match(source, /data-description/);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — current ToolCard doesn't have `data-name` or `data-description`.

**Step 3: Rewrite ToolCard.astro**

Replace entire content of `src/components/ToolCard.astro` with:

```astro
---
interface Props {
  name: string;
  description: string;
  type: 'skill' | 'mcp' | 'subagent' | 'plugin';
  repo?: string;
}

const { name, description, type, repo } = Astro.props;

const typeLabels: Record<string, string> = {
  skill: 'SKILL',
  mcp: 'MCP',
  subagent: 'SUBAGENT',
  plugin: 'PLUGIN',
};

const href = repo || '/coming-soon';
const isExternal = !!repo;
---

<a
  href={href}
  target={isExternal ? '_blank' : undefined}
  rel={isExternal ? 'noopener' : undefined}
  class="tool-card block py-4 border-b border-gray-200 cursor-pointer transition-colors duration-100 hover:bg-gray-50/50"
  data-type={type}
  data-name={name.toLowerCase()}
  data-description={description.toLowerCase()}
>
  <div class="flex items-start justify-between gap-4">
    <div class="min-w-0">
      <h3 class="font-mono text-sm text-primary">{name}</h3>
      <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide mt-1">{description}</p>
    </div>
    <span class="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-amber bg-[var(--amber-dim)] px-2 py-0.5 rounded-tight shrink-0 mt-0.5">
      {typeLabels[type]}
    </span>
  </div>
</a>
```

Note: Removed `author`, `source`, `tags`, `featured` props — no longer displayed. Added `data-name` and `data-description` for client-side search. Cards without a repo link to `/coming-soon`.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ToolCard.astro tests/homepage.test.mjs
git commit -m "feat: rewrite ToolCard as full-width row"
```

---

### Task 4: Create Paid Briefs Card Component

**Files:**
- Create: `src/components/PaidBriefsCard.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('PaidBriefsCard exists with correct structure', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const cardPath = resolve(__dirname, '../src/components/PaidBriefsCard.astro');
  const source = await readFile(cardPath, 'utf8');

  assert.match(source, /paidbriefs\.com/);
  assert.match(source, /PRODUCT/);
  assert.match(source, /border-dashed/);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — file doesn't exist.

**Step 3: Create PaidBriefsCard.astro**

Create `src/components/PaidBriefsCard.astro`:

```astro
---
/**
 * PaidBriefsCard — featured product card for Paid Briefs.
 * Visually distinct from tool cards: dashed amber border.
 */
---

<a
  href="https://paidbriefs.com"
  target="_blank"
  rel="noopener"
  class="block py-4 px-4 -mx-4 border border-dashed border-amber/30 rounded-md cursor-pointer transition-colors duration-100 hover:border-amber/50 hover:bg-gray-50/30"
  data-type="product"
  data-name="paid briefs"
  data-description="ai-powered google ads briefs catch wasted spend"
>
  <div class="flex items-start justify-between gap-4">
    <div class="min-w-0">
      <h3 class="font-mono text-sm text-primary">Paid Briefs</h3>
      <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide mt-1">AI-powered Google Ads briefs. Catch wasted spend automatically.</p>
    </div>
    <span class="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-amber bg-[var(--amber-dim)] px-2 py-0.5 rounded-tight shrink-0 mt-0.5">
      PRODUCT
    </span>
  </div>
</a>
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/PaidBriefsCard.astro tests/homepage.test.mjs
git commit -m "feat: add PaidBriefsCard component"
```

---

### Task 5: Create /coming-soon Page

**Files:**
- Create: `src/pages/coming-soon.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('coming-soon page exists with email signup', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pagePath = resolve(__dirname, '../src/pages/coming-soon.astro');
  const source = await readFile(pagePath, 'utf8');

  assert.match(source, /EmailSignup/);
  assert.match(source, /coming-soon/i);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — file doesn't exist.

**Step 3: Create coming-soon.astro**

Create `src/pages/coming-soon.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LogoAnimated from '../components/LogoAnimated.astro';
import EmailSignup from '../components/EmailSignup.astro';
---

<BaseLayout
  title="Coming Soon — Channel 47"
  description="This tool isn't public yet. Subscribe to get notified when it ships."
>
  <main id="main-content" class="min-h-dvh flex items-center p-[clamp(24px,5vw,64px)]">
    <div class="flex flex-col items-start max-w-[480px] w-full">
      <a href="/" class="mb-8" aria-label="Back to Channel 47">
        <LogoAnimated />
      </a>
      <div class="w-10 h-0.5 bg-amber mb-6" aria-hidden="true"></div>
      <p class="label mb-4">COMING SOON</p>
      <h1 class="font-mono text-sm font-normal leading-relaxed text-gray-600 max-w-[38ch] mb-12">This tool isn't public yet. Subscribe and you'll be first to know when it ships.</h1>
      <div class="w-full">
        <EmailSignup
          placeholder="you@domain.com"
          tag="coming-soon"
          submitText="Notify me"
        />
      </div>
    </div>
  </main>
</BaseLayout>
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/pages/coming-soon.astro tests/homepage.test.mjs
git commit -m "feat: add /coming-soon page with email capture"
```

---

### Task 6: Rewrite Homepage (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

This is the largest task. It replaces the entire homepage.

**Step 1: Rewrite the homepage test**

Replace content of `tests/homepage.test.mjs` with all accumulated tests plus homepage-specific assertions:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('Nav contains only logo link, no other nav links', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Nav.astro'), 'utf8');
  assert.match(source, /href="\/"/);
  assert.doesNotMatch(source, /href="\/notes"/);
  assert.doesNotMatch(source, /href="\/labs"/);
});

test('Footer has Notes, Labs, Subscribe links', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Footer.astro'), 'utf8');
  assert.match(source, /href="\/notes"/);
  assert.match(source, /href="\/labs"/);
  assert.match(source, /href="\/subscribe"/);
});

test('ToolCard renders as full-width row with search data attributes', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/ToolCard.astro'), 'utf8');
  assert.doesNotMatch(source, /grid-cols/);
  assert.match(source, /data-type/);
  assert.match(source, /data-name/);
  assert.match(source, /data-description/);
});

test('PaidBriefsCard exists with correct structure', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/PaidBriefsCard.astro'), 'utf8');
  assert.match(source, /paidbriefs\.com/);
  assert.match(source, /PRODUCT/);
  assert.match(source, /border-dashed/);
});

test('coming-soon page exists with email signup', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/coming-soon.astro'), 'utf8');
  assert.match(source, /EmailSignup/);
});

test('homepage has hero with email signup, search input, and tool list', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/index.astro'), 'utf8');

  // Has hero section
  assert.match(source, /data-section="hero"/);
  // Has EmailSignup in hero
  assert.match(source, /EmailSignup/);
  // Has search input
  assert.match(source, /id="tool-search"/);
  // Has tool list section
  assert.match(source, /id="tool-list"/);
  // Has PaidBriefsCard
  assert.match(source, /PaidBriefsCard/);
  // Does NOT have filter tabs
  assert.doesNotMatch(source, /id="filter-tabs"/);
  // Does NOT have featured grid
  assert.doesNotMatch(source, /id="featured-grid"/);
  // Does NOT have email rupture section (light background)
  assert.doesNotMatch(source, /bg-\[#f5f3ef\]/);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — homepage still has filter-tabs, featured-grid, etc.

**Step 3: Rewrite index.astro**

Replace entire content of `src/pages/index.astro` with:

```astro
---
/**
 * Homepage — Newsletter landing page with tool list as proof-of-work.
 *
 * Structure: Hero (headline + email) → Search → Tool cards → Footer
 */
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import EmailSignup from '../components/EmailSignup.astro';
import ToolCard from '../components/ToolCard.astro';
import PaidBriefsCard from '../components/PaidBriefsCard.astro';

const allTools = await getCollection('tools');
const toolCount = allTools.length;

// Insert Paid Briefs card roughly mid-list
const midpoint = Math.floor(allTools.length / 2);

const schema = [
  {
    '@type': 'Organization',
    'name': 'Channel 47',
    'url': 'https://channel47.dev',
    'logo': 'https://channel47.dev/og-image.png',
    'description': 'AI tools built from real work. Skills, MCP servers, and plugins for Claude Code.',
    'founder': {
      '@type': 'Person',
      'name': 'Jackson Dean',
      'url': 'https://x.com/ctrlswing',
    },
    'sameAs': [
      'https://github.com/channel47',
      'https://x.com/ctrlswing',
      'https://github.com/ctrlswing',
      'https://www.linkedin.com/in/jackson-d-9979a7a0/',
    ],
  },
  {
    '@type': 'WebSite',
    'name': 'Channel 47',
    'url': 'https://channel47.dev',
  },
];
---

<BaseLayout
  title="Channel 47 — AI Tools Built from Real Work"
  description="New tools and breakdowns every week. Skills, MCP servers, and plugins for Claude Code. Subscribe to Build Notes."
  schema={schema}
>
  <Nav />

  <main id="main-content">
    <!-- ═══════════════════════════════════════════
         HERO — Headline + email capture
         ═══════════════════════════════════════════ -->
    <section class="pt-32 pb-16 px-[clamp(24px,5vw,64px)]" data-section="hero">
      <div class="max-w-[1060px] mx-auto">
        <h1 class="font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-tight leading-[1.1] mb-3" style="font-family: var(--font-family-heading);">
          <span class="text-primary">AI tools</span>
          <span class="text-gray-600"> built from real work.</span>
        </h1>
        <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide max-w-[520px] mb-8">
          New tools and breakdowns every week. Subscribe to Build Notes.
        </p>
        <EmailSignup placeholder="you@domain.com" tag="home" submitText="Subscribe" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         SEARCH + TOOL LIST — Proof of work
         ═══════════════════════════════════════════ -->
    <section class="px-[clamp(24px,5vw,64px)] pb-16" data-animate="fade-up">
      <div class="max-w-[1060px] mx-auto">
        <div class="border-t border-gray-200 pt-8 mb-6">
          <label for="tool-search" class="sr-only">Search tools</label>
          <input
            type="text"
            id="tool-search"
            placeholder="Search tools..."
            class="w-full px-4 h-12 font-mono text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md outline-none transition-[border-color,box-shadow] duration-100 placeholder:text-gray-500 hover:border-gray-400 focus-visible:border-amber focus-visible:shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <p class="font-mono text-[11px] text-gray-500 mb-6">{toolCount} tools shipped</p>

        <div id="tool-list">
          {allTools.map((tool, i) => (
            <Fragment>
              {i === midpoint && <PaidBriefsCard />}
              <ToolCard
                name={tool.data.name}
                description={tool.data.description}
                type={tool.data.type}
                repo={tool.data.repo}
              />
            </Fragment>
          ))}
          {allTools.length <= midpoint && <PaidBriefsCard />}
        </div>

        <p id="no-results" class="font-mono text-sm text-gray-500 py-8 hidden">No tools match your search.</p>
      </div>
    </section>

    <Footer />
  </main>

  <script>
    import { initPageMotion } from '../scripts/page-motion';
    initPageMotion();
  </script>

  <!-- Search filter logic -->
  <script>
    function initSearch() {
      const input = document.getElementById('tool-search') as HTMLInputElement;
      const list = document.getElementById('tool-list');
      const noResults = document.getElementById('no-results');
      if (!input || !list) return;

      const cards = list.querySelectorAll('[data-name]');

      input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
          const name = card.getAttribute('data-name') || '';
          const desc = card.getAttribute('data-description') || '';
          const type = card.getAttribute('data-type') || '';
          const matches = !query || name.includes(query) || desc.includes(query) || type.includes(query);
          (card as HTMLElement).style.display = matches ? '' : 'none';
          if (matches) visibleCount++;
        });

        // Show/hide Paid Briefs card based on search
        const pbCard = list.querySelector('[data-type="product"]') as HTMLElement;
        if (pbCard) {
          const pbName = pbCard.getAttribute('data-name') || '';
          const pbDesc = pbCard.getAttribute('data-description') || '';
          const pbMatches = !query || pbName.includes(query) || pbDesc.includes(query) || 'product'.includes(query);
          pbCard.style.display = pbMatches ? '' : 'none';
          if (pbMatches) visibleCount++;
        }

        if (noResults) {
          noResults.classList.toggle('hidden', visibleCount > 0);
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSearch);
    } else {
      initSearch();
    }
    document.addEventListener('astro:page-load', initSearch);
  </script>
</BaseLayout>
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds. Check for any TypeScript errors related to removed ToolCard props.

**Step 6: Commit**

```bash
git add src/pages/index.astro tests/homepage.test.mjs
git commit -m "feat: rewrite homepage as newsletter landing page with tool list"
```

---

### Task 7: Clean Up Unused Code

**Files:**
- Modify: `src/styles/main.css` (optional — remove unused `.hero`, `.stats`, `.cta` component styles if no other page uses them)
- Verify: No other pages reference removed ToolCard props (`author`, `source`, `tags`, `featured`)

**Step 1: Check for other ToolCard usages**

Run: `grep -r "ToolCard" src/pages/ src/components/ --include="*.astro"` to verify only `index.astro` uses it. If other pages use ToolCard with old props, update those calls.

**Step 2: Check for other Nav usages with currentPath**

Run: `grep -r "currentPath" src/ --include="*.astro"` to find any pages still passing `currentPath` to Nav. Remove those props.

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no warnings about unused props.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused props and references"
```

---

### Task 8: Update Site CLAUDE.md

**Files:**
- Modify: `/Users/jackson/Documents/a_projects/ch47/site/CLAUDE.md`

**Step 1: Update the Pages section**

Update the pages list to reflect new routes:
- `/` — Homepage: newsletter landing + searchable tool list
- Remove description of filter tabs
- Add `/coming-soon` — Shared empty state with email signup

**Step 2: Update Key Files section**

Update ToolCard description. Add PaidBriefsCard. Add coming-soon.astro.

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for homepage redesign"
```

---

### Task 9: Visual Verification

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Check homepage**

Open `http://localhost:4321` and verify:
- Nav shows only logo
- Hero shows two-tone headline + email form
- Search input filters tool list in real-time
- Tool cards are full-width rows (name + description + badge)
- Paid Briefs card appears mid-list with dashed amber border
- Footer has Notes | Labs | Subscribe + social links

**Step 3: Check /coming-soon**

Open `http://localhost:4321/coming-soon` and verify:
- Logo + "Coming Soon" label + email form
- Matches `/subscribe` page aesthetic

**Step 4: Check mobile**

Resize to 375px width. Verify layout doesn't break.

**Step 5: Run final build**

Run: `npm run build && npm run preview`
Expected: Build succeeds, preview matches dev.

**Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: visual polish from manual testing"
```
