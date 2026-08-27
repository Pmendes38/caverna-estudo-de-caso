import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { Hero } from './Hero';
import { SiteHeader } from './SiteHeader';

const galleryA = [
  { src: '/assets/raw-03.png', alt: 'Comunidade reunida em culto', className: 'gallery-a-main' },
  { src: '/assets/raw-06.png', alt: 'Momento de adoração', className: 'gallery-a-secondary' },
  { src: '/assets/raw-05.png', alt: 'Pessoa chegando à comunidade', className: 'gallery-a-entering' },
];

const galleryB = [
  { src: '/assets/raw-07.png', alt: 'Pessoa deixando o encontro', className: 'gallery-b-leaving' },
  { src: '/assets/raw-03.png', alt: 'Vida em comunidade', className: 'gallery-b-main' },
  { src: '/assets/raw-06.png', alt: 'Momento de comunhão', className: 'gallery-b-secondary' },
  { src: '/assets/raw-08.png', alt: 'Culto da Igreja A Caverna', className: 'gallery-b-last' },
];

function Scene({ children, index, progress }: { children: ReactNode; index: number; progress: number }) {
  const trackPosition = progress * 5;
  const enterProgress = index === 0
    ? 1
    : Math.min(Math.max(trackPosition - (index - 1), 0), 1);
  const exitProgress = index === 0
    ? Math.min(Math.max(1 - trackPosition, 0), 1)
    : Math.min(Math.max(index + 1 - trackPosition, 0), 1);
  const style = {
    '--scene-enter-opacity': enterProgress,
    '--scene-enter-muted-opacity': enterProgress * .62,
    '--scene-enter-ghost-opacity': enterProgress * .13,
    '--scene-enter-affirm-ghost-opacity': enterProgress * .08,
    '--scene-exit-opacity': exitProgress,
    '--scene-opacity': Math.min(enterProgress, exitProgress),
    '--scene-enter-x': `${(1 - enterProgress) * 70}px`,
    '--scene-exit-x': `${(1 - exitProgress) * 90}px`,
    '--scene-enter-scale': 0.94 + enterProgress * 0.06,
    '--scene-enter-y': `${(1 - enterProgress) * 18}px`,
  } as CSSProperties;

  return <div className="experience-scene" style={style}>{children}</div>;
}

function DesktopManifestoNot() {
  return (
    <section className="experience-panel manifesto-not" aria-label="Manifesto: o que não somos">
      <p className="experience-eyebrow">MANIFESTO 01&nbsp; • &nbsp;O QUE NÃO SOMOS</p>
      <p className="manifesto-ghost" aria-hidden="true">NÃO</p>
      <div className="manifesto-copy manifesto-copy--truth"><p>NÃO DILUÍMOS</p><p>A <em>VERDADE.</em></p></div>
      <div className="manifesto-copy manifesto-copy--bible"><p>A <em>BÍBLIA</em></p><p>NÃO SE ADAPTA.</p></div>
      <div className="manifesto-copy manifesto-copy--pulpit"><p>O PÚLPITO <em>NÃO É</em></p><p>AUTOAJUDA.</p></div>
      <div className="manifesto-copy manifesto-copy--worship"><p>CULTO <em>NÃO É</em></p><p>ESPETÁCULO.</p></div>
      <p className="manifesto-line manifesto-line--gospel">O EVANGELHO <em>NÃO ESTÁ À VENDA.</em></p>
      <div className="manifesto-copy manifesto-copy--prosperity"><p>PROSPERIDADE</p><p>NÃO É <em>SALVAÇÃO.</em></p></div>
      <div className="editorial-axis" />
      <p className="experience-progress">01 / 02&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;ROLE PARA CONTINUAR&nbsp; →</p>
    </section>
  );
}

