import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import postcss from 'postcss';
import { createSeoHead, renderPage, seoPages, siteOrigin } from '../dist-server/entry-server.js';

const outputDir = resolve('dist');
const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');
if (!template.includes('<meta name="seo-head-placeholder" content="" />') || !template.includes('<!--ssr-outlet-->')) {
  throw new Error('SEO placeholders not found in the Vite output');
}

const stylesheet = template.match(/<link rel="stylesheet" crossorigin href="([^"]+\.css)">/);
if (!stylesheet) throw new Error('Vite stylesheet not found in the output');

const homeMarkup = renderPage('/');
const homeClasses = new Set([...homeMarkup.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)));
const homeClassPrefix = /^(site|hero|mobile|experience|manifesto|gallery|institutional|event|schedule|ministry|footer|live|scroll|affirm|protagonist|editorial|exit|saturday|map|creative)/;
const homeCssTree = postcss.parse(await readFile(resolve('src/styles.css'), 'utf8'));
homeCssTree.walkRules((rule) => {
  const selectors = rule.selectors.filter((selector) => {
    const classes = [...selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((match) => match[1]);
    return classes.every((name) => homeClasses.has(name) || homeClassPrefix.test(name));
  });
  if (selectors.length === 0) rule.remove();
  else rule.selectors = selectors;
});
homeCssTree.walkComments((comment) => comment.remove());
homeCssTree.walkAtRules((rule) => { if (rule.nodes?.length === 0) rule.remove(); });
const homeCss = homeCssTree.toString();
const homeCssName = `home-${createHash('sha256').update(homeCss).digest('hex').slice(0, 8)}.css`;
await writeFile(resolve(outputDir, 'assets', homeCssName), homeCss, 'utf8');
const homeStylesheet = `<link rel="stylesheet" href="/assets/${homeCssName}">`;

for (const page of seoPages) {
  const pageTemplate = page.path === '/' ? template.replace(stylesheet[0], homeStylesheet) : template;
  const html = pageTemplate
    .replace('<meta name="seo-head-placeholder" content="" />', createSeoHead(page))
    .replace('<!--ssr-outlet-->', renderPage(page.path));
  const filename = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  await writeFile(resolve(outputDir, filename), html, 'utf8');
}

const sitemapEntries = seoPages.filter((page) => page.indexable).map((page) => `  <url><loc>${siteOrigin}${page.path}</loc></url>`);
await writeFile(resolve(outputDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`, 'utf8');
await writeFile(resolve(outputDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`, 'utf8');
await writeFile(resolve(outputDir, '404.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><title>Página não encontrada | Igreja A Caverna</title></head><body style="margin:0;background:#141417;color:#f5f0e8;font:16px system-ui,sans-serif;min-height:100vh;display:grid;place-items:center"><main style="max-width:520px;padding:32px"><img src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" width="220"><h1>Página não encontrada</h1><p>Este endereço não existe. Você pode voltar para a página inicial ou conhecer nossa comunidade.</p><p><a href="/" style="color:#f1ac33">Voltar ao início</a> · <a href="/visite-nos" style="color:#f1ac33">Visite-nos</a></p></main></body></html>`, 'utf8');

console.log(`Prerendered ${seoPages.length} routes and ${sitemapEntries.length} canonical sitemap URLs.`);
