import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createSeoHead, renderPage, seoPages, siteOrigin } from '../dist-server/entry-server.js';

const outputDir = resolve('dist');
const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');
if (!template.includes('<meta name="seo-head-placeholder" content="" />') || !template.includes('<!--ssr-outlet-->')) {
  throw new Error('SEO placeholders not found in the Vite output');
}

for (const page of seoPages) {
  const html = template
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
