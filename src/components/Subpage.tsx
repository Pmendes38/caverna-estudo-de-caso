import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { siteContent, whatsappUrl } from '../data/siteContent';
import { SiteHeader, subpageLinks, type PageKey } from './SiteHeader';

const assets = {
  hero: '/assets/figma/d01-01.png',
  cavernaHero: '/assets/attached/caverna-missao-hero.jpg',
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
  houseGallery1: '/assets/site-images/quem-somos/casa/galeria-01-fachada-principal.jpg',
  houseGallery2: '/assets/site-images/quem-somos/casa/galeria-02-grafite-jesus.jpg',
  houseGallery3: '/assets/site-images/quem-somos/casa/galeria-03-grafite-leao.jpg',
  houseGallery4: '/assets/site-images/quem-somos/casa/galeria-04-grafite-no-meio-do-caminho.jpg',
  houseGallery5: '/assets/site-images/quem-somos/casa/galeria-05-grafite-agua-viva.jpg',
  houseGallery6: '/assets/site-images/quem-somos/casa/galeria-06-palco-jesus.jpg',
  houseGallery7: '/assets/site-images/quem-somos/casa/galeria-07-mural-cruz-e-ressurreicao.jpg',
  missionAmazonia: '/assets/treated/mission-amazonia.jpeg',
  missionReino: '/assets/treated/mission-reino.jpeg',
  sports: '/assets/treated/sports-jiujitsu.jpeg',
  sportsHero: '/assets/treated/sports-hero.jpeg',
  sportsIdentity: '/assets/treated/sports-jiujitsu.jpeg',
  sportsMedal: '/assets/treated/sports-jiujitsu.jpeg',
  sportsPodium: '/assets/treated/sports-taekwondo.jpeg',
  sportsChampion: '/assets/treated/sports-taekwondo.jpeg',
  sportsMedalDetail: '/assets/treated/sports-paintball.jpeg',
  faithHero: '/assets/site-images/nossa-fe/hero-oracao.jpg',
  faithConfession: '/assets/site-images/nossa-fe/confissao-comunidade.jpg',
  communityBanner: '/assets/site-images/comunidade/banner-comunidade.jpg',
  communityDiscipulado: '/assets/site-images/comunidade/caminhos-discipulado.jpg',
  communityOracao: '/assets/site-images/comunidade/oracao-em-comunidade.jpg',
  communityVida: '/assets/site-images/comunidade/caminhos-vida-compartilhada.png',
  communityCulto: '/assets/site-images/comunidade/ritmo-culto-publico.png',
  communityRitmoDiscipulado: '/assets/site-images/comunidade/ritmo-discipulado.jpeg',
  communityEsportes: '/assets/site-images/comunidade/ritmo-esportes.jpeg',
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
  const footerLinks = subpageLinks.filter(({ key }) => ['caverna', 'fe', 'comunidade', 'agenda', 'visite', 'contato', 'contribua'].includes(key));
  return (
    <footer className="subpage-footer">
      <img className="subpage-footer-logo" src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" />
      <div className="subpage-footer-links">
        {footerLinks.map((link) => <a href={link.href} key={link.key}>{link.label}</a>)}
      </div>
    </footer>
  );
}

function Button({ children, href = '#', light = false }: { children: ReactNode; href?: string; light?: boolean }) {
  return <a className={`subpage-button${light ? ' subpage-button--light' : ''}`} href={href}>{children}</a>;
}

