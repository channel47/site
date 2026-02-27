import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

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

test('Footer has Notes, Labs, Subscribe links', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const footerPath = resolve(__dirname, '../src/components/Footer.astro');
  const source = await readFile(footerPath, 'utf8');

  assert.match(source, /href="\/notes"/);
  assert.match(source, /href="\/labs"/);
  assert.match(source, /href="\/subscribe"/);
});

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

test('PaidBriefsCard exists with correct structure', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const cardPath = resolve(__dirname, '../src/components/PaidBriefsCard.astro');
  const source = await readFile(cardPath, 'utf8');

  assert.match(source, /paidbriefs\.com/);
  assert.match(source, /PRODUCT/);
  assert.match(source, /border-dashed/);
});

test('coming-soon page exists with email signup', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pagePath = resolve(__dirname, '../src/pages/coming-soon.astro');
  const source = await readFile(pagePath, 'utf8');

  assert.match(source, /EmailSignup/);
  assert.match(source, /coming-soon/i);
});
