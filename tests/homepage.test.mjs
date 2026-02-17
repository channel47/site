import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

test('homepage has expected sections and anchor links', async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const indexPath = resolve(__dirname, '../src/pages/index.astro');
  const source = await readFile(indexPath, 'utf8');

  for (const section of ['hero', 'why', 'signup', 'cta']) {
    assert.match(source, new RegExp(`data-section="${section}"`));
  }

  for (const section of ['stats', 'features', 'rupture']) {
    assert.doesNotMatch(source, new RegExp(`data-section="${section}"`));
  }

  assert.match(source, /id="signup"/);
});
