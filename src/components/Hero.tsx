import { siteContent } from '../data/siteContent';

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-nav-spacer" />
      <p className="hero-eyebrow">COMUNIDADE DE FÉ</p>
      <div className="hero-word" aria-label="A Caverna">A CAVERNA</div>
      <div className="hero-stage" aria-label="Identidade visual da Igreja A Caverna">
        <div className="hero-glow" />
        <img className="hero-person" src="/assets/raw-04.png" alt="Líder da Igreja A Caverna ministrando" />
      </div>
      <a className="hero-cta" href="#sobre">CONHEÇA A CAVERNA</a>
      <div className="hero-info">
        <strong>{siteContent.churchName.toUpperCase()}</strong>
        <span>{siteContent.slogan}</span>
      </div>
      <a className="scroll-hint" href="#sobre">↓ ROLE PARA DESCOBRIR</a>
    </section>
  );
}
