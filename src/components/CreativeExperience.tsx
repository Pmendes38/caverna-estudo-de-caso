import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { getCurrentProtagonistIndex, Hero, ProtagonistPicture } from './Hero';
import { LiveNowButton } from './LiveNowButton';
import { SiteHeader } from './SiteHeader';

const galleryA = [
  { src: '/assets/site-images/d04-d06-gallery/d04-01.jpg', alt: 'Comunidade servindo nas ruas', className: 'gallery-a-main' },
  { src: '/assets/site-images/d04-d06-gallery/d04-02.jpg', alt: 'Música e comunhão na comunidade', className: 'gallery-a-secondary' },
  { src: '/assets/site-images/d04-d06-gallery/d04-03.jpg', alt: 'Mesa compartilhada na comunidade', className: 'gallery-a-entering' },
];

const galleryB = [
  { src: '/assets/site-images/d04-d06-gallery/d04-03.jpg', alt: 'Mesa compartilhada na comunidade', className: 'gallery-b-leaving' },
  { src: '/assets/site-images/d04-d06-gallery/d05-01.jpg', alt: 'Cuidado e discipulado na comunidade', className: 'gallery-b-main' },
  { src: '/assets/site-images/d04-d06-gallery/d05-02.jpg', alt: 'Vida em comunidade', className: 'gallery-b-secondary' },
  { src: '/assets/site-images/d04-d06-gallery/d05-03.jpg', alt: 'Momento de oração', className: 'gallery-b-last' },
];

function Scene({ children, index, progress }: { children: ReactNode; index: number; progress: number }) {
  const d06Start = 2.3;
  const d06StartProgress = .88;
  const trackPosition = progress <= d06StartProgress
    ? (progress / d06StartProgress) * d06Start
    : d06Start + ((progress - d06StartProgress) / (1 - d06StartProgress)) * (5 - d06Start);
  const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
  const fadeInStart = index === 0 ? 0 : index === 1 ? 0 : index === 2 ? .65 : index === 3 ? 1.3 : index === 4 ? 1.8 : 2.3;
  const fadeInEnd = index === 0 ? 0 : index === 1 ? .125 : index === 2 ? .775 : index === 3 ? 1.425 : index === 4 ? 1.925 : 2.425;
  const fadeOutStart = index === 0 ? 0 : index === 1 ? .65 : index === 2 ? 1.3 : index === 3 ? 1.8 : index === 4 ? 2.3 : 5;
  const fadeOutEnd = index === 0 ? .125 : index === 1 ? .775 : index === 2 ? 1.425 : index === 3 ? 1.925 : index === 4 ? 2.425 : 5;
  const enterProgress = index === 0
    ? 1
    : clamp((trackPosition - fadeInStart) / Math.max(fadeInEnd - fadeInStart, .001));
  const exitProgress = index === 5
    ? 1
    : clamp((fadeOutEnd - trackPosition) / Math.max(fadeOutEnd - fadeOutStart, .001));
  const revealStart = index === 1 ? .0375 : index === 2 ? .6875 : index === 3 ? 1.25 : index === 4 ? 1.75 : index - .25;
  const sceneRevealProgress = index === 0
    ? 1
    : clamp((trackPosition - revealStart) / (index === 1 || index === 2 ? .525 : index === 3 || index === 4 ? .4375 : .65));
  const revealCount = index === 1 || index === 2 ? 6 : index === 3 || index === 4 ? 5 : 1;
  const revealedSteps = Math.floor(sceneRevealProgress * revealCount);
  const revealStep = (step: number) => step <= revealedSteps ? 1 : 0;
  const sceneOpacity = Math.min(enterProgress, exitProgress);
  const style = {
    '--scene-enter-opacity': enterProgress,
    '--scene-enter-muted-opacity': enterProgress * .62,
    '--scene-enter-ghost-opacity': enterProgress * .13,
    '--scene-enter-affirm-ghost-opacity': enterProgress * .08,
    '--scene-exit-opacity': exitProgress,
    '--scene-opacity': sceneOpacity,
    pointerEvents: sceneOpacity > .5 ? 'auto' : 'none',
    '--scene-enter-x': `${(1 - enterProgress) * 70}px`,
    '--scene-exit-x': `${(1 - exitProgress) * 90}px`,
    '--scene-enter-scale': 0.94 + enterProgress * 0.06,
    '--scene-enter-y': `${(1 - enterProgress) * 18}px`,
    '--scene-reveal-ghost': enterProgress,
    '--scene-reveal-1': revealStep(1),
    '--scene-reveal-2': revealStep(2),
    '--scene-reveal-3': revealStep(3),
    '--scene-reveal-4': revealStep(4),
    '--scene-reveal-5': revealStep(5),
    '--scene-reveal-6': revealStep(6),
    '--scene-reveal-7': revealStep(7),
  } as CSSProperties;

  return <div className="experience-scene" style={style}>{children}</div>;
}

