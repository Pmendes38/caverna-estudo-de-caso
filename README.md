# A Caverna

Site institucional em React, TypeScript e Vite, implementado a partir do Figma. Este é o projeto principal da minha seleção de trabalhos de desenvolvimento web.

[Site](https://igrejaacaverna.com.br/) · [Ver projeto no portfólio](https://portfolio-iota-woad-84p4egesbx.vercel.app/projetos/caverna)

## Problema e solução

O projeto precisava comunicar a identidade da comunidade com uma experiência clara em celular, tablet e desktop. Implementei componentes, conteúdo institucional centralizado e ajustes de imagens, tipografia e navegação por tamanho de tela.

As páginas são pré-renderizadas: o conteúdo e os metadados ficam disponíveis no HTML, sem depender apenas do JavaScript do navegador para mecanismos de busca.

## Estrutura

- `src/components/`: cabeçalho, imagens protagonistas, navegação, seções e rodapé.
- `src/data/`: conteúdo institucional e agenda.
- `src/seo.ts`: metadados e rotas públicas.
- `src/entry-server.tsx` e `scripts/prerender.mjs`: renderização das páginas.
- `src/styles.css`: composição visual e adaptações responsivas.

## Executar localmente

```sh
npm ci
npm run dev
```

## Validar

```sh
npm run build
npm run check:seo
```

## Histórico

O histórico e as ramificações registram a evolução da implementação.

Fotografias e marcas pertencem aos respectivos titulares.
