import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('Nav has logo, Plugins, Build, and Subscribe links', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Nav.astro'), 'utf8');
  assert.match(source, /href="\/"/);
  assert.match(source, /href="\/subscribe"/);
  assert.match(source, /href="\/plugins"/);
  assert.match(source, /href="\/tools"/);
  assert.match(source, />Build<\/a>/);
});

test('Footer has Build label, Notes, Labs, Subscribe, Privacy links and ctrlswing attribution', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Footer.astro'), 'utf8');
  assert.match(source, /href="\/tools"[^>]*>Build<\/a>/);
  assert.match(source, /href="\/notes"/);
  assert.match(source, /href="\/labs"/);
  assert.match(source, /href="\/subscribe"/);
  assert.match(source, /href="\/privacy"/);
  assert.match(source, /ctrlswing/);
  // No longer imports SocialLinks
  assert.doesNotMatch(source, /SocialLinks/);
});

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

test('ProductCallout exists with correct structure', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/ProductCallout.astro'), 'utf8');
  assert.match(source, /paidbrief\.com/);
  assert.match(source, /PRODUCT/i);
  assert.match(source, /Paid Briefs/);
});

test('coming-soon page exists with email signup', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/coming-soon.astro'), 'utf8');
  assert.match(source, /EmailSignup/);
});

test('tools page is skill builder with form and voice section', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/tools.astro'), 'utf8');

  // No longer a directory page
  assert.doesNotMatch(source, /getCollection/);
  assert.doesNotMatch(source, /hub-search/);
  assert.doesNotMatch(source, /ToolCard/);

  // Has skill builder structure
  assert.match(source, /Build a skill/);
  assert.match(source, /data-section="hero"/);
  assert.match(source, /data-section="builder-form"/);
  assert.match(source, /data-section="builder-voice"/);
  assert.match(source, /data-section="builder-email"/);

  // Has form fields
  assert.match(source, /name="role"/);
  assert.match(source, /name="platform"/);
  assert.match(source, /name="workflow"/);

  // Has ElevenLabs embed placeholder
  assert.match(source, /elevenlabs-convai/);
  // v1 delivery path builds from form (no dead sessionStorage reads)
  assert.match(source, /buildSkillFromForm/);
  assert.doesNotMatch(source, /sessionStorage/);
});

test('homepage top-level tool links point to /plugins directory', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/index.astro'), 'utf8');
  assert.match(source, /href="\/plugins" class="directory__link">View all<\/a>/);
  assert.match(source, /href="\/plugins" class="rupture__link">Browse all tools<\/a>/);
  assert.match(source, /href="\/plugins" class="cta__headline">Browse the tools\.<\/a>/);
  assert.doesNotMatch(source, /href="\/tools" class="directory__link">View all<\/a>/);
  assert.doesNotMatch(source, /href="\/tools" class="rupture__link">Browse all tools<\/a>/);
  assert.doesNotMatch(source, /href="\/tools" class="cta__headline">Browse the tools\.<\/a>/);
});

test('generate-skill endpoint enforces signature and guards untrusted prompt input', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/api/generate-skill.ts'), 'utf8');
  assert.match(source, /if \(!signatureHeader\)/);
  assert.match(source, /Invalid signature format/);
  assert.match(source, /<untrusted_user_input>/);
  assert.match(source, /escapeXml/);
  assert.match(source, /claude-sonnet-4-20250514/);
});

test('deliver-skill endpoint validates and applies security headers', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/api/deliver-skill.ts'), 'utf8');
  assert.match(source, /EMAIL_REGEX/);
  assert.match(source, /Cross-origin requests not allowed/);
  assert.match(source, /X-Frame-Options/);
  assert.match(source, /X-XSS-Protection/);
  assert.match(source, /REQUEST_TIMEOUT_MS/);
});

test('tools schema supports compatibleWith and relatedTools fields', async () => {
  const source = await readFile(resolve(__dirname, '../src/content/config.ts'), 'utf8');
  assert.match(source, /compatibleWith/);
  assert.match(source, /relatedTools/);
});

test('homepage has hero, proof bar, value grid, directory, rupture, product callout, CTA', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/index.astro'), 'utf8');

  // Has hero with is-visible
  assert.match(source, /class="hero/);
  // Has new headline
  assert.match(source, /AI plugins for/);
  // Has EmailSignup
  assert.match(source, /EmailSignup/);
  // Has proof bar
  assert.match(source, /proof-bar/);
  // Has value grid
  assert.match(source, /value-grid/);
  // Has directory section
  assert.match(source, /directory/);
  // Has rupture
  assert.match(source, /rupture/);
  // Has ProductCallout
  assert.match(source, /ProductCallout/);
  // Has CTA void
  assert.match(source, /class="cta"/);
  // Tool links go to detail pages via typePrefix mapping
  assert.match(source, /skill.*skills/);
  assert.match(source, /mcp.*mcps/);
});

test('Breadcrumbs component exists with correct structure', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Breadcrumbs.astro'), 'utf8');
  assert.match(source, /nav/);
  assert.match(source, /aria-label="Breadcrumb"/);
  assert.match(source, /items/);
});

test('detail page routes exist for skills, mcps, and plugins', async () => {
  const skillPage = await readFile(resolve(__dirname, '../src/pages/skills/[slug].astro'), 'utf8');
  const mcpPage = await readFile(resolve(__dirname, '../src/pages/mcps/[slug].astro'), 'utf8');
  const pluginPage = await readFile(resolve(__dirname, '../src/pages/plugins/[slug].astro'), 'utf8');

  assert.match(skillPage, /getStaticPaths/);
  assert.match(skillPage, /skill/);
  assert.match(mcpPage, /getStaticPaths/);
  assert.match(mcpPage, /mcp/);
  assert.match(pluginPage, /getStaticPaths/);
  assert.match(pluginPage, /plugin/);
});

test('skills and mcps hubs redirect to /plugins', async () => {
  const skillsHub = await readFile(resolve(__dirname, '../src/pages/skills/index.astro'), 'utf8');
  const mcpsHub = await readFile(resolve(__dirname, '../src/pages/mcps/index.astro'), 'utf8');

  assert.match(skillsHub, /redirect.*\/plugins/);
  assert.match(mcpsHub, /redirect.*\/plugins/);
});

test('plugins hub exists with directory', async () => {
  const pluginsHub = await readFile(resolve(__dirname, '../src/pages/plugins/index.astro'), 'utf8');
  assert.match(pluginsHub, /One plugin per platform/);
  assert.match(pluginsHub, /Breadcrumbs/);
  assert.match(pluginsHub, /data-hub-search/);
});

test('privacy page exists', async () => {
  const source = await readFile(resolve(__dirname, '../src/pages/privacy.astro'), 'utf8');
  assert.match(source, /Privacy/i);
  assert.match(source, /email/i);
});
