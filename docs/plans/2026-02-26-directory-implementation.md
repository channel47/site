# Directory Site Structure Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure channel47.dev into a marketing AI directory with hub-and-spoke SEO architecture — homepage with filter tabs, hub pages per type, and individual detail pages for each tool.

**Architecture:** Homepage (hero + newsletter bar + filtered tool list) → Hub pages (`/skills/`, `/mcps/`, `/plugins/`) → Detail pages (`/skills/[slug]`, `/mcps/[slug]`, `/plugins/[slug]`). Reuses existing ToolCard and EmailSignup components. New Breadcrumbs component for navigation. Content collection schema extended with `compatibleWith` and `relatedTools` fields.

**Tech Stack:** Astro 5, Tailwind CSS v4, vanilla JS (client-side filtering), existing design tokens

---

### Task 1: Update Content Collection Schema

**Files:**
- Modify: `src/content/config.ts`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('tools schema supports compatibleWith and relatedTools fields', async () => {
  const source = await readFile(resolve(__dirname, '../src/content/config.ts'), 'utf8');
  assert.match(source, /compatibleWith/);
  assert.match(source, /relatedTools/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — config.ts doesn't have those fields yet.

**Step 3: Update the schema**

In `src/content/config.ts`, replace the `tools` collection schema with:

```typescript
const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['skill', 'mcp', 'subagent', 'plugin']),
    author: z.string(),
    source: z.enum(['channel47', 'curated', 'community']),
    repo: z.string().url().optional(),
    install: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    compatibleWith: z.array(z.string()).default([]),
    relatedTools: z.array(z.string()).default([]),
  }),
});
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Run build to verify no errors**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/content/config.ts tests/homepage.test.mjs
git commit -m "feat: add compatibleWith and relatedTools to tools schema"
```

---

### Task 2: Update Tool Content Files

**Files:**
- Modify: All files in `src/content/tools/skills/`, `src/content/tools/mcps/`, `src/content/tools/plugins/`

Add `install` and `compatibleWith` fields to each tool's frontmatter. Leave `relatedTools` empty for now (will populate later).

**Step 1: Update all skill files**

Default `compatibleWith` for skills: `["Claude Code", "Cursor", "Cline", "Windsurf", "Codex CLI"]`

For each file in `src/content/tools/skills/`, add these fields to the frontmatter (before the closing `---`):

| File | install |
|------|---------|
| `content-miner.md` | `npx skills add channel47/skills --skill content-miner` |
| `context7.md` | `npx skills add vercel-labs/skills --skill context7` |
| `firecrawl-skill.md` | _(leave empty — check actual repo)_ |
| `image-gen.md` | _(leave empty — check actual repo)_ |
| `kit.md` | `npx skills add channel47/skills --skill kit-newsletter` |
| `morning-brief.md` | _(leave empty)_ |
| `platform-setup.md` | _(leave empty)_ |
| `pmax-decoder.md` | _(leave empty)_ |
| `prompt-optimizer.md` | `npx skills add channel47/skills --skill prompt-optimizer` |
| `search-term-verdict.md` | _(leave empty)_ |
| `strategic-advisor.md` | _(leave empty)_ |
| `twitter-algorithm-optimizer.md` | `npx skills add channel47/skills --skill twitter-algorithm-optimizer` |
| `waste-detector.md` | _(leave empty)_ |

Example edit for `content-miner.md` — add before closing `---`:
```yaml
install: "npx skills add channel47/skills --skill content-miner"
compatibleWith: ["Claude Code", "Cursor", "Cline", "Windsurf", "Codex CLI"]
relatedTools: []
```

**Step 2: Update all MCP files**

Default `compatibleWith` for MCPs: `["Claude Code", "Cursor", "Cline", "Windsurf", "Codex CLI"]`

For each file in `src/content/tools/mcps/`, add `compatibleWith` and empty `relatedTools`. Leave `install` empty unless already set.

**Step 3: Update all plugin files**

Default `compatibleWith` for plugins: `["Claude Code"]`

For each file in `src/content/tools/plugins/`, add `compatibleWith` and empty `relatedTools`. Plugins use: `install: "/plugin install media-buyer@channel47"` (media-buyer already has this).

**Step 4: Run build to verify no schema errors**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds with no content collection validation errors.

**Step 5: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/content/tools/
git commit -m "feat: add install and compatibleWith to all tool content"
```

---

### Task 3: Update Nav — Add Subscribe Link

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Update the Nav test**

In `tests/homepage.test.mjs`, update the Nav test:

```js
test('Nav has logo and Subscribe link', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Nav.astro'), 'utf8');
  assert.match(source, /href="\/"/);
  assert.match(source, /href="\/subscribe"/);
  assert.doesNotMatch(source, /href="\/notes"/);
  assert.doesNotMatch(source, /href="\/labs"/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — Nav doesn't have /subscribe link.

**Step 3: Update Nav.astro**

Replace the content of `src/components/Nav.astro` with:

```astro
---
import LogoAnimated from './LogoAnimated.astro';
---

<nav class="fixed top-0 inset-x-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[12px] border-b border-gray-200" aria-label="Main navigation">
  <div class="w-full max-w-[1060px] flex items-center justify-between px-8 py-4">
    <a href="/" class="inline-flex focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 rounded-sm" aria-label="Channel 47 home">
      <LogoAnimated />
    </a>
    <a href="/subscribe" class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-gray-500 hover:text-amber transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 rounded-sm">Subscribe</a>
  </div>
</nav>
```

Note: Changed `justify-center` on inner div to `justify-between` to push logo left and Subscribe right.

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/components/Nav.astro tests/homepage.test.mjs
git commit -m "feat: add Subscribe link to Nav"
```

---

### Task 4: Update Footer

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Update the Footer test**

In `tests/homepage.test.mjs`, replace the Footer test:

```js
test('Footer has Notes, Labs, Subscribe, Privacy links and ctrlswing attribution', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Footer.astro'), 'utf8');
  assert.match(source, /href="\/notes"/);
  assert.match(source, /href="\/labs"/);
  assert.match(source, /href="\/subscribe"/);
  assert.match(source, /href="\/privacy"/);
  assert.match(source, /ctrlswing/);
  // No longer imports SocialLinks
  assert.doesNotMatch(source, /SocialLinks/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — Footer doesn't have /privacy link, still imports SocialLinks.

**Step 3: Rewrite Footer.astro**

Replace the entire content of `src/components/Footer.astro` with:

```astro
---
/**
 * Footer — minimal site footer.
 * Links row + attribution.
 */
const { class: className, ...props } = Astro.props;

const links = [
  { name: 'Notes', href: '/notes' },
  { name: 'Labs', href: '/labs' },
  { name: 'Subscribe', href: '/subscribe' },
  { name: 'Privacy', href: '/privacy' },
];
---

<footer class:list={["border-t border-gray-200 px-[clamp(24px,5vw,64px)]", className]} {...props}>
  <div class="max-w-[1060px] mx-auto font-mono text-xs text-gray-500">
    <nav class="flex items-center gap-3 py-5 border-b border-gray-200 flex-wrap" aria-label="Site links">
      {links.map((link, i) => (
        <Fragment>
          {i > 0 && <span class="w-px h-3 bg-gray-300 shrink-0" aria-hidden="true"></span>}
          <a href={link.href} class="text-gray-500 tracking-wide hover:text-amber transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 rounded-sm">{link.name}</a>
        </Fragment>
      ))}
    </nav>
    <div class="py-5">
      <span>
        Built by
        <a href="https://x.com/ctrlswing" target="_blank" rel="noopener" class="text-gray-500 hover:text-amber transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-gray-0 rounded-sm">ctrlswing</a>
      </span>
    </div>
  </div>
</footer>
```

Note: Removed SocialLinks import, CH47 scramble mark, and all associated script/style. Simplified to links + attribution.

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Run build to verify no errors**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/components/Footer.astro tests/homepage.test.mjs
git commit -m "feat: simplify Footer to links + ctrlswing attribution"
```

---

### Task 5: Create Breadcrumbs Component

**Files:**
- Create: `src/components/Breadcrumbs.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('Breadcrumbs component exists with correct structure', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Breadcrumbs.astro'), 'utf8');
  assert.match(source, /nav/);
  assert.match(source, /aria-label="Breadcrumb"/);
  assert.match(source, /items/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — file doesn't exist.

**Step 3: Create Breadcrumbs.astro**

Create `src/components/Breadcrumbs.astro`:

```astro
---
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const { items } = Astro.props;
---

<nav aria-label="Breadcrumb" class="font-mono text-xs text-gray-500 mb-6">
  <ol class="flex items-center gap-1.5 list-none p-0 m-0">
    {items.map((item, i) => (
      <li class="flex items-center gap-1.5">
        {i > 0 && <span aria-hidden="true" class="text-gray-400">&gt;</span>}
        {item.href ? (
          <a href={item.href} class="text-gray-500 hover:text-amber transition-colors duration-100">{item.label}</a>
        ) : (
          <span class="text-gray-400">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/components/Breadcrumbs.astro tests/homepage.test.mjs
git commit -m "feat: add Breadcrumbs component"
```

---

### Task 6: Update ToolCard — Accept href Prop

**Files:**
- Modify: `src/components/ToolCard.astro`

**Step 1: Update the ToolCard test**

In `tests/homepage.test.mjs`, update the ToolCard test:

```js
test('ToolCard accepts href prop and has search data attributes', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/ToolCard.astro'), 'utf8');
  assert.doesNotMatch(source, /grid-cols/);
  assert.match(source, /data-type/);
  assert.match(source, /data-name/);
  assert.match(source, /data-description/);
  assert.match(source, /href/);
  // No longer derives href from repo
  assert.doesNotMatch(source, /coming-soon/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — ToolCard still references /coming-soon.

**Step 3: Update ToolCard.astro**

Replace the entire content of `src/components/ToolCard.astro` with:

```astro
---
interface Props {
  name: string;
  description: string;
  type: 'skill' | 'mcp' | 'subagent' | 'plugin';
  href: string;
}

const { name, description, type, href } = Astro.props;

const typeLabels: Record<string, string> = {
  skill: 'SKILL',
  mcp: 'MCP',
  subagent: 'SUBAGENT',
  plugin: 'PLUGIN',
};
---

<a
  href={href}
  class="tool-card block py-4 border-b border-gray-200 cursor-pointer transition-colors duration-100 hover:bg-gray-100"
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

Note: Removed `repo` prop. Added `href` prop. Removed `target`/`rel` logic (all links are internal now). Removed `/coming-soon` fallback — the parent constructs the correct href.

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/components/ToolCard.astro tests/homepage.test.mjs
git commit -m "feat: ToolCard accepts href prop for detail page links"
```

---

### Task 7: Create Detail Page Routes

**Files:**
- Create: `src/pages/skills/[slug].astro`
- Create: `src/pages/mcps/[slug].astro`
- Create: `src/pages/plugins/[slug].astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('detail page routes exist for skills, mcps, and plugins', async () => {
  const skillPage = await readFile(resolve(__dirname, '../src/pages/skills/[slug].astro'), 'utf8');
  const mcpPage = await readFile(resolve(__dirname, '../src/pages/mcps/[slug].astro'), 'utf8');
  const pluginPage = await readFile(resolve(__dirname, '../src/pages/plugins/[slug].astro'), 'utf8');

  // All three should use getStaticPaths and filter by type
  assert.match(skillPage, /getStaticPaths/);
  assert.match(skillPage, /skill/);
  assert.match(mcpPage, /getStaticPaths/);
  assert.match(mcpPage, /mcp/);
  assert.match(pluginPage, /getStaticPaths/);
  assert.match(pluginPage, /plugin/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — files don't exist.

**Step 3: Create the skills directory and detail page**

Create `src/pages/skills/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import ToolCard from '../../components/ToolCard.astro';
import EmailSignup from '../../components/EmailSignup.astro';

export async function getStaticPaths() {
  const tools = await getCollection('tools');
  return tools
    .filter(t => t.data.type === 'skill')
    .map(tool => ({
      params: { slug: tool.id.split('/').pop() },
      props: { tool },
    }));
}

const { tool } = Astro.props;
const { name, description, type, install, compatibleWith, tags, author, source, relatedTools } = tool.data;

const typePrefix: Record<string, string> = { skill: 'skills', mcp: 'mcps', plugin: 'plugins', subagent: 'coming-soon' };

// Resolve related tools
const allTools = await getCollection('tools');
const related = relatedTools.length > 0
  ? allTools.filter(t => relatedTools.includes(t.id.split('/').pop()!))
  : allTools.filter(t => t.data.type === type && t.id !== tool.id).slice(0, 3);

const schema = {
  '@type': 'SoftwareApplication',
  'name': name,
  'description': description,
  'applicationCategory': 'AI Agent Skill',
  'operatingSystem': 'Cross-platform',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
};
---

<BaseLayout
  title={`${name} — Channel 47`}
  description={description}
  schema={schema}
>
  <Nav />

  <main id="main-content" class="pt-24 pb-12 px-[clamp(24px,5vw,64px)]">
    <div class="max-w-[1060px] mx-auto">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Skills', href: '/skills' },
        { label: name },
      ]} />

      <div class="flex items-start justify-between gap-4 mb-4">
        <h1 class="font-mono text-lg text-primary">{name}</h1>
        <span class="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-amber bg-[var(--amber-dim)] px-2 py-0.5 rounded-tight shrink-0 mt-1">SKILL</span>
      </div>

      <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide max-w-[640px] mb-8">{description}</p>

      {install && (
        <div class="mb-8">
          <div class="install-block relative font-mono text-sm text-gray-400 bg-gray-100/50 border border-gray-200 rounded-tight px-4 py-3 overflow-x-auto">
            <code>{install}</code>
            <button
              class="install-copy absolute top-2 right-2 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500 hover:text-amber bg-gray-100 border border-gray-300 rounded-tight px-2 py-1 cursor-pointer transition-colors duration-100"
              data-install={install}
            >Copy</button>
          </div>
        </div>
      )}

      <div class="font-mono text-xs text-gray-500 space-y-1.5 mb-8">
        <p>By {author} · Source: {source}</p>
        {tags.length > 0 && <p>Tags: {tags.join(', ')}</p>}
        {compatibleWith.length > 0 && <p>Works with: {compatibleWith.join(', ')}</p>}
      </div>

      {related.length > 0 && (
        <div class="border-t border-gray-200 pt-8 mb-8">
          <p class="font-mono text-[11px] text-gray-500 uppercase tracking-[0.1em] mb-4">Related Tools</p>
          {related.map(t => (
            <ToolCard
              name={t.data.name}
              description={t.data.description}
              type={t.data.type}
              href={`/${typePrefix[t.data.type]}/${t.id.split('/').pop()}`}
            />
          ))}
        </div>
      )}

      <div class="border-t border-gray-200 pt-8">
        <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide mb-4">New tools and breakdowns weekly.</p>
        <EmailSignup placeholder="you@domain.com" tag="tool-detail" submitText="Subscribe" />
      </div>
    </div>
  </main>

  <Footer />

  <script>
    function initCopyButtons() {
      document.querySelectorAll('[data-install]').forEach(btn => {
        if (btn.hasAttribute('data-initialized')) return;
        btn.setAttribute('data-initialized', 'true');
        btn.addEventListener('click', async () => {
          const text = btn.getAttribute('data-install');
          if (!text) return;
          await navigator.clipboard.writeText(text);
          const el = btn as HTMLElement;
          el.textContent = 'Copied';
          setTimeout(() => { el.textContent = 'Copy'; }, 1500);
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCopyButtons);
    } else {
      initCopyButtons();
    }
    document.addEventListener('astro:page-load', initCopyButtons);
  </script>
</BaseLayout>
```

**Step 4: Create MCP detail page**

Create `src/pages/mcps/[slug].astro` — identical to skills page but with these differences:
- Filter: `t.data.type === 'mcp'`
- Breadcrumb label: `'MCPs'`, href: `'/mcps'`
- Type badge text: `MCP`
- Schema applicationCategory: `'MCP Server'`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import ToolCard from '../../components/ToolCard.astro';
import EmailSignup from '../../components/EmailSignup.astro';

export async function getStaticPaths() {
  const tools = await getCollection('tools');
  return tools
    .filter(t => t.data.type === 'mcp')
    .map(tool => ({
      params: { slug: tool.id.split('/').pop() },
      props: { tool },
    }));
}

const { tool } = Astro.props;
const { name, description, type, install, compatibleWith, tags, author, source, relatedTools } = tool.data;

const typePrefix: Record<string, string> = { skill: 'skills', mcp: 'mcps', plugin: 'plugins', subagent: 'coming-soon' };

const allTools = await getCollection('tools');
const related = relatedTools.length > 0
  ? allTools.filter(t => relatedTools.includes(t.id.split('/').pop()!))
  : allTools.filter(t => t.data.type === type && t.id !== tool.id).slice(0, 3);

const schema = {
  '@type': 'SoftwareApplication',
  'name': name,
  'description': description,
  'applicationCategory': 'MCP Server',
  'operatingSystem': 'Cross-platform',
  'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
};
---

<BaseLayout
  title={`${name} — Channel 47`}
  description={description}
  schema={schema}
>
  <Nav />

  <main id="main-content" class="pt-24 pb-12 px-[clamp(24px,5vw,64px)]">
    <div class="max-w-[1060px] mx-auto">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'MCPs', href: '/mcps' },
        { label: name },
      ]} />

      <div class="flex items-start justify-between gap-4 mb-4">
        <h1 class="font-mono text-lg text-primary">{name}</h1>
        <span class="font-mono text-[10px] font-medium tracking-[0.1em] uppercase text-amber bg-[var(--amber-dim)] px-2 py-0.5 rounded-tight shrink-0 mt-1">MCP</span>
      </div>

      <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide max-w-[640px] mb-8">{description}</p>

      {install && (
        <div class="mb-8">
          <div class="install-block relative font-mono text-sm text-gray-400 bg-gray-100/50 border border-gray-200 rounded-tight px-4 py-3 overflow-x-auto">
            <code>{install}</code>
            <button
              class="install-copy absolute top-2 right-2 font-mono text-[10px] uppercase tracking-[0.1em] text-gray-500 hover:text-amber bg-gray-100 border border-gray-300 rounded-tight px-2 py-1 cursor-pointer transition-colors duration-100"
              data-install={install}
            >Copy</button>
          </div>
        </div>
      )}

      <div class="font-mono text-xs text-gray-500 space-y-1.5 mb-8">
        <p>By {author} · Source: {source}</p>
        {tags.length > 0 && <p>Tags: {tags.join(', ')}</p>}
        {compatibleWith.length > 0 && <p>Works with: {compatibleWith.join(', ')}</p>}
      </div>

      {related.length > 0 && (
        <div class="border-t border-gray-200 pt-8 mb-8">
          <p class="font-mono text-[11px] text-gray-500 uppercase tracking-[0.1em] mb-4">Related Tools</p>
          {related.map(t => (
            <ToolCard
              name={t.data.name}
              description={t.data.description}
              type={t.data.type}
              href={`/${typePrefix[t.data.type]}/${t.id.split('/').pop()}`}
            />
          ))}
        </div>
      )}

      <div class="border-t border-gray-200 pt-8">
        <p class="font-mono text-sm text-gray-600 leading-relaxed tracking-wide mb-4">New tools and breakdowns weekly.</p>
        <EmailSignup placeholder="you@domain.com" tag="tool-detail" submitText="Subscribe" />
      </div>
    </div>
  </main>

  <Footer />

  <script>
    function initCopyButtons() {
      document.querySelectorAll('[data-install]').forEach(btn => {
        if (btn.hasAttribute('data-initialized')) return;
        btn.setAttribute('data-initialized', 'true');
        btn.addEventListener('click', async () => {
          const text = btn.getAttribute('data-install');
          if (!text) return;
          await navigator.clipboard.writeText(text);
          const el = btn as HTMLElement;
          el.textContent = 'Copied';
          setTimeout(() => { el.textContent = 'Copy'; }, 1500);
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCopyButtons);
    } else {
      initCopyButtons();
    }
    document.addEventListener('astro:page-load', initCopyButtons);
  </script>
</BaseLayout>
```

**Step 5: Create Plugin detail page**

Create `src/pages/plugins/[slug].astro` — identical pattern but:
- Filter: `t.data.type === 'plugin'`
- Breadcrumb: `'Plugins'`, href: `'/plugins'`
- Badge: `PLUGIN`
- Schema: `'Claude Code Plugin'`

Use the same structure as the skills page, replacing type-specific values.

**Step 6: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 7: Run build to verify all pages generate**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds. Should output pages for each tool in the collection.

**Step 8: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/pages/skills/ src/pages/mcps/ src/pages/plugins/ tests/homepage.test.mjs
git commit -m "feat: add detail page routes for skills, mcps, and plugins"
```

---

### Task 8: Create Hub Pages

**Files:**
- Create: `src/pages/skills/index.astro`
- Create: `src/pages/mcps/index.astro`
- Create: `src/pages/plugins/index.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('hub pages exist for skills, mcps, and plugins', async () => {
  const skillsHub = await readFile(resolve(__dirname, '../src/pages/skills/index.astro'), 'utf8');
  const mcpsHub = await readFile(resolve(__dirname, '../src/pages/mcps/index.astro'), 'utf8');
  const pluginsHub = await readFile(resolve(__dirname, '../src/pages/plugins/index.astro'), 'utf8');

  assert.match(skillsHub, /Marketing skills for agents/);
  assert.match(mcpsHub, /MCP servers for marketing workflows/);
  assert.match(pluginsHub, /Claude Code plugins for marketers/);

  // All should have Breadcrumbs
  assert.match(skillsHub, /Breadcrumbs/);
  assert.match(mcpsHub, /Breadcrumbs/);
  assert.match(pluginsHub, /Breadcrumbs/);

  // None should have EmailSignup (pure utility pages)
  assert.doesNotMatch(skillsHub, /EmailSignup/);
  assert.doesNotMatch(mcpsHub, /EmailSignup/);
  assert.doesNotMatch(pluginsHub, /EmailSignup/);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — files don't exist.

**Step 3: Create skills hub page**

Create `src/pages/skills/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import ToolCard from '../../components/ToolCard.astro';

const allTools = await getCollection('tools');
const skills = allTools.filter(t => t.data.type === 'skill');
---

<BaseLayout
  title="Marketing Skills for Agents — Channel 47"
  description="Agent skills built for marketing workflows. Install with one command. Works with Claude Code, Cursor, Cline, Windsurf, and Codex CLI."
>
  <Nav />

  <main id="main-content" class="pt-24 pb-12 px-[clamp(24px,5vw,64px)]">
    <div class="max-w-[1060px] mx-auto">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Skills' },
      ]} />

      <h1 class="font-heading text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight leading-[1.1] mb-6" style="font-family: var(--font-family-heading);">
        Marketing skills for agents.
      </h1>

      <div class="mb-5">
        <label for="skill-search" class="sr-only">Search skills</label>
        <input
          type="text"
          id="skill-search"
          placeholder="Search skills..."
          class="w-full px-4 h-12 font-mono text-sm text-gray-700 bg-gray-100/80 border border-gray-300 rounded-tight outline-none transition-[border-color,box-shadow] duration-100 placeholder:text-gray-500 hover:border-gray-400 focus-visible:border-amber focus-visible:shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"
          autocomplete="off"
          spellcheck="false"
        />
      </div>

      <p class="font-mono text-[11px] text-gray-500 mb-6">{skills.length} skills</p>

      <div id="hub-list">
        {skills.map(tool => (
          <ToolCard
            name={tool.data.name}
            description={tool.data.description}
            type={tool.data.type}
            href={`/skills/${tool.id.split('/').pop()}`}
          />
        ))}
      </div>

      <p id="no-results" class="font-mono text-sm text-gray-500 py-8 hidden">No skills match your search.</p>
    </div>
  </main>

  <Footer />

  <script>
    function initHubSearch() {
      const input = document.querySelector('[id$="-search"]') as HTMLInputElement;
      const list = document.getElementById('hub-list');
      const noResults = document.getElementById('no-results');
      if (!input || !list) return;

      const cards = list.querySelectorAll('[data-name]');

      input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
          const name = card.getAttribute('data-name') || '';
          const desc = card.getAttribute('data-description') || '';
          const matches = !query || name.includes(query) || desc.includes(query);
          (card as HTMLElement).style.display = matches ? '' : 'none';
          if (matches) visibleCount++;
        });

        if (noResults) {
          noResults.classList.toggle('hidden', visibleCount > 0);
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHubSearch);
    } else {
      initHubSearch();
    }
    document.addEventListener('astro:page-load', initHubSearch);
  </script>
</BaseLayout>
```

**Step 4: Create MCPs hub page**

Create `src/pages/mcps/index.astro` — same structure as skills hub but:
- Filter: `type === 'mcp'`
- Title: `"MCP Servers for Marketing Workflows — Channel 47"`
- h1: `"MCP servers for marketing workflows."`
- Breadcrumb label: `'MCPs'`
- Search placeholder: `"Search MCPs..."`
- Count label: `"MCPs"`
- Tool href: `` `/mcps/${tool.id.split('/').pop()}` ``

**Step 5: Create Plugins hub page**

Create `src/pages/plugins/index.astro` — same structure but:
- Filter: `type === 'plugin'`
- Title: `"Claude Code Plugins for Marketers — Channel 47"`
- h1: `"Claude Code plugins for marketers."`
- Breadcrumb label: `'Plugins'`
- Search placeholder: `"Search plugins..."`
- Count label: `"plugins"`
- Tool href: `` `/plugins/${tool.id.split('/').pop()}` ``

**Step 6: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 7: Run build**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds. Hub pages should appear in output.

**Step 8: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/pages/skills/index.astro src/pages/mcps/index.astro src/pages/plugins/index.astro tests/homepage.test.mjs
git commit -m "feat: add hub pages for skills, mcps, and plugins"
```

---

### Task 9: Update Homepage

**Files:**
- Modify: `src/pages/index.astro`

This is the largest task. New headline, compact newsletter bar, filter tabs, tool rows linking to detail pages.

**Step 1: Update the homepage test**

In `tests/homepage.test.mjs`, replace the homepage test:

```js
test('homepage has directory headline, newsletter bar, filter tabs, and tool list', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/index.astro'), 'utf8');

  // Has hero section
  assert.match(source, /data-section="hero"/);
  // Has new headline
  assert.match(source, /The marketing AI directory/);
  // Has EmailSignup
  assert.match(source, /EmailSignup/);
  // Has filter tabs
  assert.match(source, /id="filter-tabs"/);
  // Has search input
  assert.match(source, /id="tool-search"/);
  // Has tool list section
  assert.match(source, /id="tool-list"/);
  // Has PaidBriefsCard
  assert.match(source, /PaidBriefsCard/);
  // Tool links go to detail pages (type prefix in href)
  assert.match(source, /\/skills\//);
  assert.match(source, /\/mcps\//);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — homepage still has old headline, no filter tabs.

**Step 3: Rewrite index.astro**

Replace the entire content of `src/pages/index.astro` with:

```astro
---
/**
 * Homepage — The marketing AI directory.
 *
 * Structure: Hero (headline + newsletter bar) → Filter tabs + Search → Tool list → Footer
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

const midpoint = Math.floor(allTools.length / 2);

const typePrefix: Record<string, string> = {
  skill: 'skills',
  mcp: 'mcps',
  plugin: 'plugins',
  subagent: 'coming-soon',
};

function toolHref(tool: { id: string; data: { type: string } }) {
  if (tool.data.type === 'subagent') return '/coming-soon';
  const slug = tool.id.split('/').pop();
  return `/${typePrefix[tool.data.type]}/${slug}`;
}

const schema = [
  {
    '@type': 'Organization',
    'name': 'Channel 47',
    'url': 'https://channel47.dev',
    'logo': 'https://channel47.dev/og-image.png',
    'description': 'The marketing AI directory. Skills, MCPs, and plugins for marketing workflows.',
    'founder': {
      '@type': 'Person',
      'name': 'Jackson Dean',
      'url': 'https://x.com/ctrlswing',
    },
    'sameAs': [
      'https://github.com/channel47',
      'https://x.com/ctrlswing',
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
  title="Channel 47 — The Marketing AI Directory"
  description="Skills, MCPs, and plugins for marketing workflows. New tools and breakdowns weekly."
  schema={schema}
>
  <Nav />

  <main id="main-content">
    <section class="pt-28 pb-6 px-[clamp(24px,5vw,64px)]" data-section="hero">
      <div class="max-w-[1060px] mx-auto">
        <h1 class="font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-tight leading-[1.1] text-primary mb-4" style="font-family: var(--font-family-heading);">
          The marketing AI directory.
        </h1>
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <p class="font-mono text-sm text-gray-600 tracking-wide shrink-0">New tools and breakdowns weekly.</p>
          <EmailSignup placeholder="you@domain.com" tag="home" submitText="Subscribe" class="max-w-[360px]" />
        </div>
      </div>
    </section>

    <section class="px-[clamp(24px,5vw,64px)] pb-12" data-animate="fade-up">
      <div class="max-w-[1060px] mx-auto">
        <div class="border-t border-gray-200 pt-6 mb-5">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
            <div id="filter-tabs" class="flex items-center gap-1" role="tablist" aria-label="Filter by type">
              <button class="filter-tab font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-tight border border-transparent cursor-pointer transition-colors duration-100 text-gray-500 hover:text-primary" data-filter="all" role="tab" aria-selected="true">All</button>
              <button class="filter-tab font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-tight border border-transparent cursor-pointer transition-colors duration-100 text-gray-500 hover:text-primary" data-filter="skill" role="tab" aria-selected="false">Skills</button>
              <button class="filter-tab font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-tight border border-transparent cursor-pointer transition-colors duration-100 text-gray-500 hover:text-primary" data-filter="mcp" role="tab" aria-selected="false">MCPs</button>
              <button class="filter-tab font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-tight border border-transparent cursor-pointer transition-colors duration-100 text-gray-500 hover:text-primary" data-filter="plugin" role="tab" aria-selected="false">Plugins</button>
            </div>
            <div class="flex-1">
              <label for="tool-search" class="sr-only">Search tools</label>
              <input
                type="text"
                id="tool-search"
                placeholder="Search tools..."
                class="w-full px-4 h-10 font-mono text-sm text-gray-700 bg-gray-100/80 border border-gray-300 rounded-tight outline-none transition-[border-color,box-shadow] duration-100 placeholder:text-gray-500 hover:border-gray-400 focus-visible:border-amber focus-visible:shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"
                autocomplete="off"
                spellcheck="false"
              />
            </div>
          </div>
        </div>

        <p class="font-mono text-[11px] text-gray-500 mb-6"><span id="visible-count">{toolCount}</span> tools shipped</p>

        <div id="tool-list">
          {allTools.map((tool, i) => (
            <Fragment>
              {i === midpoint && <PaidBriefsCard />}
              <ToolCard
                name={tool.data.name}
                description={tool.data.description}
                type={tool.data.type}
                href={toolHref(tool)}
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

  <script>
    function initDirectory() {
      const input = document.getElementById('tool-search') as HTMLInputElement;
      const list = document.getElementById('tool-list');
      const noResults = document.getElementById('no-results');
      const tabs = document.querySelectorAll('[data-filter]');
      const visibleCountEl = document.getElementById('visible-count');
      if (!input || !list) return;

      const cards = list.querySelectorAll('[data-name]');
      let activeFilter = 'all';

      function applyFilters() {
        const query = input.value.toLowerCase().trim();
        let visibleCount = 0;

        cards.forEach(card => {
          const name = card.getAttribute('data-name') || '';
          const desc = card.getAttribute('data-description') || '';
          const type = card.getAttribute('data-type') || '';

          const matchesFilter = activeFilter === 'all' || type === activeFilter;
          const matchesSearch = !query || name.includes(query) || desc.includes(query) || type.includes(query);
          const visible = matchesFilter && matchesSearch;

          (card as HTMLElement).style.display = visible ? '' : 'none';
          if (visible) visibleCount++;
        });

        if (noResults) {
          noResults.classList.toggle('hidden', visibleCount > 0);
        }
        if (visibleCountEl) {
          visibleCountEl.textContent = String(visibleCount);
        }
      }

      input.addEventListener('input', applyFilters);

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          activeFilter = (tab as HTMLElement).dataset.filter || 'all';

          tabs.forEach(t => {
            const isActive = t === tab;
            t.setAttribute('aria-selected', String(isActive));
            (t as HTMLElement).classList.toggle('text-primary', isActive);
            (t as HTMLElement).classList.toggle('border-gray-300', isActive);
            (t as HTMLElement).classList.toggle('text-gray-500', !isActive);
            (t as HTMLElement).classList.toggle('border-transparent', !isActive);
          });

          applyFilters();
        });
      });

      // Set initial active state on "All" tab
      const allTab = document.querySelector('[data-filter="all"]') as HTMLElement;
      if (allTab) {
        allTab.classList.add('text-primary', 'border-gray-300');
        allTab.classList.remove('text-gray-500', 'border-transparent');
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDirectory);
    } else {
      initDirectory();
    }
    document.addEventListener('astro:page-load', initDirectory);
  </script>
</BaseLayout>
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Run build**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/pages/index.astro tests/homepage.test.mjs
git commit -m "feat: rewrite homepage as marketing AI directory"
```

---

### Task 10: Create Privacy Page

**Files:**
- Create: `src/pages/privacy.astro`

**Step 1: Write the failing test**

Add to `tests/homepage.test.mjs`:

```js
test('privacy page exists', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/privacy.astro'), 'utf8');
  assert.match(source, /Privacy/i);
  assert.match(source, /email/i);
});
```

**Step 2: Run test to verify it fails**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: FAIL — file doesn't exist.

**Step 3: Create privacy.astro**

Create `src/pages/privacy.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout
  title="Privacy Policy — Channel 47"
  description="How Channel 47 handles your data."
>
  <Nav />

  <main id="main-content" class="pt-28 pb-16 px-[clamp(24px,5vw,64px)]">
    <div class="max-w-[640px] mx-auto prose">
      <h1 class="font-heading text-xl font-semibold tracking-tight mb-8" style="font-family: var(--font-family-heading);">Privacy Policy</h1>

      <p>Last updated: February 2026</p>

      <h2>What we collect</h2>
      <p>When you subscribe to our newsletter, we collect your email address. That's it.</p>

      <h2>How we use it</h2>
      <p>Your email is used to send you Build Notes, our weekly newsletter about new tools and breakdowns. We use Kit (formerly ConvertKit) to manage our mailing list.</p>

      <h2>What we don't do</h2>
      <ul>
        <li>We don't sell your email to anyone</li>
        <li>We don't share your data with third parties (beyond Kit for email delivery)</li>
        <li>We don't track you across the web</li>
      </ul>

      <h2>Analytics</h2>
      <p>We use basic analytics to understand how people use the site. No personal data is collected through analytics.</p>

      <h2>Cookies</h2>
      <p>This site uses minimal cookies required for basic functionality. No tracking cookies.</p>

      <h2>Your rights</h2>
      <p>You can unsubscribe from our newsletter at any time using the link in every email. To request deletion of your data, email jackson@channel47.dev.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Email jackson@channel47.dev.</p>
    </div>
  </main>

  <Footer />
</BaseLayout>
```

**Step 4: Run test to verify it passes**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm test`
Expected: PASS

**Step 5: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add src/pages/privacy.astro tests/homepage.test.mjs
git commit -m "feat: add privacy policy page"
```

---

### Task 11: Clean Up and Fix Skills Repo README

**Files:**
- Verify: No broken imports (SocialLinks no longer used)
- Modify: `/Users/jackson/Documents/a_projects/ch47/skills/README.md` (fix install command)

**Step 1: Check for orphaned SocialLinks imports**

Run: `grep -r "SocialLinks" /Users/jackson/Documents/a_projects/ch47/site/src/ --include="*.astro"`

If only `SocialLinks.astro` itself shows up (self-reference), the component is orphaned. Leave it for now — no harm in keeping it.

**Step 2: Fix skills repo README install command**

In `/Users/jackson/Documents/a_projects/ch47/skills/README.md`, replace `npx skillsadd` with `npx skills add` (two words).

**Step 3: Verify build**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build`
Expected: Build succeeds.

**Step 4: Commit (both repos)**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add -A
git commit -m "chore: clean up unused references"

cd /Users/jackson/Documents/a_projects/ch47/skills
git add README.md
git commit -m "fix: correct install command (npx skills add, not skillsadd)"
```

---

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `/Users/jackson/Documents/a_projects/ch47/site/CLAUDE.md`

**Step 1: Update Pages section**

Update the pages list to reflect new routes:
- `/` — Homepage: marketing AI directory (hero + newsletter + filtered tool list)
- `/skills/` — Skills hub
- `/skills/[slug]` — Individual skill detail page
- `/mcps/` — MCPs hub
- `/mcps/[slug]` — Individual MCP detail page
- `/plugins/` — Plugins hub
- `/plugins/[slug]` — Individual plugin detail page
- `/privacy` — Privacy policy

**Step 2: Update Key Files section**

Add new files:
- `Breadcrumbs.astro` — Breadcrumb navigation
- `skills/index.astro`, `mcps/index.astro`, `plugins/index.astro` — Hub pages
- `skills/[slug].astro`, `mcps/[slug].astro`, `plugins/[slug].astro` — Detail pages
- `privacy.astro` — Privacy policy

Update descriptions:
- `Nav.astro` — Logo left, Subscribe right
- `Footer.astro` — Notes · Labs · Subscribe · Privacy + ctrlswing attribution
- `ToolCard.astro` — Accepts href prop, links to detail pages
- `index.astro` — Marketing AI directory with filter tabs

**Step 3: Commit**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for directory site structure"
```

---

### Task 13: Visual Verification

**Step 1: Start dev server**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run dev`

**Step 2: Check homepage**

Open `http://localhost:4321` and verify:
- Nav: logo left, Subscribe right
- Headline: "The marketing AI directory."
- Newsletter bar: text + inline email form
- Filter tabs: All / Skills / MCPs / Plugins — clicking filters the list
- Search input filters by name/description/type
- Tool rows link to detail pages (click one and verify)
- Paid Briefs card appears mid-list with dashed amber border
- Footer: Notes · Labs · Subscribe · Privacy + "Built by ctrlswing"
- Tool count updates when filtering

**Step 3: Check a detail page**

Click a tool card (e.g., Content Miner). Verify:
- Breadcrumbs: Home > Skills > Content Miner
- Name + type badge
- Description
- Install command with copy button (if set)
- Metadata (author, source, tags, compatible tools)
- Related tools section with clickable links
- Newsletter CTA at bottom
- Footer

**Step 4: Check hub pages**

Navigate to `/skills/`, `/mcps/`, `/plugins/`. Verify:
- Breadcrumbs: Home > Skills
- Type-specific headline
- Search input
- Tool count
- Only shows tools of that type
- No newsletter capture

**Step 5: Check privacy page**

Navigate to `/privacy`. Verify content renders in prose styling.

**Step 6: Check mobile**

Resize to 375px width. Verify layout doesn't break on:
- Homepage (filter tabs should wrap, search full width)
- Detail pages
- Hub pages

**Step 7: Run final build**

Run: `cd /Users/jackson/Documents/a_projects/ch47/site && npm run build && npm run preview`
Expected: Build succeeds, preview matches dev.

**Step 8: Commit any fixes**

```bash
cd /Users/jackson/Documents/a_projects/ch47/site
git add -A
git commit -m "fix: visual polish from manual testing"
```