function ImageSlot({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  return <div className={`subpage-image ${className}${src ? '' : ' subpage-image--placeholder'}`} aria-label={src ? alt : undefined}>{src ? <img src={src} alt={alt} /> : null}</div>;
}

function HouseGallery({ items }: { items: Array<{ src: string; alt: string; className: string }> }) {
  return (
    <div className="caverna-gallery" aria-label="Galeria de fotos da nossa casa">
      {items.map((item, index) => (
        <ImageSlot
          src={item.src}
          alt={item.alt}
          className={`${item.className} caverna-gallery-item caverna-gallery-item--${index + 1}`}
          key={item.src}
        />
      ))}
    </div>
  );
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

function TimelineGallery({ year, title, images, onClose }: { year: string; title: string; images: string[]; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const image = images[activeIndex];

  return (
    <div className="caverna-timeline-gallery-backdrop" role="presentation" onClick={onClose}>
      <section className="caverna-timeline-gallery" role="dialog" aria-modal="true" aria-labelledby={`timeline-gallery-title-${year}`} onClick={(event) => event.stopPropagation()}>
        <button className="caverna-timeline-gallery-close" type="button" onClick={onClose} aria-label="Fechar galeria">FECHAR&nbsp; ×</button>
        <div className="caverna-timeline-gallery-media">
          <img src={image} alt={`Registro histórico de ${year}`} />
        </div>
        <div className="caverna-timeline-gallery-copy">
          <span>{year}</span>
          <h3 id={`timeline-gallery-title-${year}`}>{title}</h3>
          <div className="caverna-timeline-gallery-controls">
            <button type="button" onClick={() => setActiveIndex(Math.max(activeIndex - 1, 0))} disabled={activeIndex === 0} aria-label="Imagem anterior">←</button>
            <span>{activeIndex + 1} / {images.length}</span>
            <button type="button" onClick={() => setActiveIndex(Math.min(activeIndex + 1, images.length - 1))} disabled={activeIndex === images.length - 1} aria-label="Próxima imagem">→</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelinePreview({ year, title, text, image, onOpen }: { year: string; title: string; text: string; image: string; onOpen: () => void }) {
  return (
    <button className="caverna-timeline-preview" type="button" onClick={onOpen} aria-label={`Abrir galeria de ${year}`}>
      <ImageSlot src={image} alt={`Registro histórico de ${year}`} className="caverna-timeline-preview-image" />
      <span className="caverna-timeline-preview-copy">
        <span>{year}</span>
        <strong>{title}</strong>
        <span>{text}</span>
        <span className="caverna-timeline-preview-cta">VER MAIS&nbsp; →</span>
      </span>
    </button>
  );
}

function CavernaPage() {
  const [activeMoment, setActiveMoment] = useState<string | null>(null);
  const [previewMoment, setPreviewMoment] = useState<string | null>(null);
  const [showAllMoments, setShowAllMoments] = useState(false);
  const touchPreviewPending = useRef(false);
  const moments = [
    ['2013', 'A RUA SE TORNA CAMPO', 'Os projetos missionários já alcançavam o Jardim Ingá. A missão acontecia onde as pessoas estavam, antes de existir uma igreja chamada A Caverna.', 'history2013'],
    ['2015', 'A MISSÃO SE EXPANDE', 'As frentes urbanas crescem e alcançam diferentes cidades e realidades. Asilos, escolas, recuperação e pessoas em situação de rua passam a fazer parte de uma rotina intensa de missão.', 'history2015'],
    ['2016', 'A MISSÃO VIRA COMUNIDADE', 'As pessoas alcançadas precisavam de mais do que encontros pontuais. Em fevereiro começam as primeiras reuniões em Ceilândia. A missão começa a ganhar forma de comunidade, e nasce o nome A Caverna.', 'history2016'],
    ['2017', 'A CAVERNA CRIA RAÍZES NO JARDIM INGÁ', 'A comunidade deixa Ceilândia e passa a se reunir no Jardim Ingá, inicialmente na escola Coração de Mãe. Em fevereiro, a Comunidade de Fé A Caverna também é formalmente constituída.', 'history2017'],
    ['2019', 'A MISSÃO MUDA DE LUGAR', 'A igreja troca de templo para um lugar conhecido por um bar famoso do Jardim do Ingá. Onde abundou o pecado, superabundou a graça (Romanos 5:20). O lugar se tornou um altar de adoração: onde havia prostituição, bebidas e mortes, hoje há adoração e vida com Deus.', 'history2019'],
    ['2020', 'A PANDEMIA', 'Com a pandemia, os projetos são interrompidos e o cuidado se volta para a igreja e para as famílias. Entre cultos online e encontros nos lares, a comunidade aprende a se estruturar e amadurecer.', 'history2020'],
    ['2025', 'UMA NOVA FASE', 'A origem missionária permanece, mas a visão se amplia. A igreja amadurece sua linguagem e passa a usar o nome Igreja AC, buscando comunicar com mais clareza que o Evangelho não pertence a um perfil específico de pessoas.', 'history2025'],
  ];
  const timelineGalleries: Record<string, string[]> = {
    '2013': [assets.history2013],
    '2015': [assets.history2015],
    '2016': [assets.history2016],
    '2017': [assets.history2017],
    '2019': [assets.history2019],
    '2020': [assets.history2020],
    '2025': [assets.history2025],
  };
  const openMoment = (year: string) => {
    setPreviewMoment(year);
    setActiveMoment(year);
  };

  return (
    <PageFrame page="caverna">
      <main>
        <section className="subpage-hero subpage-hero--plum caverna-hero">
          <div className="subpage-hero-copy"><p className="subpage-kicker">[QUEM SOMOS]</p><h1 aria-label="UMA IGREJA QUE NASCEU DA MISSÃO"><span className="caverna-heading-desktop">UMA IGREJA QUE<br />NASCEU DA MISSÃO</span><span className="caverna-heading-responsive">UMA IGREJA<br />QUE NASCEU<br />DA MISSÃO</span></h1><p>Começamos em Ceilândia, em 2016. Em 2017, a missão chegou ao Jardim Ingá e se tornou comunidade.</p></div>
          <ImageSlot src={assets.cavernaHero} alt="Ação missionária da Igreja A Caverna" className="caverna-hero-image" />
        </section>
        <section className="subpage-section subpage-section--paper caverna-history">
          <h2 className="caverna-history-title">NOSSA HISTÓRIA</h2>
          <div className="subpage-history-grid"><div><p>A Caverna nasceu nas ruas, entre projetos missionários que alcançavam pessoas em escolas, asilos, casas de recuperação e diferentes contextos da cidade. Mas logo entendemos que anunciar o Evangelho era apenas o começo. Quem chegava precisava encontrar ensino, comunhão, cuidado e alguém disposto a permanecer.</p></div><div className="subpage-card-row"><InfoCard title="ABRIGO">A missão não termina quando alguém chega. A gente permanece perto.</InfoCard><InfoCard title="EDIFICAR">Anunciar o Evangelho não é o fim. A gente permanece para ensinar e formar.</InfoCard></div></div>
          <div className="caverna-history-story"><p>Foi dessa necessidade que a missão começou a se tornar comunidade. Em 2016, as primeiras reuniões deram forma àquilo que depois se tornaria a Igreja A Caverna. Desde então, atravessamos mudanças, aprendemos a cuidar melhor das pessoas e amadurecemos nossa forma de viver aquilo que permanece no centro da nossa história: formar discípulos de Jesus Cristo.</p><a href="/a-caverna">CLIQUE PARA VER NOSSA HISTÓRIA COMPLETA&nbsp; →</a></div>
          <h2 className="subpage-small-heading">MOMENTOS QUE FORMARAM A CAVERNA</h2>
          <div className={`caverna-timeline${showAllMoments ? ' is-expanded' : ''}`} onMouseLeave={() => setPreviewMoment(null)}>
            <div className="caverna-timeline-line" />
            {moments.map(([year, title, text], index) => {
              const image = timelineGalleries[year]?.[0];
              return <div className={`caverna-timeline-item-wrap${index >= 3 ? ' is-mobile-hidden' : ''}${previewMoment === year ? ' is-previewing' : ''}`} key={year}>
                <button className={`caverna-timeline-item${previewMoment === year ? ' is-active' : ''}`} style={{ '--timeline-index': index } as CSSProperties} type="button" onPointerEnter={() => setPreviewMoment(year)} onFocus={() => setPreviewMoment(year)} onPointerDown={(event) => { if (event.pointerType === 'touch') { touchPreviewPending.current = previewMoment !== year; setPreviewMoment(year); } else { touchPreviewPending.current = false; } }} onClick={() => { if (touchPreviewPending.current) { touchPreviewPending.current = false; return; } openMoment(year); }}><span className="caverna-timeline-year">{year}</span><span className="caverna-timeline-marker" /><strong>{title}</strong><span>{text}</span></button>
                {previewMoment === year && image ? <TimelinePreview year={year} title={title} text={text} image={image} onOpen={() => openMoment(year)} /> : null}
              </div>;
            })}
            {activeMoment && (() => {
              const moment = moments.find(([year]) => year === activeMoment);
              if (!moment) return null;
              const [year, title] = moment;
              const images = timelineGalleries[year] ?? [];
              if (!images.length) return null;
              return <TimelineGallery key={year} year={year} title={title} images={images} onClose={() => setActiveMoment(null)} />;
            })()}
          </div>
          <button className="caverna-timeline-more" type="button" aria-expanded={showAllMoments} onClick={() => setShowAllMoments((expanded) => !expanded)}>
            {showAllMoments ? 'MOSTRAR MENOS DA NOSSA HISTÓRIA ↑' : 'VER MAIS DA NOSSA HISTÓRIA →'}
          </button>
        </section>
        <section className="subpage-section subpage-section--dark caverna-values"><h2>MISSÃO, VISÃO E VALORES</h2><div className="subpage-card-row"><InfoCard title="MISSÃO" dark>Anunciar o evangelho e edificar a igreja por meio da verdade, da comunhão e do serviço.</InfoCard><InfoCard title="VISÃO" dark>Ser referência de comunidade cristã com identidade, profundidade e presença local.</InfoCard><InfoCard title="VALORES" dark>Cristo no centro. Escritura. Comunidade. Compaixão. Serviço. Edificação.</InfoCard></div></section>
        <section className="subpage-section subpage-section--paper caverna-liturgy">
          <h2>NOSSA LITURGIA</h2>
          <div className="caverna-liturgy-flow">
            <div className="caverna-liturgy-lead">
              <p className="caverna-liturgy-copy-desktop">Nos reunimos aos sábados, a partir das 19h30. Essa escolha não nasce de uma observância sabática, mas da realidade da nossa comunidade. Muitos de nós trabalham durante a semana em Brasília e enfrentam longos deslocamentos. Por isso, preservamos o domingo como um tempo de descanso, família e vida em casa.</p>
              <p className="caverna-liturgy-copy-desktop">Nosso culto começa com louvor e adoração. Depois, fazemos algo que se tornou parte importante de quem somos: paramos para estar à mesa. Cada pessoa pode trazer algo de casa, contribuir com o que será preparado ou simplesmente chegar. Não é um intervalo e não é um lanche vendido pela igreja. É comunhão.</p>
              <p className="caverna-liturgy-copy-mobile">Nos reunimos aos sábados, às 19h30. Começamos com louvor, seguimos para a mesa e ouvimos a Palavra. É um tempo para adorar, conversar e caminhar juntos como família.</p>
            </div>
            <ImageSlot src={assets.liturgy} alt="Louvor na Igreja A Caverna" className="slot--plum caverna-liturgy-flow-image" />
            <div className="caverna-liturgy-tail">
              <p className="caverna-liturgy-copy-desktop">É nesse momento que conversamos, recebemos quem chegou pela primeira vez, reencontramos quem passou a semana longe e partilhamos a mesa como família.</p>
              <p className="caverna-liturgy-copy-desktop">Depois da comunhão, voltamos nossa atenção para a Palavra de Deus, com ensino e exposição das Escrituras. Não trabalhamos com um horário rígido para encerrar o culto. Queremos ter tempo para adorar, estar juntos e ouvir a Palavra sem transformar a reunião em uma corrida contra o relógio.</p>
              <p className="caverna-liturgy-copy-mobile">Depois da comunhão, voltamos à Palavra de Deus. Sem pressa, queremos adorar, estar juntos e ouvir as Escrituras.</p>
            </div>
          </div>
        </section>
        <section className="subpage-section subpage-section--paper caverna-house"><h2>NOSSA CASA</h2><HouseGallery items={[
          { src: assets.houseGallery1, alt: 'Fachada da Igreja A Caverna', className: 'slot--brown' },
          { src: assets.houseGallery2, alt: 'Grafite de Jesus na Igreja A Caverna', className: 'slot--plum' },
          { src: assets.houseGallery3, alt: 'Grafite de leão na Igreja A Caverna', className: 'slot--gold' },
          { src: assets.houseGallery4, alt: 'Grafite no meio do caminho', className: 'slot--teal' },
          { src: assets.houseGallery5, alt: 'Grafite Água Viva', className: 'slot--teal' },
          { src: assets.houseGallery6, alt: 'Palco da Igreja A Caverna', className: 'slot--plum' },
          { src: assets.houseGallery7, alt: 'Mural da cruz e da ressurreição', className: 'slot--gold' },
        ]} /><div className="caverna-house-copy"><p>A Caverna fica no Jardim Ingá, na Av. Dr. Danton Jobim, Quadra 32, Lote 04, próxima ao tradicional Pit Dog do Jeovan, um dos pontos mais conhecidos da região.</p><p>Nossa casa está em reforma para receber melhor a comunidade. Se você quiser fazer parte dessa construção, pode nos ajudar com contribuições e ofertas.</p><a href="/contribua">CLIQUE PARA VER COMO CONTRIBUIR&nbsp; →</a></div></section>
        <section className="subpage-cta"><h2>UMA IDENTIDADE QUE<br />VEM DA HISTÓRIA</h2><div><p>A história continua: um povo reunido em torno de Cristo para viver, servir e anunciar.</p><Button href="/nossa-fe">NOSSA FÉ&nbsp; →</Button><Button href="/comunidade">CONHEÇA A COMUNIDADE&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function FaithPage() {
  const [showAllAffirmations, setShowAllAffirmations] = useState(false);
  const [showAllLimits, setShowAllLimits] = useState(false);
  const affirmations = [
    ['ESCRITURA', 'A Bíblia é a autoridade para nossa fé e prática; por isso, ela orienta tudo o que ensinamos.'],
    ['DEUS TRIUNO', 'Um só Deus: Pai, Filho e Espírito Santo.'],
    ['JESUS CRISTO', 'Cristo é o centro da salvação, do culto e da vida da igreja.'],
    ['EVANGELHO', 'A boa notícia da graça de Deus em Jesus, anunciada para salvar e formar discípulos.'],
    ['IGREJA', 'Um povo reunido pela Palavra para viver em comunhão, servir e edificar igreja.'],
    ['ESPÍRITO SANTO', 'O Espírito Santo convence, santifica, capacita e conduz o povo de Deus.'],
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
        <section className="subpage-hero subpage-hero--dark faith-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[NO QUE CREMOS]</p><h1>A PALAVRA É O<br />CENTRO DA CAVERNA</h1><p>Cristo é o centro. A Escritura governa nossa fé, nossa vida e a forma como servimos.</p></div><ImageSlot src={assets.faithHero} alt="Comunidade reunida em oração" className="faith-hero-slot slot--plum" /></section>
        <section className="subpage-section subpage-section--paper faith-affirm"><h2>O QUE CREMOS</h2><div className={`subpage-card-grid${showAllAffirmations ? ' is-expanded' : ''}`}>{affirmations.map(([title, text]) => <InfoCard title={title} key={title}>{text}</InfoCard>)}</div><button className="faith-more-button" type="button" aria-expanded={showAllAffirmations} onClick={() => setShowAllAffirmations((expanded) => !expanded)}>{showAllAffirmations ? 'OCULTAR FUNDAMENTOS ↑' : 'VER MAIS FUNDAMENTOS →'}</button><div className="faith-confession"><ImageSlot src={assets.faithConfession} alt="Comunidade reunida em oração" className="faith-confession-image" /><div className="faith-confession-content"><strong>UMA CONFISSÃO EM RESUMO</strong><p className="faith-confession-copy faith-confession-copy--desktop">Cremos no Deus Triuno, Pai, Filho e Espírito Santo. Em Jesus Cristo está o centro da salvação. A Escritura orienta nossa fé e prática; por ela, aprendemos a viver em santidade, comunhão, serviço e missão.</p><p className="faith-confession-copy faith-confession-copy--compact">Deus Triuno. Salvação em Jesus Cristo. Escritura como autoridade. Igreja como povo que adora, aprende, serve e anuncia.</p><small>LEIA OS TEMAS ACIMA COM CALMA</small></div></div></section>
        <section className="subpage-section subpage-section--plum faith-limits"><h2>O QUE NÃO ENSINAMOS</h2><p className="subpage-lead">Nossa identidade também aparece nos limites.</p><div className={`subpage-card-grid faith-limits-grid${showAllLimits ? ' is-expanded' : ''}`}>{rejectedTeachings.map(([title, text]) => <InfoCard title={title} dark key={title}>{text}</InfoCard>)}</div><button className="faith-more-button faith-more-button--limits" type="button" aria-expanded={showAllLimits} onClick={() => setShowAllLimits((expanded) => !expanded)}>{showAllLimits ? 'OCULTAR LIMITES ↑' : 'VER MAIS LIMITES →'}</button></section>
        <section className="subpage-cta"><h2>DOUTRINA NÃO É<br />DECORAÇÃO</h2><div><p>Ela define como cremos, vivemos, servimos e caminhamos juntos.</p><Button href="/comunidade">CONHEÇA A COMUNIDADE&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function CommunityPage() {
  const paths = [
    ['DISCIPULADO', 'Quintas, 19H30. Palavra, acompanhamento e formação de discípulos.', 'Quintas, 19H30. Palavra, cuidado e formação de discípulos.', 'slot--plum', '/discipulado', assets.communityDiscipulado],
    ['ORAÇÃO', 'Orar, ouvir e carregar uns aos outros diante de Deus.', 'Orar, ouvir e carregar uns aos outros diante de Deus.', 'slot--teal', '/oracao', assets.communityOracao],
    ['VIDA COMPARTILHADA', 'Aqui nós não somos apenas um número, é gente que se conhece, cuida, serve e se deixa formar.', 'Não é plateia: é gente que conhece, cuida, serve e se deixa formar.', 'slot--gold', '/visite-nos', assets.communityVida],
  ];
  return (
    <PageFrame page="comunidade">
      <main>
        <section className="subpage-hero subpage-hero--plum subpage-community-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[VIDA EM COMUNIDADE]</p><h1><span className="community-hero-title-desktop">ENCONTRE UMA FAMÍLIA<br />CAMINHE COM A GENTE</span><span className="community-hero-title-mobile">AQUI VOCÊ TEM UMA FAMÍLIA<br />CAMINHE COM A GENTE</span></h1><p>Na Caverna, comunidade é presença durante a semana: aprender a Palavra, lembrar uns dos outros e permanecer perto.</p></div><ImageSlot src={assets.communityBanner} alt="Comunidade reunida em culto" className="slot--brown" /></section>
        <section className="subpage-section subpage-section--paper community-paths"><h2>COMO A GENTE CAMINHA</h2><div className="community-photo-grid">{paths.map(([title, text, mobileText, slot, href, src]) => <a className="community-path-card" href={href} key={title}><ImageSlot src={src} alt={title} className={slot} /><h3>{title}</h3><p><span className="community-copy-desktop">{text}</span><span className="community-copy-mobile">{mobileText}</span></p></a>)}</div></section>
        <section className="subpage-section subpage-section--dark community-projects"><h2>O RITMO DA COMUNIDADE</h2><div className="community-schedule-list"><article className="community-project-card"><ImageSlot src={assets.communityCulto} alt="Culto público e cuidado" className="slot--brown" /><div><strong>CULTO PÚBLICO</strong><p>Sábados, 19H30. A comunidade se reúne para cultuar e ouvir a Palavra.</p></div></article><article className="community-project-card community-project-card--reverse"><div><strong>DISCIPULADO</strong><p>Quintas, 19H30. Um espaço de ensino e acompanhamento.</p></div><ImageSlot src={assets.communityRitmoDiscipulado} alt="Discipulado" className="slot--teal" /></article><article className="community-project-card"><ImageSlot src={assets.communityEsportes} alt="Esportes da Caverna" className="slot--gold" /><div><strong>ESPORTES DA CAVERNA</strong><p><span className="community-copy-desktop">Atletas apoiados em várias modalidades nosso time de paintball.</span><span className="community-copy-mobile">Atletas apoiados e Sons of Caverna uma vez ao mês.</span></p></div></article></div></section>
        <section className="subpage-cta"><h2><span className="community-cta-title-desktop">SER CAVERNA É ESTAR PERTO</span><span className="community-cta-title-mobile">PERTENCER É<br />CAMINHAR E<br />SERVIR</span></h2><div><p>Quem chega é recebido, lembrado e procurado. Para ser Caverna, basta vir; a caminhada acontece perto de pessoas.</p><Button href="/contato">FALE COM A EQUIPE&nbsp; →</Button></div></section>
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
    cards: [['O REINO EM NÓS', 'O projeto-mãe que reúne as frentes missionárias da Caverna.'], ['PRESENÇA', 'As ações alcançam as pessoas onde elas estão: asilo, orfanato, escolas e ruas.'], ['SERVIÇO', 'Anunciar Cristo também é permanecer perto, cuidar e servir.']],
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
          <div className="contribution-destination-grid"><ImageSlot src={detail.image} alt={detail.imageAlt} className="slot--teal" /><div><p className="subpage-kicker">VIDA COMPARTILHADA</p><h2>CAMINHAR<br />JUNTO MUDA<br />TUDO</h2><p>Na Igreja A Caverna, esta frente existe para transformar intenção em presença. Fale com a equipe e descubra como participar.</p></div></div>
        </section>
        <section className="subpage-cta"><h2>HÁ UM PRÓXIMO<br />PASSO PARA VOCÊ</h2><div><p>Conheça a comunidade e encontre uma forma concreta de caminhar conosco.</p><Button href={detail.ctaHref}>{detail.cta}&nbsp; →</Button></div></section>
      </main>
    </PageFrame>
  );
}

function MissionPage() {
  const paths = [
    ['O REINO EM NÓS', 'A frente que reúne e orienta os projetos missionários da Caverna.', 'mission-path mission-path--plum'],
    ['POSSO ORAR POR VOCÊ', 'Pare, converse e deixe alguém orar com você.', 'mission-path mission-path--teal'],
    ['O REINO NAS ESCOLAS', 'Evangelismo e cuidado nas escolas, além de ações em asilos, orfanatos e ruas.', 'mission-path mission-path--gold'],
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
        <section className="subpage-hero subpage-hero--dark agenda-hero"><div className="subpage-hero-copy"><p className="subpage-kicker">[AGENDA]</p><h1>A IGREJA SE REÚNE<br />DURANTE A SEMANA</h1><p>Discipulado às quintas, culto público aos sábados e O Reino em Nós em datas sazonais.</p></div><ImageSlot src={assets.agendaHero} alt="Culto, púlpito ou louvor" className="agenda-hero-slot slot--gray" /></section>
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
