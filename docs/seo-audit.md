# Auditoria e implementação de SEO — Igreja A Caverna

Data: 25/09/2026. Site oficial: https://www.caverna.example/.

## Diagnóstico anterior

- Stack: React + TypeScript + Vite, publicado na Vercel como SPA/CSR. O HTML inicial era igual em todas as rotas e tinha somente o elemento `#root` vazio.
- Rotas: `/`, `/a-caverna`, `/nossa-fe`, `/comunidade`, `/agenda`, `/visite-nos`, `/contato`, `/contribua`, `/esportes`, `/discipulado`, `/oracao`, `/missoes` e `/criancas-familias`.
- Todas as rotas compartilhavam o mesmo title, description e OG; não havia canonical ou JSON-LD.
- Não havia `robots.txt` ou `sitemap.xml` reais: ambos devolviam o HTML da home com status 200. Uma URL inexistente também devolvia home com 200. A barra final criava outra URL 200.
- O domínio raiz já fazia redirecionamento permanente 308 para `www`.
- H1: ausente na home; havia um H1 por página interna. Headings internos e links de navegação já eram em grande parte semânticos. `lang="pt-BR"` já existia.
- Favicon PNG existente; sem manifest. Fontes Google, Google Analytics, Google Maps e YouTube são recursos externos usados no projeto.
- Fotos de galerias e páginas internas estavam sem carregamento sob demanda. Parte das imagens originais supera 6 MB. LCP mobile e desktop estavam acima da meta em execução isolada do Lighthouse.
- A “Próxima reunião” era calculada apenas para o sábado no timezone do visitante; havia risco de data incorreta, HTML estático vencido e ausência de `<time>`.

## NAP verificado

Nome oficial: Igreja A Caverna. Endereço do perfil público no Google Maps: Av. Dr. Danton Jobim, Quadra 32, Lote 4, Jardim do Ingá, Luziânia - GO, 72850-200. A versão anterior do código não trazia Lote 4 nem CEP. O perfil não exibia telefone; por isso `telephone` foi omitido de Organization/Church. O WhatsApp já presente no site permanece como canal de contato, sem ser declarado telefone oficial do perfil. Não foram adicionadas coordenadas nem horário de funcionamento.

## Implementação

- Prerender das 13 rotas no build Vite, com HTML textual e metadados próprios; React hidrata o HTML sem refazer o site.
- Titles, descriptions, canonical absoluto, OG e Twitter Card por página em `src/seo.ts`; H1 da home transformado no título visual existente, sem mudança de design.
- `@graph` com `WebSite`, `Organization`, `Church`, `WebPage` e `BreadcrumbList` nas páginas internas indexáveis. IDs persistentes em `www`; endereço estruturado e perfis Instagram/YouTube usados pelo projeto. Sem telefone, geo, avaliações, `Event` ou `VideoObject` não confirmados.
- Sitemap gerado automaticamente com 12 rotas indexáveis. `/criancas-familias` continua acessível, mas é `noindex,follow` por ter texto genérico sem informações próprias de um ministério infantil confirmado.
- `robots.txt` real, incluindo OAI-SearchBot sem alterar a política específica de GPTBot (nenhuma regra específica existente).
- Domínio canônico `www`; barra final redireciona permanentemente para a URL sem barra; `/nossa-historia` redireciona para a história já existente em `/a-caverna`; rotas inexistentes agora retornam 404.
- Agenda regular centralizada: discipulado quinta e culto público sábado às 19h30, com cálculo em `America/Sao_Paulo`, ordenação e seleção do próximo horário futuro. Antes de hidratar, o HTML exibe a programação recorrente, não uma data que ficará vencida. Após hidratar, o horário é marcado com `<time datetime>`.
- Nome/endereço consistentes em home, rodapés e visita; mapa e rota mantidos. Fotos abaixo da primeira tela usam carregamento sob demanda. Fotos das cenas animadas só recebem `src` quando a cena se aproxima; imagem principal continua prioritária.

## Metadados por rota

