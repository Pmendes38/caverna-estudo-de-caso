import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getNextMeeting, seoPages, siteOrigin } from '../dist-server/entry-server.js';

const outputDir = resolve('dist');
const sitemap = await readFile(resolve(outputDir, 'sitemap.xml'), 'utf8');
const robots = await readFile(resolve(outputDir, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \/\n/);
assert.match(robots, /Sitemap: https:\/\/www\.igrejaacaverna\.com\.br\/sitemap\.xml/);

for (const page of seoPages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  const html = await readFile(resolve(outputDir, file), 'utf8');
  const canonical = `${siteOrigin}${page.path}`;
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${page.path}: H1`);
  assert.equal((html.match(/<title>/g) ?? []).length, 1, `${page.path}: title`);
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${page.path}: canonical`);
  assert.ok(html.includes(`property="og:url" content="${canonical}"`), `${page.path}: og:url`);
  assert.ok(html.includes(`name="description" content=`), `${page.path}: description`);
  assert.ok(html.includes(`name="robots" content="${page.indexable ? 'index,follow' : 'noindex,follow'}"`), `${page.path}: robots`);
  const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  if (page.indexable) {
    assert.ok(match, `${page.path}: schema`);
    const schema = JSON.parse(match[1]);
    assert.ok(schema['@graph'].some((node) => node['@type'] === 'Church'), `${page.path}: Church`);
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${page.path}: sitemap`);
  } else {
    assert.ok(!match, `${page.path}: no schema`);
    assert.ok(!sitemap.includes(`<loc>${canonical}</loc>`), `${page.path}: excluded from sitemap`);
  }
}

assert.equal(getNextMeeting(new Date('2026-09-24T21:00:00Z'))?.title, 'DISCIPULADO');
assert.equal(getNextMeeting(new Date('2026-09-24T23:00:00Z'))?.title, 'CULTO PÚBLICO');
assert.equal(getNextMeeting(new Date('2026-09-26T23:00:00Z'))?.title, 'DISCIPULADO');
console.log(`SEO checks passed for ${seoPages.length} routes.`);