function DesktopManifestoNot() {
  return (
    <a className="experience-panel experience-panel-link manifesto-not" href="/nossa-fe" aria-label="Conheça nossa fé: o que não somos">
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
    </a>
  );
}

function DesktopManifestoAffirm() {
  return (
    <a className="experience-panel experience-panel-link manifesto-affirm" href="/nossa-fe" aria-label="Conheça nossa fé: o que afirmamos">
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
    </a>
  );
}

function DesktopGalleryA() {
  return (
    <a className="experience-panel experience-panel-link gallery-panel gallery-a" href="/comunidade" aria-label="Conheça nossa comunidade">
      {galleryA.map((image) => <img key={image.className} className={`gallery-image ${image.className}`} src={image.src} alt={image.alt} loading="lazy" decoding="async" />)}
      <div className="gallery-title"><p>VIDA EM</p><p>COMUNIDADE</p></div>
      <p className="gallery-subtitle">Culto • comunhão • discipulado • missão</p>
      <p className="gallery-index">01 / 02</p>
    </a>
  );
}

function DesktopGalleryB() {
  return (
    <a className="experience-panel experience-panel-link gallery-panel gallery-b" href="/comunidade" aria-label="Conheça nossa comunidade">
      {galleryB.map((image) => <img key={image.className} className={`gallery-image ${image.className}`} src={image.src} alt={image.alt} loading="lazy" decoding="async" />)}
      <div className="gallery-quote"><p>“UM LUGAR PARA</p><p>PERTENCER, CRESCER</p><p>E SERVIR.”</p></div>
      <p className="gallery-index">02 / 02</p>
    </a>
  );
}

