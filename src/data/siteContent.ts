export const siteContent = {
  churchName: 'Igreja A Caverna',
  shortName: 'A CAVERNA',
  slogan: 'Igreja que edifica igreja',
  whatsapp: '5500000000000',
  email: 'contato@example.com',
  address: 'Endereco ficticio - versao de estudo',
  mapsUrl: 'https://exemplo.invalid/utYfXdHRMSNc6bLv8',
  instagram: '@a_cavernaa',
  navigation: [
    { label: '[INÍCIO]', href: '#inicio' },
    { label: '[QUEM SOMOS?]', href: '/a-caverna' },
    { label: '[ATLETAS]', href: '/esportes' },
    { label: '[AGENDA]', href: '/agenda' },
    { label: '[COMUNIDADE]', href: '/comunidade' },
    { label: '[CONTATO]', href: '/contato' },
  ],
  manifesto: [
    'FIRMES NA PALAVRA.',
    'FIÉIS A CRISTO.',
    'ENVIADOS AO MUNDO.',
  ],
  proof: [
    'CULTO PÚBLICO',
    'DISCIPULADO',
    'O REINO EM NÓS',
    'ORAÇÃO',
    'ESPORTES',
    'COMUNIDADE',
  ],
  projects: [
    {
      number: '01',
      title: 'CULTO PÚBLICO',
      tags: 'PALAVRA  •  CRISTO  •  COMUNHÃO',
      image: '/assets/treated/worship.jpeg',
      alt: 'Momento de culto na Igreja A Caverna',
      href: '#agenda',
    },
    {
      number: '02',
      title: 'DISCIPULADO',
      tags: 'PALAVRA  •  ACOMPANHAMENTO  •  FORMAÇÃO',
      image: '/assets/treated/discipulado.jpeg',
      alt: 'Líder ministrando em um encontro da comunidade',
      href: '#sobre',
    },
    {
      number: '03',
      title: 'O REINO EM NÓS',
      tags: 'MISSÃO  •  PRESENÇA  •  SERVIÇO',
      image: '/assets/treated/mission-reino.jpeg',
      alt: 'Protagonista da identidade visual da Igreja A Caverna',
      href: '#processo',
    },
  ],
  capacities: [
    { number: '01', name: 'PALAVRA E ENSINO', href: '#agenda' },
    { number: '02', name: 'DISCIPULADO E COMUNIDADE', href: '#sobre' },
    { number: '03', name: 'O REINO EM NÓS', href: '#processo' },
  ],
  impact: [
    { value: '2016', description: 'INÍCIO EM CEILÂNDIA' },
    { value: '02', description: 'ENCONTROS SEMANAIS' },
    { value: '2017', description: 'CHEGADA AO JARDIM INGÁ' },
    { value: '01', description: 'IGREJA QUE EDIFICA IGREJA' },
  ],
  process: [
    { number: '01', title: 'CHEGAR', description: 'Você pode vir como está. A caminhada começa quando você chega.' },
    { number: '02', title: 'SER RECEBIDO', description: 'Depois do primeiro culto, a gente procura você e permanece por perto.' },
    { number: '03', title: 'CAMINHAR', description: 'A Palavra, a oração e a vida compartilhada formam discípulos.' },
    { number: '04', title: 'SERVIR', description: 'O Reino em Nós transforma a fé recebida em presença e serviço.' },
  ],
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(message)}`;
}
