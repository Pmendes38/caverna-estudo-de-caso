export const siteContent = {
  churchName: 'Comunidade de Fé A Caverna',
  shortName: 'A CAVERNA',
  slogan: 'Igreja que edifica igreja',
  whatsapp: '5500000000000',
  email: 'contato@example.com',
  address: 'Endereco ficticio - versao de estudo',
  instagram: '@igreja.acaverna',
  navigation: [
    { label: '[INÍCIO]', href: '#inicio' },
    { label: '[A CAVERNA]', href: '#sobre' },
    { label: '[AGENDA]', href: '#agenda' },
    { label: '[CONTATO]', href: '#contato' },
  ],
  manifesto: [
    'FIRMES NA PALAVRA.',
    'FIÉIS A CRISTO.',
    'ENVIADOS AO MUNDO.',
  ],
  proof: [
    'CULTOS',
    'CÉLULAS',
    'CAVERNA KIDS',
    'WORSHIP',
    'AÇÃO SOCIAL',
    'DISCIPULADO',
  ],
  projects: [
    {
      number: '01',
      title: 'CULTOS QUE ACOLHEM',
      tags: 'PALAVRA  •  ADORAÇÃO  •  COMUNHÃO',
      image: '/assets/figma/institutional-02.png',
      alt: 'Momento de culto na Igreja A Caverna',
      href: '#agenda',
    },
    {
      number: '02',
      title: 'VIDA EM COMUNIDADE',
      tags: 'CÉLULAS  •  CUIDADO  •  DISCIPULADO',
      image: '/assets/figma/institutional-04.png',
      alt: 'Líder ministrando em um encontro da comunidade',
      href: '#sobre',
    },
    {
      number: '03',
      title: 'FÉ EM MOVIMENTO',
      tags: 'MISSÃO  •  SERVIÇO  •  PRESENÇA',
      image: '/assets/figma/d01-07.png',
      alt: 'Protagonista da identidade visual da Igreja A Caverna',
      href: '#processo',
    },
  ],
  capacities: [
    { number: '01', name: 'PALAVRA E ENSINO', href: '#agenda' },
    { number: '02', name: 'ADORAÇÃO E COMUNHÃO', href: '#sobre' },
    { number: '03', name: 'CUIDADO E MISSÃO', href: '#processo' },
  ],
  impact: [
    { value: '2018', description: 'ANO DE FUNDAÇÃO' },
    { value: '02', description: 'ENCONTROS SEMANAIS' },
    { value: '06', description: 'FRENTES DE COMUNIDADE' },
    { value: '01', description: 'FAMÍLIA EM CRISTO' },
  ],
  process: [
    { number: '01', title: 'CHEGAR', description: 'Um lugar para ser recebido como você está.' },
    { number: '02', title: 'CONHECER', description: 'Uma comunidade para caminhar com verdade.' },
    { number: '03', title: 'CAMINHAR', description: 'Uma fé vivida em relacionamento e cuidado.' },
    { number: '04', title: 'SERVIR', description: 'Uma missão que alcança a cidade e o mundo.' },
  ],
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(message)}`;
}