function MobileScene({ children, index, progress }: { children: ReactNode; index: number; progress: number }) {
  const trackPosition = progress * 5;
  const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
  const enterProgress = index === 0 ? 1 : clamp((trackPosition - (index - .2)) / .2);
  const exitProgress = index === 5 ? 1 : clamp((index + 1 - trackPosition) / .2);
  const opacity = Math.min(enterProgress, exitProgress);
  const y = enterProgress < 1 ? (1 - enterProgress) * 18 : -(1 - exitProgress) * 18;

  return (
    <div
      className="mobile-scene"
      style={{
        '--mobile-scene-opacity': opacity,
        '--mobile-scene-y': `${y}px`,
        pointerEvents: opacity > .5 ? 'auto' : 'none',
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

function DesktopExit() {
  return (
    <section className="experience-panel experience-exit" aria-label="Saída para o site institucional">
      <div className="exit-black-transition">
        <img src="/assets/site-images/d04-d06-gallery/d06-01.jpg" alt="Comunidade da Igreja A Caverna reunida em oração" loading="lazy" decoding="async" />
      </div>
      <h2>VOCÊ JÁ SABE O QUE NÃO SOMOS<br />AGORA CONHEÇA QUEM SOMOS</h2>
      <p>Conheça nossa fé, nossa história e a vida em comunidade na A Caverna.</p>
      <a href="#sobre">CONHEÇA A CAVERNA&nbsp; ↓</a>
    </section>
  );
}

function MobileHero() {
  const [protagonistIndex, setProtagonistIndex] = useState(0);

  useEffect(() => setProtagonistIndex(getCurrentProtagonistIndex()), []);

  return (
    <section className="mobile-panel mobile-hero-panel" aria-label="Início">
      <SiteHeader />
      <div className="mobile-hero-word" aria-hidden="true">A CAVERNA</div>
      <ProtagonistPicture index={protagonistIndex} className="mobile-hero-person" alt="Líder da Igreja A Caverna ministrando" />
      <div className="mobile-hero-actions">
        <a className="mobile-hero-cta" href="#sobre">CONHEÇA A CAVERNA</a>
        <LiveNowButton className="mobile-hero-live-cta" />
      </div>
      <p className="mobile-hero-info">COMUNIDADE DE FÉ A CAVERNA<br /><span>Igreja que edifica igreja</span></p>
      <a className="mobile-scroll-hint" href="#sobre">↓ ROLE PARA DESCOBRIR</a>
    </section>
  );
}

function MobileNot({ progress }: { progress: number }) {
  const sceneProgress = Math.min(Math.max((progress * 5 - 1) / 1, 0), 1);
  const reveal = (index: number) => Math.min(Math.max((sceneProgress - index * .14) / .22, 0), 1);
  const revealStyle = (index: number) => ({ opacity: reveal(index), transform: `translate3d(0, ${(1 - reveal(index)) * 10}px, 0)` });

  return (
    <a className="mobile-panel mobile-panel-link mobile-not" href="/nossa-fe" aria-label="Conheça nossa fé: o que não somos">
      <p className="mobile-eyebrow">MANIFESTO 01 • NÃO SOMOS</p>
      <p className="mobile-ghost" aria-hidden="true">NÃO</p>
      <div className="mobile-editorial-axis" />
      <div className="mobile-not-copy">
        <p className="mobile-not-copy--truth" style={revealStyle(0)}>NÃO DILUÍMOS<br />A <em>VERDADE.</em></p>
        <p className="mobile-not-copy--bible" style={revealStyle(1)}>A <em>BÍBLIA</em><br />NÃO SE ADAPTA.</p>
        <p className="mobile-not-copy--pulpit" style={revealStyle(2)}>O PÚLPITO <em>NÃO É</em><br />AUTOAJUDA.</p>
        <p className="mobile-not-copy--worship" style={revealStyle(3)}>CULTO <em>NÃO É</em><br />ESPETÁCULO.</p>
        <p className="mobile-not-copy--gospel" style={revealStyle(4)}>O EVANGELHO<br /><em>NÃO ESTÁ À VENDA.</em></p>
        <p className="mobile-not-copy--prosperity" style={revealStyle(5)}>PROSPERIDADE<br />NÃO É <em>SALVAÇÃO.</em></p>
      </div>
      <p className="mobile-progress">01 / 02&nbsp;&nbsp; • &nbsp;&nbsp;ROLE&nbsp; →</p>
    </a>
  );
}

function MobileAffirm({ progress }: { progress: number }) {
  const sceneProgress = Math.min(Math.max((progress * 5 - 2) / 1, 0), 1);
  const reveal = (index: number) => Math.min(Math.max((sceneProgress - index * .24) / .28, 0), 1);
  const revealStyle = (index: number) => ({ opacity: reveal(index), transform: `translate3d(0, ${(1 - reveal(index)) * 10}px, 0)` });

  return (
    <a className="mobile-panel mobile-panel-link mobile-affirm" href="/nossa-fe" aria-label="Conheça nossa fé: o que afirmamos">
      <p className="mobile-eyebrow">MANIFESTO 02 • AFIRMAMOS</p>
      <p className="mobile-affirm-ghost" aria-hidden="true">IGREJA</p>
      <p className="mobile-affirm-muted mobile-affirm-muted--one" style={revealStyle(0)}>NÃO FORMAMOS CELEBRIDADES.</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--one" style={revealStyle(0)}>FORMAMOS <em>DISCÍPULOS.</em></p>
      <p className="mobile-affirm-muted mobile-affirm-muted--two" style={revealStyle(1)}>NÃO SEGUIMOS TENDÊNCIAS.</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--two" style={revealStyle(1)}>SEGUIMOS <em>CRISTO.</em></p>
      <div className="mobile-editorial-horizon" />
      <p className="mobile-affirm-muted mobile-affirm-muted--three" style={revealStyle(2)}>NÃO SOMOS UM PRODUTO.</p>
      <p className="mobile-affirm-strong mobile-affirm-strong--three" style={revealStyle(2)}>SOMOS <em>IGREJA.</em></p>
      <p className="mobile-progress">02 / 02&nbsp;&nbsp; • &nbsp;&nbsp;GALERIA&nbsp; →</p>
    </a>
  );
}

function MobileGalleryA() {
  return (
    <a className="mobile-panel mobile-panel-link mobile-gallery mobile-gallery-a" href="/comunidade" aria-label="Conheça nossa comunidade">
      <div className="mobile-gallery-title"><p>VIDA EM</p><p>COMUNIDADE</p></div>
      <img className="mobile-gallery-main" src="/assets/site-images/d04-d06-gallery/d04-01.jpg" alt="Comunidade servindo nas ruas" loading="lazy" decoding="async" />
      <img className="mobile-gallery-small mobile-gallery-small--left" src="/assets/site-images/d04-d06-gallery/d04-02.jpg" alt="Música e comunhão na comunidade" loading="lazy" decoding="async" />
      <img className="mobile-gallery-small mobile-gallery-small--right" src="/assets/site-images/d04-d06-gallery/d04-03.jpg" alt="Mesa compartilhada na comunidade" loading="lazy" decoding="async" />
      <p className="mobile-gallery-index">01 / 02</p>
    </a>
  );
}

function MobileGalleryB() {
  return (
    <a className="mobile-panel mobile-panel-link mobile-gallery mobile-gallery-b" href="/comunidade" aria-label="Conheça nossa comunidade">
      <img className="mobile-gallery-small mobile-gallery-b--left" src="/assets/site-images/d04-d06-gallery/d04-03.jpg" alt="Mesa compartilhada na comunidade" loading="lazy" decoding="async" />
      <img className="mobile-gallery-main mobile-gallery-b--main" src="/assets/site-images/d04-d06-gallery/d05-01.jpg" alt="Cuidado e discipulado na comunidade" loading="lazy" decoding="async" />
      <img className="mobile-gallery-small mobile-gallery-b--bottom-left" src="/assets/site-images/d04-d06-gallery/d05-02.jpg" alt="Vida em comunidade" loading="lazy" decoding="async" />
      <img className="mobile-gallery-small mobile-gallery-b--bottom-right" src="/assets/site-images/d04-d06-gallery/d05-03.jpg" alt="Momento de oração" loading="lazy" decoding="async" />
      <div className="mobile-gallery-quote">UM LUGAR<br />PARA PERTENCER.</div>
      <p className="mobile-gallery-index">02 / 02</p>
    </a>
  );
}

function MobileExit() {
  return (
    <section className="mobile-panel mobile-exit" aria-label="Saída para o site institucional">
      <div className="mobile-exit-black">
        <img src="/assets/site-images/d04-d06-gallery/d06-01.jpg" alt="Comunidade da Igreja A Caverna reunida em oração" loading="lazy" decoding="async" />
      </div>
      <h2>VOCÊ JÁ SABE<br />O QUE NÃO SOMOS<br />AGORA CONHEÇA<br />QUEM SOMOS</h2>
      <p>Conheça nossa fé, nossa história e a vida em comunidade na A Caverna.</p>
      <a href="#sobre">CONHEÇA A CAVERNA&nbsp; ↓</a>
    </section>
  );
}

export function CreativeExperience() {
  const experienceRef = useRef<HTMLElement>(null);
  const mobileExperienceRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = experienceRef.current;
      if (!element || window.innerWidth <= 1024) return;
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

  useEffect(() => {
    const updateMobileProgress = () => {
      const element = mobileExperienceRef.current;
      if (!element || window.innerWidth > 1024) return;
      const start = element.offsetTop;
      const distance = Math.max(element.offsetHeight - window.innerHeight, 1);
      const next = Math.min(Math.max((window.scrollY - start) / distance, 0), 1);
      setMobileProgress(next);
    };
    updateMobileProgress();
    window.addEventListener('scroll', updateMobileProgress, { passive: true });
    window.addEventListener('resize', updateMobileProgress);
    return () => {
      window.removeEventListener('scroll', updateMobileProgress);
      window.removeEventListener('resize', updateMobileProgress);
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
      <div ref={mobileExperienceRef} className="mobile-experience">
        <div className="mobile-experience-sticky">
          <div className="mobile-experience-track">
            <MobileScene index={0} progress={mobileProgress}><MobileHero /></MobileScene>
            <MobileScene index={1} progress={mobileProgress}><MobileNot progress={mobileProgress} /></MobileScene>
            <MobileScene index={2} progress={mobileProgress}><MobileAffirm progress={mobileProgress} /></MobileScene>
            <MobileScene index={3} progress={mobileProgress}><MobileGalleryA /></MobileScene>
            <MobileScene index={4} progress={mobileProgress}><MobileGalleryB /></MobileScene>
            <MobileScene index={5} progress={mobileProgress}><MobileExit /></MobileScene>
          </div>
        </div>
      </div>
    </>
  );
}
