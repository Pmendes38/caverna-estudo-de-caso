import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { siteContent, whatsappUrl } from '../data/siteContent';
import { SiteHeader, subpageLinks, type PageKey } from './SiteHeader';

const assets = {
  hero: '/assets/figma/d01-01.png',
  community: '/assets/treated/community.jpeg',
  communityHero: '/assets/treated/community-hero.jpeg',
  agendaHero: '/assets/treated/worship.jpeg',
  visitHero: '/assets/treated/visit.jpeg',
  contactHero: '/assets/treated/prayer.jpeg',
  teaching: '/assets/treated/discipulado.jpeg',
  prayer: '/assets/treated/prayer.jpeg',
  worship: '/assets/treated/worship.jpeg',
  outreach: '/assets/treated/mission-reino.jpeg',
  children: '/assets/treated/children.jpeg',
  street: '/assets/treated/mission-andarilhos.jpeg',
  building: '/assets/treated/history-2017.jpeg',
  contribution: '/assets/treated/contribution.jpeg',
  history2013: '/assets/site-images/quem-somos/timeline/2013.jpg',
  history2015: '/assets/site-images/quem-somos/timeline/2015.jpg',
  history2016: '/assets/site-images/quem-somos/timeline/2016.jpg',
  history2017: '/assets/site-images/quem-somos/timeline/2017.jpg',
  history2019: '/assets/site-images/quem-somos/timeline/2019.jpg',
  history2020: '/assets/site-images/quem-somos/timeline/2020.jpg',
  history2025: '/assets/site-images/d04-d06-gallery/d06-01.jpg',
  liturgy: '/assets/site-images/quem-somos/liturgia/culto.jpg',
  houseMesa: '/assets/site-images/quem-somos/casa/mesa.jpg',
  houseCommunity: '/assets/site-images/quem-somos/casa/comunidade.jpg',
  houseLouvor: '/assets/site-images/quem-somos/casa/louvor.png',
  houseInstrumento1: '/assets/site-images/quem-somos/casa/instrumento-01.jpg',
  houseInstrumento2: '/assets/site-images/quem-somos/casa/instrumento-02.jpg',
  missionAmazonia: '/assets/treated/mission-amazonia.jpeg',
  missionReino: '/assets/treated/mission-reino.jpeg',
  sports: '/assets/treated/sports-jiujitsu.jpeg',
  sportsHero: '/assets/treated/sports-hero.jpeg',
  sportsIdentity: '/assets/treated/sports-jiujitsu.jpeg',
  sportsMedal: '/assets/treated/sports-jiujitsu.jpeg',
  sportsPodium: '/assets/treated/sports-taekwondo.jpeg',
  sportsChampion: '/assets/treated/sports-taekwondo.jpeg',
  sportsMedalDetail: '/assets/treated/sports-paintball.jpeg',
};

const pageNames: Record<PageKey, string> = {
  caverna: 'Quem Somos',
  fe: 'Nossa Fé',
  comunidade: 'Comunidade',
  agenda: 'Agenda',
  visite: 'Visite-nos',
  contato: 'Contato e Oração',
  contribua: 'Contribua',
  discipulado: 'Discipulado',
  oracao: 'Oração',
  missoes: 'Missões',
  criancas: 'Crianças e Famílias',
  esportes: 'Esportes da Caverna',
};

function SubpageFooter() {
  return (
    <footer className="subpage-footer">
      <img className="subpage-footer-logo" src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" />
      <div className="subpage-footer-links">
        {subpageLinks.map((link) => <a href={link.href} key={link.key}>{link.label}</a>)}
      </div>
      <p>{siteContent.email}<br />{siteContent.address}</p>
    </footer>
  );
}

function Button({ children, href = '#', light = false }: { children: ReactNode; href?: string; light?: boolean }) {
  return <a className={`subpage-button${light ? ' subpage-button--light' : ''}`} href={href}>{children}</a>;
}

