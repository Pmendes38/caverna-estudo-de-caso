# A Caverna — estudo de caso

Site institucional em React, TypeScript e Vite, implementado a partir do Figma. Este é o projeto principal da minha seleção de trabalhos de desenvolvimento web.

> Cópia pública sanitizada para avaliação técnica. Não é o repositório oficial nem uma configuração de produção. Leia [os limites e a preservação do histórico](ESTUDO-DE-CASO.md).

## Problema e solução

O projeto precisava comunicar a identidade da comunidade com uma experiência clara em celular, tablet e desktop. Implementei componentes, conteúdo institucional centralizado e ajustes de imagens, tipografia e navegação por tamanho de tela.

As páginas são pré-renderizadas: o conteúdo e os metadados ficam disponíveis no HTML, sem depender apenas do JavaScript do navegador para mecanismos de busca.

## O que avaliar no código

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

Os contatos da versão de estudo são fictícios. Fotografias e marcas continuam pertencendo aos seus titulares. O histórico e as ramificações mostram a evolução da implementação; não utilize configurações antigas como uma base pronta para produção.