| Rota | Title | Meta description |
| --- | --- | --- |
| `/` | Igreja A Caverna \| Igreja Evangélica no Jardim Ingá | Igreja evangélica no Jardim Ingá, Luziânia-GO. Uma comunidade cristã bíblica, missionária e discipuladora, firmada na Palavra e centrada em Cristo. |
| `/a-caverna` | Nossa História e Identidade \| Igreja A Caverna | Conheça a história da Igreja A Caverna: das ações missionárias em Ceilândia à comunidade cristã formada no Jardim Ingá, em Luziânia-GO. |
| `/nossa-fe` | No que cremos \| Igreja A Caverna | Conheça as convicções da Igreja A Caverna: Cristo no centro, a Escritura como base e uma vida de comunhão, discipulado, serviço e missão. |
| `/comunidade` | Vida em Comunidade \| Igreja A Caverna | Na Igreja A Caverna, a comunidade caminha junto durante a semana: Palavra, oração, cuidado e presença no Jardim Ingá. |
| `/agenda` | Agenda e Cultos \| Igreja A Caverna | Confira os encontros regulares da Igreja A Caverna no Jardim Ingá: discipulado às quintas e culto público aos sábados, às 19h30. |
| `/visite-nos` | Visite a Igreja A Caverna \| Jardim do Ingá | Planeje sua visita à Igreja A Caverna. Encontre o endereço, os horários de reunião, o mapa e um canal de contato no Jardim do Ingá, Luziânia-GO. |
| `/contato` | Contato e Oração \| Igreja A Caverna | Fale com a Igreja A Caverna no Jardim Ingá. Compartilhe um pedido de oração, converse com a equipe ou encontre a comunidade em Luziânia-GO. |
| `/contribua` | Contribua \| Igreja A Caverna | Saiba como participar da missão e da vida da Igreja A Caverna com liberdade, consciência e responsabilidade. |
| `/esportes` | Esportes da Caverna \| Igreja A Caverna | Conheça o apoio da Igreja A Caverna a atletas de jiu-jitsu, judô e taekwondo e ao time de paintball Sons of Caverna. |
| `/discipulado` | Discipulado \| Igreja A Caverna | Na Igreja A Caverna, discipulado é crescer na Palavra e caminhar em comunhão, com ensino e acompanhamento próximo. |
| `/oracao` | Oração \| Igreja A Caverna | Você não precisa caminhar sozinho. Compartilhe seu pedido de oração com a comunidade da Igreja A Caverna. |
| `/missoes` | Missões \| Igreja A Caverna | Conheça as frentes missionárias da Igreja A Caverna: O Reino em Nós, oração, presença e serviço dentro e fora da comunidade. |
| `/criancas-familias` | Crianças e Famílias \| Igreja A Caverna | Conheça a vida em comunidade da Igreja A Caverna e planeje uma visita ao Jardim Ingá. (`noindex`) |

## Arquivos de rastreamento e respostas

`robots.txt` publicado:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://www.caverna.example/sitemap.xml
```

O sitemap inclui apenas as 12 URLs públicas canônicas acima, exceto `/criancas-familias`. Não há `lastmod` inventado. O arquivo é refeito no build a partir do registro de rotas. `www` é a versão canônica; domínio raiz, barra final e `/nossa-historia` respondem com redirecionamento permanente 308. Página inexistente responde 404.

## Verificações executadas

- `npm run build` e `npm run check:seo`: 13 rotas com title/canonical/OG corretos, exatamente um H1, JSON-LD válido e sitemap filtrado; testes da virada da próxima reunião passaram.
- Produção: 12 rotas indexáveis e `/criancas-familias` responderam 200; `robots.txt` 200 `text/plain`, `sitemap.xml` 200 `application/xml`, URL inexistente 404, redirecionamentos 308.
- Prévia visual no desktop e em 390 px: sem overflow horizontal e fotos animadas carregando ao se aproximar das cenas.
- Schema.org Validator da home: WebPage ligado a WebSite, Organization e Church, 0 erros e 0 avisos.
- Google Rich Results Test da home: 1 item de Organization válido detectado. Isso não garante exibição destacada na pesquisa.
- Lighthouse, execução isolada antes → depois: mobile 66 → 74, desktop 76 → 94. LCP final simulado: mobile 7,4 s e desktop 1,6 s; CLS final: mobile 0,007 e desktop 0,003. São resultados de laboratório, não dados de campo; INP real requer CrUX/Search Console. A meta de LCP mobile ainda não foi atingida.

## Pendências e próximos passos

1. Confirmar com a igreja se o WhatsApp do site também é o telefone oficial a publicar no Google Business Profile. Só então adicionar `telephone` ao schema e alinhar NAP telefônico.
2. Verificar a propriedade de domínio no Google Search Console. Enviar `https://www.caverna.example/sitemap.xml`; inspecionar home, `/nossa-fe`, `/visite-nos` e `/a-caverna` (a URL `/nossa-historia` redireciona); solicitar indexação das páginas estratégicas; acompanhar cobertura, canônica escolhida e melhorias de dados estruturados.
3. Verificar a propriedade no Bing Webmaster Tools, enviar o mesmo sitemap e acompanhar rastreamento. IndexNow fica condicionado a essa configuração e a um gatilho confiável de publicação; não foi adicionado um ping indiscriminado a cada preview/build.
4. Repetir Lighthouse em condições estáveis e acompanhar Core Web Vitals de campo. Investigar principalmente LCP mobile e converter/corrigir dimensões de imagens grandes sem degradar retratos. As imagens ainda não foram convertidas para WebP/AVIF em lote nem receberam dimensões intrínsecas completas.
5. Repetir o Schema.org Validator e o Google Rich Results Test nas páginas internas prioritárias quando forem atualizadas. Dados `Organization`/`Church` não garantem um recurso avançado específico na SERP.
6. Não foram criadas páginas de pregações ou eventos individuais por falta de dados editoriais confirmados (mensagem, pregador, data, texto bíblico, evento e horário). Também não foram adicionados `Event`/`VideoObject` sem esses campos.
7. O projeto não tinha manifest e segue sem ele; isso não impede indexação. O favicon PNG existente foi preservado.