function ImageSlot({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  return <div className={`subpage-image ${className}${src ? '' : ' subpage-image--placeholder'}`} aria-label={src ? alt : undefined}>{src ? <img src={src} alt={alt} /> : null}</div>;
}

function InfoCard({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return <article className={`subpage-info-card${dark ? ' subpage-info-card--dark' : ''}`}><strong>{title}</strong><p>{children}</p></article>;
}

function Field({ label, multiline = false, optional = false }: { label: string; multiline?: boolean; optional?: boolean }) {
  return (
    <label className="subpage-field">
      <span>{label}{optional ? ' (OPCIONAL)' : ''}</span>
      {multiline ? <textarea name={label} rows={4} /> : <input name={label} />}
    </label>
  );
}

function StaticForm({ prayer = false }: { prayer?: boolean }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Array.from(formData.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join('\\n');
    const subject = prayer ? 'Pedido de oração - Igreja A Caverna' : 'Contato pelo site - Igreja A Caverna';
    window.location.href = `mailto:${siteContent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className="subpage-form" onSubmit={handleSubmit}>
      <Field label="NOME" optional={prayer} />
      {!prayer && <Field label="E-MAIL" />}
      {!prayer && <Field label="ASSUNTO" />}
      <Field label={prayer ? 'PEDIDO DE ORAÇÃO' : 'MENSAGEM'} multiline />
      {prayer && <label className="subpage-check"><input name="POSSO ENTRAR EM CONTATO" type="checkbox" /> <span>POSSO ENTRAR EM CONTATO?</span></label>}
      <button className="subpage-button subpage-button--submit" type="submit">{prayer ? 'ENVIAR PEDIDO' : 'ENVIAR MENSAGEM'}&nbsp; →</button>
    </form>
  );
}

function PageFrame({ page, children }: { page: PageKey; children: ReactNode }) {
  return <div className={`subpage subpage--${page}`}><SiteHeader activePage={page} subpage />{children}<SubpageFooter /></div>;
}

function CavernaPage() {
  const [activeMoment, setActiveMoment] = useState<string | null>(null);
  const moments = [
    ['2013', 'A RUA SE TORNA CAMPO', 'Os projetos missionários já alcançavam o Jardim Ingá. A missão acontecia onde as pessoas estavam, antes de existir uma igreja chamada A Caverna.', 'history2013'],
    ['2015', 'A MISSÃO SE EXPANDE', 'As frentes urbanas crescem e alcançam diferentes cidades e realidades. Asilos, escolas, recuperação e pessoas em situação de rua passam a fazer parte de uma rotina intensa de missão.', 'history2015'],
    ['2016', 'A MISSÃO VIRA COMUNIDADE', 'As pessoas alcançadas precisavam de mais do que encontros pontuais. Em fevereiro começam as primeiras reuniões em Ceilândia. A missão começa a ganhar forma de comunidade, e nasce o nome A Caverna.', 'history2016'],
    ['2017', 'A CAVERNA CRIA RAÍZES NO JARDIM INGÁ', 'A comunidade deixa Ceilândia e passa a se reunir no Jardim Ingá, inicialmente na escola Coração de Mãe. Em fevereiro, a Comunidade de Fé A Caverna também é formalmente constituída.', 'history2017'],
    ['2019', 'A MISSÃO MUDA DE LUGAR', 'A igreja troca de templo para um lugar conhecido por um bar famoso do Jardim Ingá. Onde abundou o pecado, superabundou a graça. Hoje, o antigo espaço é um altar de adoração e vida com Deus.', 'history2019'],
    ['2020', 'A PANDEMIA', 'Com a pandemia, os projetos são interrompidos e o cuidado se volta para a igreja e para as famílias. Entre cultos online e encontros nos lares, a comunidade aprende a se estruturar e amadurecer.', 'history2020'],
    ['2025', 'UMA NOVA FASE', 'A origem missionária permanece, mas a visão se amplia. A igreja amadurece sua linguagem e passa a comunicar com mais clareza que o Evangelho não pertence a um perfil específico de pessoas.', 'history2025'],
  ];
  return (
    <PageFrame page="caverna">
      <main>
        <section className="subpage-hero subpage-hero--plum caverna-hero">
          <div className="subpage-hero-copy"><p className="subpage-kicker">[QUEM SOMOS]</p><h1>UMA IGREJA<br />NASCIDA DA MISSÃO</h1><p>Começamos em Ceilândia, em 2016. Em 2017, a missão chegou ao Jardim Ingá e se tornou comunidade.</p></div>
          <ImageSlot alt="Área de destaque da Igreja A Caverna" className="caverna-hero-image" />
        </section>
        <section className="subpage-section subpage-section--paper caverna-history">
          <h2 className="caverna-history-title">NOSSA HISTÓRIA</h2>
          <div className="subpage-history-grid"><div><p>A Caverna não começou com um prédio procurando por pessoas. Começou com gente sendo alcançada nas ruas e com a responsabilidade de permanecer perto, ensinar e cuidar.</p></div><div className="subpage-card-row"><InfoCard title="PERMANECER">A missão não termina quando alguém chega. A gente permanece perto.</InfoCard><InfoCard title="EDIFICAR">Igreja que edifica igreja: pessoas formadas para formar outras pessoas.</InfoCard></div></div>
          <h2 className="subpage-small-heading">MOMENTOS QUE FORMARAM A CAVERNA</h2>
          <div className="caverna-timeline" onMouseLeave={() => setActiveMoment(null)}>
            <div className="caverna-timeline-line" />
            {moments.map(([year, title, text, tone], index) => <button className={`caverna-timeline-item${activeMoment === year ? ' is-active' : ''}`} style={{ '--timeline-index': index } as CSSProperties} type="button" key={year} onMouseEnter={() => setActiveMoment(year)} onFocus={() => setActiveMoment(year)} onClick={() => setActiveMoment(year)}><span className="caverna-timeline-year">{year}</span><span className="caverna-timeline-marker" /><strong>{title}</strong><span>{text}</span></button>)}
            {activeMoment && (() => {
              const moment = moments.find(([year]) => year === activeMoment);
              if (!moment) return null;
              const [year, title, text, tone] = moment;
              const index = moments.findIndex(([momentYear]) => momentYear === year);
              return <aside className={`caverna-timeline-overlay${index === 0 ? ' caverna-timeline-overlay--first' : ''}${index === moments.length - 1 ? ' caverna-timeline-overlay--last' : ''}`} style={{ '--timeline-index': index } as CSSProperties} aria-live="polite"><ImageSlot src={assets[tone as keyof typeof assets] as string} alt={`Registro histórico de ${year}`} className="caverna-timeline-overlay-image" /><div className="caverna-timeline-overlay-copy"><span>{year}</span><h3>{title}</h3><p>{text}</p></div></aside>;
            })()}
          </div>
        </section>
        <section className="subpage-section subpage-section--dark caverna-values"><h2>MISSÃO, VISÃO E VALORES</h2><div className="subpage-card-row"><InfoCard title="MISSÃO" dark>Anunciar o evangelho e edificar a igreja por meio da verdade, da comunhão e do serviço.</InfoCard><InfoCard title="VISÃO" dark>Ser referência de comunidade cristã com identidade, profundidade e presença local.</InfoCard><InfoCard title="VALORES" dark>Cristo no centro. Escritura. Comunidade. Compaixão. Serviço. Edificação.</InfoCard></div></section>
        <section className="subpage-section subpage-section--paper caverna-liturgy"><h2>NOSSA LITURGIA</h2><div className="caverna-liturgy-grid"><div><p>A liturgia da Caverna reúne Palavra, oração, louvor e comunhão. Não é um espetáculo: é a igreja reunida para adorar a Deus e cuidar uns dos outros.</p><p>Em cada encontro, a comunidade aprende a servir com alegria e a permanecer perto.</p></div><ImageSlot src={assets.liturgy} alt="Louvor na Igreja A Caverna" className="slot--plum" /></div></section>
        <section className="subpage-section subpage-section--paper caverna-house"><h2>NOSSA CASA</h2><div className="caverna-gallery"><ImageSlot src={assets.houseMesa} alt="Mesa compartilhada na Igreja A Caverna" className="slot--brown" /><ImageSlot src={assets.houseCommunity} alt="Comunidade reunida na Igreja A Caverna" className="slot--teal" /><ImageSlot src={assets.houseLouvor} alt="Louvor na Igreja A Caverna" className="slot--plum" /><ImageSlot src={assets.houseInstrumento1} alt="Música na Igreja A Caverna" className="slot--gray" /><ImageSlot src={assets.houseInstrumento2} alt="Músico servindo na Igreja A Caverna" className="slot--brown" /></div><p>Mais do que um endereço, nossa casa é um lugar de encontro. Aqui recebemos pessoas, partilhamos a vida e construímos uma comunidade centrada em Cristo.</p></section>
        <section className="subpage-cta"><h2>VENHA CONHECER<br />A NOSSA FAMÍLIA</h2><div><p>Descubra como a Caverna une missão, fé e vida compartilhada para formar pessoas que caminham juntas.</p><Button href="/nossa-fe">CONHEÇA O QUE CREMOS&nbsp; →</Button><Button href="/comunidade">COMECE A CAMINHAR&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function FaithPage() {
  const affirmations = [
    ['ESCRITURA', 'A Bíblia é nossa única regra infalível de fé e prática. Toda doutrina, tradição e experiência devem ser examinadas à sua luz.'],
    ['DEUS TRIUNO', 'Há um só Deus, eterno e santo, que existe como Pai, Filho e Espírito Santo: três pessoas, uma só natureza divina.'],
    ['CRIAÇÃO E QUEDA', 'Cada pessoa carrega dignidade por ter sido criada à imagem de Deus, mas o pecado rompeu nossa comunhão com ele e revela nossa necessidade de reconciliação.'],
    ['JESUS CRISTO', 'Verdadeiro Deus e verdadeiro homem, Jesus viveu em obediência, morreu por nossos pecados, ressuscitou e reina como único Senhor e Salvador.'],
    ['GRAÇA E VIDA', 'A salvação é dom gratuito, recebido por arrependimento e fé, não por obras. Alcançados pela graça, somos chamados à santidade, comunhão e serviço.'],
    ['IGREJA E MISSÃO', 'A igreja pertence a Cristo: adora, ensina, ora, cuida e forma discípulos. Todo discípulo participa da missão, começando onde Deus o colocou.'],
  ];
  const rejectedTeachings = [
    ['NÃO É TEOLOGIA LIBERAL', 'A verdade bíblica não é reescrita para caber no espírito do tempo.'],
    ['NÃO É COACHING', 'O púlpito não existe para vender performance ou autoajuda.'],
    ['NÃO É PROSPERIDADE', 'O evangelho não é promessa de riqueza, status ou vida sem sofrimento.'],
    ['NÃO É UNIVERSALISMO RELIGIOSO', 'Não ensinamos que todos os caminhos levam a Deus. A salvação está em Jesus Cristo, não em uma espiritualidade genérica.'],
    ['NÃO É REVELAÇÃO ACIMA DA ESCRITURA', 'Profecias, experiências e opiniões precisam ser examinadas pela Bíblia. Nenhuma voz humana está acima da Palavra.'],
    ['NÃO É SALVAÇÃO POR MÉRITO RELIGIOSO', 'Ninguém compra, conquista ou completa a salvação por obras, ritos, ofertas ou desempenho. Somos salvos pela graça, mediante a fé.'],
    ['NÃO É ESPIRITUALIDADE SEM SANTIDADE', 'A graça não é uma licença para permanecer no pecado. Quem foi alcançado por Cristo é chamado a uma vida transformada.'],
    ['NÃO É IGREJA DE CONSUMO', 'A igreja não existe para oferecer experiências, serviços ou benefícios religiosos. Ela forma discípulos para viver em comunhão, serviço e missão.'],
    ['NÃO É ESPETÁCULO DO SOBRENATURAL', 'O Espírito Santo não é usado para autopromoção. Dons devem servir à edificação da igreja, com amor, ordem e discernimento.'],
  ];
  return (
    <PageFrame page="fe">
      <main>
        <section className="subpage-hero subpage-hero--dark faith-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[NO QUE CREMOS]</p><h1>A PALAVRA É O<br />CHÃO DA CAVERNA</h1><p>Cristo é o centro. A Escritura governa nossa fé, nossa vida e a forma como servimos.</p></div><ImageSlot src={assets.teaching} alt="Estudo bíblico e ensino" className="faith-hero-slot slot--plum" /></section>
        <section className="subpage-section subpage-section--paper faith-affirm"><h2>O QUE CREMOS EM VOZ ALTA</h2><div className="subpage-card-grid">{affirmations.map(([title, text]) => <InfoCard title={title} key={title}>{text}</InfoCard>)}</div><div className="faith-confession"><strong>UMA CONFISSÃO EM RESUMO</strong><p>Cremos no Deus Triuno, na autoridade das Escrituras, em Jesus Cristo como único Senhor e Salvador e na salvação pela graça. Vivemos como igreja para formar discípulos, anunciar o evangelho e aguardar a volta de Cristo.</p><small>CONHEÇA O QUE NOS FIRMA</small></div></section>
        <section className="subpage-section subpage-section--plum faith-limits"><p className="subpage-kicker">O QUE NÃO ENSINAMOS</p><p className="subpage-lead">Nossa identidade também aparece naquilo que recusamos transformar em evangelho.</p><div className="subpage-card-grid faith-limits-grid">{rejectedTeachings.map(([title, text]) => <InfoCard title={title} dark key={title}>{text}</InfoCard>)}</div></section>
        <section className="subpage-cta"><h2>DOUTRINA NÃO É<br />DECORAÇÃO</h2><div><p>Ela define como cremos, vivemos, servimos e caminhamos juntos.</p><Button href="/comunidade">CONHEÇA A COMUNIDADE&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function CommunityPage() {
  const paths = [['DISCIPULADO', 'Quintas, 19H30. Palavra, acompanhamento e formação de discípulos.', 'slot--plum', '/discipulado', assets.teaching], ['ORAÇÃO', 'Orar, ouvir e carregar uns aos outros diante de Deus.', 'slot--teal', '/oracao', assets.prayer], ['VIDA COMPARTILHADA', 'Não é plateia: é gente que conhece, cuida, serve e se deixa formar.', 'slot--gold', '/visite-nos', assets.community]];
  return (
    <PageFrame page="comunidade">
      <main>
        <section className="subpage-hero subpage-hero--plum subpage-community-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[VIDA EM COMUNIDADE]</p><h1>ENCONTRE UMA FAMÍLIA<br />CAMINHE COM A GENTE</h1><p>Na Caverna, você não é só mais um rosto. Chegue, seja recebido e encontre gente disposta a viver a fé perto de você durante a semana.</p></div><ImageSlot src={assets.communityHero} alt="Comunidade reunida em culto" className="slot--brown" /></section>
        <section className="subpage-section subpage-section--paper community-paths"><h2>COMO A GENTE CAMINHA</h2><div className="community-photo-grid">{paths.map(([title, text, slot, href, src]) => <a className="community-path-card" href={href} key={title}><ImageSlot src={src} alt={title} className={slot} /><h3>{title}</h3><p>{text}</p></a>)}</div></section>
        <section className="subpage-section subpage-section--dark community-projects"><h2>O RITMO DA COMUNIDADE</h2><div className="community-schedule-list"><InfoCard title="CULTO PÚBLICO" dark>Sábados, 19H30. Venha cultuar, ouvir a Palavra e encontrar a comunidade.</InfoCard><InfoCard title="DISCIPULADO" dark>Quintas, 19H30. Venha aprender, conversar e crescer com outros discípulos.</InfoCard><InfoCard title="ESPORTES DA CAVERNA" dark>Atletas apoiados e Sons of Caverna uma vez ao mês. Encontre seu lugar para conviver.</InfoCard></div><p className="community-presence">Quem chega é recebido, lembrado e procurado. Para ser Caverna, basta vir. Dê o primeiro passo e deixe a comunidade caminhar perto de você.</p></section>
        <section className="subpage-cta"><h2>ENCONTRE SUA FAMÍLIA<br />COMECE A CAMINHAR</h2><div><p>A igreja não é só aos sábados. Venha viver uma fé que aprende, ora e atravessa a vida unida.</p><Button href="/visite-nos">DÊ O PRIMEIRO PASSO&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function SportsPage() {
  const modalities = [['JIU-JITSU', '3 atletas apoiados pela Caverna.', 'slot--plum', assets.sports], ['JUDÔ', '2 atletas apoiados pela Caverna.', 'slot--teal', assets.sportsMedal], ['TAEKWONDO', '1 atleta apoiado pela Caverna.', 'slot--gold', assets.sportsChampion]];

  return (
    <PageFrame page="esportes">
      <main>
        <section className="subpage-hero subpage-hero--plum subpage-community-hero sports-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[ESPORTES DA CAVERNA]</p><h1>ESPORTE TAMBÉM É<br />VIDA EM COMUNIDADE</h1><p>Apoiamos 3 atletas de jiu-jitsu, 2 de judô e 1 de taekwondo. Também caminhamos com o Sons of Caverna, nossa equipe de paintball.</p></div><ImageSlot src={assets.sportsHero} alt="Atletas da Igreja A Caverna" className="slot--brown" /></section>
        <section className="subpage-section subpage-section--paper sports-modalities"><h2>ESPORTES DA CAVERNA</h2><div className="community-photo-grid">{modalities.map(([title, text, slot, src]) => <article className="community-path-card" key={title}><ImageSlot src={src} alt={title} className={slot} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className="subpage-section subpage-section--dark sports-paintball"><h2>PAINTBALL E APOIO A ATLETAS</h2><div className="sports-support-grid"><InfoCard title="PAINTBALL" dark>Sons of Caverna. Encontro mensal, aberto a participações.</InfoCard><InfoCard title="APOIO A ATLETAS" dark>Apoio atual a trajetórias de jiu-jitsu, judô e taekwondo.</InfoCard><InfoCard title="COMO A GENTE APOIA" dark>Apoiamos atletas e fazemos do esporte parte da nossa vida em comunidade.</InfoCard></div></section>
        <section className="subpage-cta"><h2>DISCIPLINA TAMBÉM É<br />UMA FORMA DE CAMINHAR</h2><div><p>O esporte aproxima pessoas, exige constância e se torna parte da caminhada da comunidade.</p><Button href="/contato">FALE COM A EQUIPE&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

type MinistryDetail = {
  page: Extract<PageKey, 'discipulado' | 'oracao' | 'missoes' | 'criancas'>;
  kicker: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  cards: Array<[string, string]>;
  cta: string;
  ctaHref: string;
};

const ministryDetails: Record<MinistryDetail['page'], Omit<MinistryDetail, 'page'>> = {
  discipulado: {
    kicker: '[DISCIPULADO]',
    title: <>CRESCER NA PALAVRA<br />CAMINHAR EM COMUNHÃO</>,
    description: 'A Caverna nasceu quando anunciar Cristo também passou a significar permanecer, ensinar e acompanhar pessoas.',
    image: assets.teaching,
    imageAlt: 'Leitura da Bíblia em um momento de discipulado',
    cards: [['PALAVRA', 'A Escritura orienta nossa fé, nossas conversas e nossas decisões.'], ['PROXIMIDADE', 'Depois de chegar, a pessoa é lembrada e acompanhada de perto.'], ['FORMAÇÃO', 'Discipulado é aprender a seguir Cristo com outros, ao longo da vida.']],
    cta: 'CONHEÇA A COMUNIDADE',
    ctaHref: '/comunidade',
  },
  oracao: {
    kicker: '[ORAÇÃO]',
    title: <>DEIXE ALGUÉM<br />ORAR COM VOCÊ</>,
    description: 'Você não precisa atravessar tudo sozinho. Compartilhe seu pedido e deixe a comunidade levar isso a Deus com você.',
    image: assets.prayer,
    imageAlt: 'Momento de oração e intercessão',
    cards: [['ESCUTA', 'Conte o que você está vivendo. Recebemos seu pedido com respeito, cuidado e discrição.'], ['INTERCESSÃO', 'Deixe que a comunidade ore com você e leve suas necessidades diante de Deus.'], ['ACOMPANHAMENTO', 'Se quiser continuar a conversa, estaremos perto para ajudar no próximo passo.']],
    cta: 'PEDIR ORAÇÃO',
    ctaHref: '/contato#oracao',
  },
  missoes: {
    kicker: '[MISSÕES]',
    title: <>A MISSÃO<br />VEIO ANTES DO TEMPLO</>,
    description: 'A missão está na origem da Caverna. O Reino em Nós organiza frentes que anunciam Cristo com presença, serviço e cuidado.',
    image: assets.outreach,
    imageAlt: 'Ação missionária da comunidade',
    cards: [['REINO EM NÓS', 'O projeto-mãe que reúne as frentes missionárias da Caverna.'], ['PRESENÇA', 'As ações alcançam as pessoas onde elas estão: asilo, orfanato, escolas e ruas.'], ['SERVIÇO', 'Anunciar Cristo também é permanecer perto, cuidar e servir.']],
    cta: 'VER A COMUNIDADE',
    ctaHref: '/comunidade',
  },
  criancas: {
    kicker: '[COMUNIDADE]',
    title: <>UMA FAMÍLIA<br />QUE CAMINHA UNIDA</>,
    description: 'Na Caverna, você não precisa conhecer ninguém antes de chegar. Venha; a comunidade começa a caminhar perto de você.',
    image: assets.community,
    imageAlt: 'Pessoas participando da vida comunitária da Igreja A Caverna',
    cards: [['CHEGAR', 'Para ser Caverna, basta vir.'], ['SER RECEBIDO', 'Depois do primeiro culto, a gente procura você e continua perto.'], ['CAMINHAR', 'A vida da igreja acontece também fora dos encontros.']],
    cta: 'PLANEJE SUA VISITA',
    ctaHref: '/visite-nos',
  },
};

function MinistryPage({ page }: { page: MinistryDetail['page'] }) {
  if (page === 'missoes') return <MissionPage />;
  const detail = ministryDetails[page];
  return (
    <PageFrame page={page}>
      <main>
        <section className="subpage-hero subpage-hero--plum ministry-detail-hero">
          <div className="subpage-hero-copy"><p className="subpage-kicker">{detail.kicker}</p><h1>{detail.title}</h1><p>{detail.description}</p></div>
          <ImageSlot src={detail.image} alt={detail.imageAlt} className="slot--plum" />
        </section>
        <section className="subpage-section subpage-section--paper ministry-detail-values">
          <p className="subpage-kicker">COMO CAMINHAMOS</p>
          <h2>UMA FRENTE<br />DE CUIDADO</h2>
          <div className="subpage-card-row">{detail.cards.map(([title, text]) => <InfoCard title={title} key={title}>{text}</InfoCard>)}</div>
        </section>
        <section className="subpage-section subpage-section--dark ministry-detail-story">
          <div className="contribution-destination-grid"><ImageSlot src={detail.image} alt={detail.imageAlt} className="slot--teal" /><div><p className="subpage-kicker">VIDA COMPARTILHADA</p><h2>CAMINHAR<br />JUNTO MUDA<br />TUDO</h2><p>Na A Caverna, esta frente existe para transformar intenção em presença. Fale com a equipe e descubra como participar.</p></div></div>
        </section>
        <section className="subpage-cta"><h2>HÁ UM PRÓXIMO<br />PASSO PARA VOCÊ</h2><div><p>Conheça a comunidade e encontre uma forma concreta de caminhar conosco.</p><Button href={detail.ctaHref}>{detail.cta}&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function MissionPage() {
  const paths = [
    ['REINO EM NÓS', 'A frente que reúne e orienta os projetos missionários da Caverna.', 'mission-path mission-path--plum'],
    ['POSSO ORAR POR VOCÊ', 'Pare, converse e deixe alguém orar com você.', 'mission-path mission-path--teal'],
    ['REINO NAS ESCOLAS', 'Evangelismo e cuidado nas escolas, além de ações em asilos, orfanatos e ruas.', 'mission-path mission-path--gold'],
  ];
  const projects = [
    ['CALDO E PRESENÇA', 'Leve alimento, presença e cuidado para quem atravessa uma fase difícil.', 'mission-project mission-project--teal', assets.outreach],
    ['ANDARILHOS', 'Aproxime-se, escute e sirva pessoas em situação de rua.', 'mission-project mission-project--reverse mission-project--brown', assets.street],
    ['DATAS SAZONAIS', 'Acompanhe a Agenda e descubra quando você pode participar.', 'mission-project mission-project--plum', assets.community],
  ];
  return (
    <PageFrame page="missoes">
      <main className="mission-page">
        <section className="subpage-hero subpage-hero--plum mission-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[MISSÃO]</p><h1>A MISSÃO VEIO<br className="mission-desktop-break" /> ANTES DO TEMPLO</h1><p>A Caverna nasceu da missão. O Reino em Nós reúne as frentes missionárias; venha anunciar Cristo, permanecer perto, ensinar, acompanhar e servir.</p></div><ImageSlot src={assets.outreach} alt="Foto de uma ação missionária" className="slot--brown" /></section>
        <section className="mission-paths"><h2>ONDE A MISSÃO TOMA FORMA</h2><div className="mission-path-grid">{paths.map(([title, text, className]) => <article className="mission-path-card" key={title}><div className={`mission-color-slot ${className}`} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className="mission-projects"><h2>PROJETOS EM MOVIMENTO</h2><div className="mission-project-list">{projects.map(([title, text, className, src]) => <article className={className} key={title}><div className="mission-project-image" style={{ backgroundImage: `url(${src})` }} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
        <section className="mission-cta"><h2>ANUNCIAR PERMANECER<br />E SERVIR</h2><div><p>O Reino em Nós reúne as frentes da Caverna. Escolha um caminho, venha conhecer e encontre uma forma de servir com a comunidade.</p><Button href="/contato">QUERO SERVIR&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function AgendaPage() {
  return (
    <PageFrame page="agenda">
      <main>
        <section className="subpage-hero subpage-hero--dark agenda-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[AGENDA]</p><h1>A IGREJA SE REÚNE<br />DURANTE A SEMANA</h1><p>Discipulado às quintas, culto público aos sábados e Reino em Nós em datas sazonais.</p></div><ImageSlot src={assets.agendaHero} alt="Culto, púlpito ou louvor" className="agenda-hero-slot slot--gray" /></section>
        <section className="subpage-section subpage-section--paper agenda-regular"><h2>QUANDO A CAVERNA SE REÚNE</h2><div className="agenda-schedule-list"><InfoCard title="QUINTA-FEIRA · 19H30">DISCIPULADO<br /><small>Ensino da Palavra, proximidade e formação de discípulos.</small></InfoCard><InfoCard title="SÁBADO · 19H30">CULTO PÚBLICO<br /><small>Encontro aberto para cultuar, ouvir a Palavra e estar com a comunidade.</small></InfoCard><a className="agenda-whatsapp" href={whatsappUrl('Olá! Gostaria de confirmar a programação da Caverna.')}>CONFIRMAR PELO WHATSAPP&nbsp; →<span>A programação sazonal pode mudar. Fale com a equipe.</span></a></div></section>
        <section className="subpage-section subpage-section--plum agenda-events"><h2>PROJETOS MISSIONÁRIOS</h2><div className="agenda-event-grid"><ImageSlot src={assets.missionReino} alt="Projeto missionário" className="slot--brown" /><div className="agenda-event-copy"><InfoCard title="DATAS SAZONAIS" dark>As frentes do Reino em Nós são marcadas conforme cada período. Confirme pelo WhatsApp.</InfoCard><InfoCard title="ACOMPANHE AS ATUALIZAÇÕES" dark>Instagram: @a_cavernaa</InfoCard></div></div></section>
        <section className="subpage-cta"><h2>PLANEJE SUA<br />PRIMEIRA VISITA</h2><div><p>Quintas e sábados, às 19H30. Se precisar de orientação, fale com a gente.</p><Button href="/visite-nos">VISITE-NOS&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function VisitPage() {
  const mapsQuery = encodeURIComponent(`${siteContent.churchName}, ${siteContent.address}`);
  return (
    <PageFrame page="visite">
      <main>
        <section className="subpage-hero subpage-hero--plum visit-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[VISITE-NOS]</p><h1>VÁ COMO VOCÊ ESTÁ<br />A GENTE TE RECEBE</h1><p>Venha sozinho ou acompanhado. Dê o primeiro passo; a gente chega perto e continua caminhando com você.</p><div className="accent-rule" /></div><ImageSlot src={assets.visitHero} alt="Recepção da Igreja A Caverna" className="slot--brown" /></section>
        <section className="subpage-section subpage-section--paper visit-plan"><p className="subpage-kicker">ANTES DE CHEGAR</p><div className="subpage-card-row"><InfoCard title="HORÁRIOS">Quinta, 19H30 · discipulado<br />Sábado, 19H30 · culto público</InfoCard><InfoCard title="PRIMEIRA VEZ">Venha como está.<br />Dê o primeiro passo; a gente recebe você e continua perto.</InfoCard><InfoCard title="ACESSO">Jardim Ingá, Luziânia/GO<br />Chame a equipe e confirme a rota.</InfoCard></div></section>
        <section className="subpage-section subpage-section--dark visit-arrival"><p className="subpage-kicker">O CAMINHO ATÉ A CAVERNA</p><h2>ENCONTRE UMA FAMÍLIA<br />COMECE A CAMINHAR</h2><div className="visit-arrival-grid"><div className="subpage-map"><iframe title="Localização da Igreja A Caverna" src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`} loading="lazy" /><a className="map-open-link" href={siteContent.mapsUrl} target="_blank" rel="noreferrer">ABRIR LOCALIZAÇÃO&nbsp; ↗</a></div><div className="visit-arrival-copy"><InfoCard title="COMO CHEGAR" dark>Jardim Ingá, Luziânia · GO<br />Confira a rota e venha encontrar a comunidade.</InfoCard><InfoCard title="O QUE ESPERAR" dark>Pessoas reais, culto cristão e um lugar para começar a caminhar.</InfoCard><InfoCard title="PRECISA DE AJUDA?" dark>Fale com a equipe antes de vir; vamos orientar sua chegada.</InfoCard></div></div></section>
        <section className="subpage-section subpage-section--paper visit-faq"><p className="subpage-kicker">PERGUNTAS DE QUEM VEM<br />PELA PRIMEIRA VEZ</p>{['Preciso me vestir de alguma forma específica?', 'Posso ir mesmo sem conhecer ninguém?', 'Posso ir com minha família?'].map(question => <details key={question}><summary>{question}<span>+</span></summary><p>Não há código de vestimenta. Venha como está; a gente recebe você, apresenta a comunidade e continua perto.</p></details>)}</section>
      </main>
    </PageFrame>
  );
}

function ContactPage() {
  return (
    <PageFrame page="contato">
      <main>
        <section className="subpage-hero subpage-hero--dark contact-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[CONTATO E ORAÇÃO]</p><h1>NÃO CARREGUE<br />SOZINHO</h1><p>Se você precisa de oração ou quer conversar, deixe uma mensagem. Vamos ouvir você e caminhar perto.</p></div><ImageSlot src={assets.contactHero} alt="Cuidado em comunidade" className="slot--brown" /></section>
        <section className="subpage-section subpage-section--paper contact-form-section"><div className="form-section-grid"><div><p className="subpage-kicker">FALE COM A GENTE</p><h2>CONTATO GERAL</h2><p>Envie uma mensagem e a equipe da comunidade responderá assim que possível.</p><StaticForm /></div><div className="contact-side"><ImageSlot src={assets.community} alt="Acolhimento na comunidade" className="slot--plum" /><InfoCard title="OUTROS CANAIS">WhatsApp: (00) 00000-0000<br />Instagram: @a_cavernaa</InfoCard></div></div></section>
        <section id="oracao" className="subpage-section subpage-section--plum prayer-section"><div className="form-section-grid"><div className="prayer-copy"><p className="subpage-kicker">PEDIDO DE ORAÇÃO</p><h2>PODEMOS ORAR<br />POR VOCÊ</h2><p>Compartilhe seu pedido, identificado ou anônimo, e deixe alguém interceder com você.</p><ImageSlot src={assets.prayer} alt="Intercessão em comunidade" className="slot--teal" /></div><StaticForm prayer /></div></section>
      </main>
    </PageFrame>
  );
}

function ContributionPage() {
  return (
    <PageFrame page="contribua">
      <main>
        <section className="subpage-hero subpage-hero--brown contribution-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[CONTRIBUA]</p><h1>GENEROSIDADE<br />NÃO É PRODUTO</h1><p>Contribuir é participar da missão e da vida da comunidade com liberdade, consciência e responsabilidade.</p></div><ImageSlot src={assets.contribution} alt="Partilha e serviço" className="slot--plum" /></section>
        <section className="subpage-section subpage-section--paper contribution-methods"><p className="subpage-kicker">FORMAS DE CONTRIBUIR</p><div className="subpage-card-row"><InfoCard title="PIX">Fale com a equipe para receber os dados e contribuir com segurança.</InfoCard><InfoCard title="OUTRAS FORMAS">Prefere outra forma? Converse com a equipe e encontre o melhor caminho.</InfoCard><InfoCard title="QUER PARTICIPAR?">Dê um passo concreto para fazer parte do que a comunidade está construindo.</InfoCard></div></section>
        <section className="subpage-section subpage-section--dark contribution-destination"><div className="contribution-destination-grid"><ImageSlot src={assets.community} alt="Serviço da comunidade" className="slot--teal" /><div><p className="subpage-kicker">PARA ONDE VAI</p><h2>SUA GENEROSIDADE<br />VIRA CUIDADO</h2><p>Os recursos ajudam a manter a vida da igreja, o cuidado com pessoas, a missão e a edificação da comunidade.</p><Button href="/contato">QUERO PARTICIPAR</Button></div></div></section>
        <section className="subpage-section subpage-section--paper contribution-principles"><p className="subpage-kicker">COMO ENTENDEMOS A CONTRIBUIÇÃO</p><div className="subpage-card-row"><InfoCard title="LIBERDADE">Contribua porque deseja participar, sem coerção, promessa de retorno ou barganha espiritual.</InfoCard><InfoCard title="RESPONSABILIDADE">Pergunte, acompanhe e ajude a construir uma igreja que cuida com transparência.</InfoCard><InfoCard title="COMUNIDADE">Seus recursos ajudam a manter pessoas, missão e edificação em movimento.</InfoCard></div></section>
      </main>
    </PageFrame>
  );
}

export function Subpage({ page }: { page: PageKey }) {
  switch (page) {
    case 'caverna': return <CavernaPage />;
    case 'fe': return <FaithPage />;
    case 'comunidade': return <CommunityPage />;
    case 'agenda': return <AgendaPage />;
    case 'visite': return <VisitPage />;
    case 'contato': return <ContactPage />;
    case 'contribua': return <ContributionPage />;
    case 'esportes': return <SportsPage />;
    case 'discipulado': return <MinistryPage page="discipulado" />;
    case 'oracao': return <MinistryPage page="oracao" />;
    case 'missoes': return <MinistryPage page="missoes" />;
    case 'criancas': return <MinistryPage page="criancas" />;
    default: return <CavernaPage />;
  }
}

export function pageKeyFromPath(pathname: string): PageKey | null {
  const match = Object.entries({
    '/a-caverna': 'caverna',
    '/nossa-fe': 'fe',
    '/comunidade': 'comunidade',
    '/agenda': 'agenda',
    '/visite-nos': 'visite',
    '/contato': 'contato',
    '/contribua': 'contribua',
    '/esportes': 'esportes',
    '/discipulado': 'discipulado',
    '/oracao': 'oracao',
    '/missoes': 'missoes',
    '/criancas-familias': 'criancas',
  }).find(([path]) => pathname === path);
  return match ? match[1] as PageKey : null;
}

export { pageNames };