function DesktopManifestoAffirm() {
  return (
    <section className="experience-panel manifesto-affirm" aria-label="Manifesto: o que afirmamos">
      <p className="experience-eyebrow">MANIFESTO 02&nbsp; • &nbsp;O QUE AFIRMAMOS</p>
      <p className="manifesto-ghost" aria-hidden="true">IGREJA</p>
      <p className="affirm-muted affirm-muted--one">NÃO FORMAMOS CELEBRIDADES.</p>
      <p className="affirm-strong affirm-strong--one">FORMAMOS <em>DISCÍPULOS.</em></p>
      <p className="affirm-muted affirm-muted--two">NÃO SEGUIMOS TENDÊNCIAS.</p>
      <p className="affirm-strong affirm-strong--two">SEGUIMOS <em>CRISTO.</em></p>
      <p className="affirm-muted affirm-muted--three">NÃO SOMOS UM PRODUTO.</p>
      <p className="affirm-strong affirm-strong--three">SOMOS <em>IGREJA.</em></p>
      <div className="editorial-horizon" />
      <p className="experience-progress">02 / 02&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;A GALERIA COMEÇA&nbsp; →</p>
    </section>
  );
}

function DesktopGalleryA() {
  return (
    <section className="experience-panel gallery-panel gallery-a" aria-label="Galeria: vida em comunidade">
      {galleryA.map((image) => <img key={image.className} className={`gallery-image ${image.className}`} src={image.src} alt={image.alt} />)}
      <div className="gallery-title"><p>VIDA EM</p><p>COMUNIDADE</p></div>
      <p className="gallery-subtitle">Culto • comunhão • discipulado • missão</p>
      <p className="gallery-index">01 / 02</p>
    </section>
  );
}

function DesktopGalleryB() {
  return (
    <section className="experience-panel gallery-panel gallery-b" aria-label="Galeria: um lugar para pertencer">
      {galleryB.map((image) => <img key={image.className} className={`gallery-image ${image.className}`} src={image.src} alt={image.alt} />)}
      <div className="gallery-quote"><p>“UM LUGAR PARA</p><p>PERTENCER, CRESCER</p><p>E SERVIR.”</p></div>
      <p className="gallery-index">02 / 02</p>
    </section>
  );
}

function DesktopExit() {
  return (
    <section className="experience-panel experience-exit" aria-label="Saída para o site institucional">
      <div className="exit-black-transition" />
      <h2>UMA IGREJA QUE EDIFICA IGREJA.</h2>
      <p>Agora, caminhe com a gente.</p>
      <a href="#sobre">CONTINUAR PARA O SITE&nbsp; →</a>
    </section>
  );
}

function MobileHero() {
  return (
    <section className="mobile-panel mobile-hero-panel" aria-label="Início">
      <SiteHeader />
      <div className="mobile-hero-word" aria-hidden="true">A CAVERNA</div>
      <img className="mobile-hero-person" src="/assets/raw-04.png" alt="Líder da Igreja A Caverna ministrando" />
      <a className="mobile-hero-cta" href="#sobre">CONHEÇA A CAVERNA</a>
      <p className="mobile-hero-info">COMUNIDADE DE FÉ A CAVERNA<br /><span>Igreja que edifica igreja</span></p>
      <a className="mobile-scroll-hint" href="#sobre">↓ ROLE PARA DESCOBRIR</a>
    </section>
  );
}

function MobileNot() {
  return (
    <section className="mobile-panel mobile-not" id="fe" aria-label="Manifesto: o que não somos">
      <p className="mobile-eyebrow">MANIFESTO 01&nbsp; • &nbsp;O QUE NÃO SOMOS</p>
      <p className="mobile-ghost" aria-hidden="true">NÃO</p>
      <div className="mobile-editorial-axis" />
      <div className="mobile-not-copy">
        <p>NÃO DILUÍMOS<br />A <em>VERDADE.</em></p>
        <p>A <em>BÍBLIA</em><br />NÃO SE ADAPTA.</p>
        <p>O PÚLPITO <em>NÃO É</em><br />AUTOAJUDA.</p>
        <p>CULTO <em>NÃO É</em><br />ESPETÁCULO.</p>
        <p>O EVANGELHO <em>NÃO ESTÁ À VENDA.</em></p>
        <p>PROSPERIDADE<br />NÃO É <em>SALVAÇÃO.</em></p>
      </div>
      <p className="mobile-progress">01 / 02&nbsp;&nbsp; • &nbsp;&nbsp;ROLE&nbsp; →</p>
    </section>
  );
}

