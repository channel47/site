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
