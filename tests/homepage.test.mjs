import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('Nav has logo and Subscribe link', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Nav.astro'), 'utf8');
  assert.match(source, /href="\/"/);
  assert.match(source, /href="\/subscribe"/);
  assert.doesNotMatch(source, /href="\/notes"/);
  assert.doesNotMatch(source, /href="\/labs"/);
});

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

test('tools schema supports compatibleWith and relatedTools fields', async () => {
  const source = await readFile(resolve(__dirname, '../src/content/config.ts'), 'utf8');
  assert.match(source, /compatibleWith/);
  assert.match(source, /relatedTools/);
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

test('Breadcrumbs component exists with correct structure', async () => {
  const source = await readFile(resolve(__dirname, '../src/components/Breadcrumbs.astro'), 'utf8');
  assert.match(source, /nav/);
  assert.match(source, /aria-label="Breadcrumb"/);
  assert.match(source, /items/);
});