function MobileAffirm() {
  return (
    <section className="mobile-panel mobile-affirm" aria-label="Manifesto: o que afirmamos">
      <p className="mobile-eyebrow">MANIFESTO 02&nbsp; • &nbsp;O QUE AFIRMAMOS</p>
      <p className="mobile-affirm-ghost" aria-hidden="true">IGREJA</p>
      <p className="mobile-affirm-muted mobile-affirm-muted--one">NÃO FORMAMOS</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--one">DISCÍPULOS.</p>
      <p className="mobile-affirm-muted mobile-affirm-muted--two">NÃO SEGUIMOS</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--two">CRISTO.</p>
      <div className="mobile-editorial-horizon" />
      <p className="mobile-affirm-muted mobile-affirm-muted--three">NÃO SOMOS UM PRODUTO.</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--three">SOMOS <em>IGREJA.</em></p>
      <p className="mobile-progress">02 / 02&nbsp;&nbsp; • &nbsp;&nbsp;GALERIA&nbsp; →</p>
    </section>
  );
}

function MobileGallery() {
  return (
    <>
      <section className="mobile-panel mobile-gallery mobile-gallery-a" id="comunidade" aria-label="Galeria de comunidade">
        <div className="mobile-state-label">03&nbsp; • &nbsp;VIDA EM COMUNIDADE</div>
        <img className="mobile-gallery-main" src="/assets/raw-03.png" alt="Comunidade reunida" />
        <img className="mobile-gallery-small mobile-gallery-small--left" src="/assets/raw-06.png" alt="Momento de comunhão" />
        <img className="mobile-gallery-small mobile-gallery-small--right" src="/assets/raw-05.png" alt="Encontro da igreja" />
        <p className="mobile-gallery-index">01 / 02</p>
      </section>
      <section className="mobile-panel mobile-gallery mobile-gallery-b" aria-label="Galeria de pertencimento">
        <div className="mobile-state-label">04&nbsp; • &nbsp;UM LUGAR PARA PERTENCER</div>
        <img className="mobile-gallery-small mobile-gallery-b--left" src="/assets/raw-07.png" alt="Pessoa chegando" />
        <img className="mobile-gallery-main mobile-gallery-b--main" src="/assets/raw-03.png" alt="Vida em comunidade" />
        <img className="mobile-gallery-small mobile-gallery-b--bottom-left" src="/assets/raw-06.png" alt="Momento de adoração" />
        <img className="mobile-gallery-small mobile-gallery-b--bottom-right" src="/assets/raw-08.png" alt="Culto da igreja" />
        <div className="mobile-gallery-quote">“UM LUGAR PARA<br />PERTENCER, CRESCER<br />E SERVIR.”</div>
        <p className="mobile-gallery-index">02 / 02</p>
      </section>
    </>
  );
}

function MobileExit() {
  return (
    <section className="mobile-panel mobile-exit" aria-label="Saída para o site institucional">
      <div className="mobile-exit-black" />
      <h2>UMA IGREJA QUE<br />EDIFICA IGREJA.</h2>
      <p>Agora, caminhe com a gente.</p>
      <a href="#sobre">CONTINUAR&nbsp; →</a>
    </section>
  );
}

export function CreativeExperience() {
  const experienceRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = experienceRef.current;
      if (!element || window.innerWidth <= 760) return;
      const start = element.offsetTop;
      const distance = Math.max(element.offsetHeight - window.innerHeight, 1);
      const next = Math.min(Math.max((window.scrollY - start) / distance, 0), 1);
      setProgress(next);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <>
      <section ref={experienceRef} className="creative-experience" id="inicio">
        <div className="experience-sticky">
          <div className="experience-track">
            <Scene index={0} progress={progress}><div className="experience-panel experience-panel--hero"><SiteHeader /><Hero /></div></Scene>
            <Scene index={1} progress={progress}><DesktopManifestoNot /></Scene>
            <Scene index={2} progress={progress}><DesktopManifestoAffirm /></Scene>
            <Scene index={3} progress={progress}><DesktopGalleryA /></Scene>
            <Scene index={4} progress={progress}><DesktopGalleryB /></Scene>
            <Scene index={5} progress={progress}><DesktopExit /></Scene>
          </div>
        </div>
      </section>
      <div className="mobile-experience">
        <MobileHero />
        <MobileNot />
        <MobileAffirm />
        <MobileGallery />
        <MobileExit />
      </div>
    </>
  );
}
