import { siteContent } from './data/siteContent';

export const siteOrigin = 'https://www.caverna.example';
const facade = '/assets/site-images/quem-somos/casa/galeria-01-fachada-principal.jpg';

export const seoPages = [
  { path: '/', title: 'Igreja A Caverna | Igreja Evangélica no Jardim Ingá', description: 'Igreja evangélica no Jardim Ingá, Luziânia-GO. Uma comunidade cristã bíblica, missionária e discipuladora, firmada na Palavra e centrada em Cristo.', image: facade, label: 'Início', indexable: true },
  { path: '/a-caverna', title: 'Nossa História e Identidade | Igreja A Caverna', description: 'Conheça a história da Igreja A Caverna: das ações missionárias em Ceilândia à comunidade cristã formada no Jardim Ingá, em Luziânia-GO.', image: facade, label: 'Nossa história', indexable: true },
  { path: '/nossa-fe', title: 'No que cremos | Igreja A Caverna', description: 'Conheça as convicções da Igreja A Caverna: Cristo no centro, a Escritura como base e uma vida de comunhão, discipulado, serviço e missão.', image: '/assets/site-images/nossa-fe/hero-oracao.jpg', label: 'Nossa fé', indexable: true },
  { path: '/comunidade', title: 'Vida em Comunidade | Igreja A Caverna', description: 'Na Igreja A Caverna, a comunidade caminha junto durante a semana: Palavra, oração, cuidado e presença no Jardim Ingá.', image: '/assets/site-images/comunidade/banner-comunidade.jpg', label: 'Comunidade', indexable: true },
  { path: '/agenda', title: 'Agenda e Cultos | Igreja A Caverna', description: 'Confira os encontros regulares da Igreja A Caverna no Jardim Ingá: discipulado às quintas e culto público aos sábados, às 19h30.', image: '/assets/site-images/agenda/hero.jpg', label: 'Agenda', indexable: true },
  { path: '/visite-nos', title: 'Visite a Igreja A Caverna | Jardim do Ingá', description: 'Planeje sua visita à Igreja A Caverna. Encontre o endereço, os horários de reunião, o mapa e um canal de contato no Jardim do Ingá, Luziânia-GO.', image: facade, label: 'Visite-nos', indexable: true },
  { path: '/contato', title: 'Contato e Oração | Igreja A Caverna', description: 'Fale com a Igreja A Caverna no Jardim Ingá. Compartilhe um pedido de oração, converse com a equipe ou encontre a comunidade em Luziânia-GO.', image: '/assets/site-images/contato/hero.jpg', label: 'Contato e oração', indexable: true },
  { path: '/contribua', title: 'Contribua | Igreja A Caverna', description: 'Saiba como participar da missão e da vida da Igreja A Caverna com liberdade, consciência e responsabilidade.', image: '/assets/site-images/contribua/hero.jpg', label: 'Contribua', indexable: true },
  { path: '/esportes', title: 'Esportes da Caverna | Igreja A Caverna', description: 'Conheça o apoio da Igreja A Caverna a atletas de jiu-jitsu, judô e taekwondo e ao time de paintball Sons of Caverna.', image: '/assets/site-images/esportes/hero.jpg', label: 'Esportes', indexable: true },
  { path: '/discipulado', title: 'Discipulado | Igreja A Caverna', description: 'Na Igreja A Caverna, discipulado é crescer na Palavra e caminhar em comunhão, com ensino e acompanhamento próximo.', image: '/assets/treated/discipulado.jpeg', label: 'Discipulado', indexable: true },
  { path: '/oracao', title: 'Oração | Igreja A Caverna', description: 'Você não precisa caminhar sozinho. Compartilhe seu pedido de oração com a comunidade da Igreja A Caverna.', image: '/assets/treated/prayer.jpeg', label: 'Oração', indexable: true },
  { path: '/missoes', title: 'Missões | Igreja A Caverna', description: 'Conheça as frentes missionárias da Igreja A Caverna: O Reino em Nós, oração, presença e serviço dentro e fora da comunidade.', image: '/assets/site-images/missoes/hero.jpg', label: 'Missões', indexable: true },
  { path: '/criancas-familias', title: 'Crianças e Famílias | Igreja A Caverna', description: 'Conheça a vida em comunidade da Igreja A Caverna e planeje uma visita ao Jardim Ingá.', image: '/assets/treated/children.jpeg', label: 'Crianças e famílias', indexable: false },
] as const;

export type SeoPage = (typeof seoPages)[number];

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function createSeoHead(page: SeoPage) {
  const url = `${siteOrigin}${page.path}`;
  const image = `${siteOrigin}${page.image}`;
  const address = {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Dr. Danton Jobim, Quadra 32, Lote 4, Jardim do Ingá',
    addressLocality: 'Luziânia',
    addressRegion: 'GO',
    postalCode: '72850-200',
    addressCountry: 'BR',
  };
  const sameAs = ['https://www.instagram.com/a_cavernaa/', 'https://www.youtube.com/@acaverna396'];
  const graph: Record<string, unknown>[] = page.indexable ? [
    { '@type': 'WebSite', '@id': `${siteOrigin}/#website`, url: `${siteOrigin}/`, name: 'Igreja A Caverna', inLanguage: 'pt-BR', publisher: { '@id': `${siteOrigin}/#organization` }, about: { '@id': `${siteOrigin}/#church` } },
    { '@type': 'Organization', '@id': `${siteOrigin}/#organization`, name: 'Igreja A Caverna', alternateName: 'Igreja AC', url: `${siteOrigin}/`, logo: `${siteOrigin}/assets/brand/logo-a-caverna-horizontal.png`, address, location: { '@id': `${siteOrigin}/#church` }, sameAs },
    { '@type': 'Church', '@id': `${siteOrigin}/#church`, name: 'Igreja A Caverna', url: `${siteOrigin}/`, image: `${siteOrigin}${facade}`, address, hasMap: siteContent.mapsUrl, sameAs },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: 'pt-BR', isPartOf: { '@id': `${siteOrigin}/#website` }, about: { '@id': `${siteOrigin}/#church` } },
  ] : [];

  if (page.indexable && page.path !== '/') {
    graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteOrigin}/` },
      { '@type': 'ListItem', position: 2, name: page.label, item: url },
    ] });
  }

  const tags = [
    `<title>${escapeAttribute(page.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    `<meta name="robots" content="${page.indexable ? 'index,follow' : 'noindex,follow'}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Igreja A Caverna" />`,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeAttribute(page.label === 'Início' ? 'Fachada da Igreja A Caverna' : page.label)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];
  if (graph.length) tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`);
  return tags.join('\n    ');
}
