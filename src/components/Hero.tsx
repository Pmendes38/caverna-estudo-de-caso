import { siteContent } from '../data/siteContent';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-word" aria-label="A Caverna">A CAVERNA</div>
      <div className="hero-stage" aria-label="Identidade visual da Igreja A Caverna">
        <div className="hero-glow" />
        <img className="hero-person" src="/assets/figma/d01-07.png" alt="Líder da Igreja A Caverna ministrando" />
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
