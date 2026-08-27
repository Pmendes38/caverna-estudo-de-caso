# Igreja A Caverna

Frontend institucional da Comunidade de Fé A Caverna, reconstruído a partir do Figma atual e com referências conceituais de navegação do site anterior.

## Desenvolvimento

```bash
npm install
npm run dev
```

Para validar o build de produção:

```bash
npm run build
```

## Diretrizes do projeto

- O Figma atual é a fonte de verdade para layout, tipografia, cores e responsividade.
- O site anterior foi consultado somente para compreender a hierarquia de conteúdo e CTAs.
- O código é uma implementação independente em React + TypeScript + CSS, sem dependência do repositório anterior.
- Conteúdos institucionais e dados de contato ficam centralizados em `src/data/siteContent.ts`.
- Os valores de impacto devem ser validados pela igreja antes da publicação final.

## Assets

Os assets do hero foram exportados do arquivo do Figma e estão em `public/assets/`.

## Deploy

O projeto é compatível com Vercel usando o preset padrão de Vite. O repositório GitHub novo deve ser conectado antes de configurar o projeto na Vercel.
