import { useState } from 'react';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="hero-nav" aria-label="Navegação principal">
        <a className="hero-nav-link hero-nav-link--active" href="#inicio">[INÍCIO]</a>
        <a className="hero-nav-link" href="#sobre">[A CAVERNA]</a>
        <a className="hero-nav-logo" href="#inicio" aria-label="Ir para o início">
          <img src="/assets/figma/d01-03.png" alt="Símbolo da Igreja A Caverna" />
        </a>
        <a className="hero-nav-link" href="#agenda">[AGENDA]</a>
        <a className="hero-nav-link" href="#contato">[CONTATO]</a>
      </nav>
      <a className="mobile-brand" href="#inicio">
        A CAVERNA
        <span className="mobile-menu-inline" role="button" tabIndex={0} onClick={(event) => { event.preventDefault(); event.stopPropagation(); setMenuOpen(true); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setMenuOpen(true); }}>MENU&nbsp; ☰</span>
      </a>
      {menuOpen && (
        <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Menu principal">
          <a className="mobile-menu-home" href="#inicio" onClick={() => setMenuOpen(false)}>A CAVERNA</a>
          <button className="mobile-menu-close" type="button" onClick={() => setMenuOpen(false)}>[FECHAR]</button>
          <span className="mobile-menu-kicker">NAVEGAÇÃO</span>
          <nav className="mobile-menu-links" aria-label="Navegação mobile">
            <a href="#inicio" onClick={() => setMenuOpen(false)}>INÍCIO&nbsp; →</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>A CAVERNA&nbsp; →</a>
            <a href="#fe" onClick={() => setMenuOpen(false)}>NOSSA FÉ&nbsp; →</a>
            <a href="#comunidade" onClick={() => setMenuOpen(false)}>COMUNIDADE&nbsp; →</a>
            <a href="#agenda" onClick={() => setMenuOpen(false)}>AGENDA&nbsp; →</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>CONTATO E ORAÇÃO&nbsp; →</a>
          </nav>
          <a className="mobile-menu-give" href="#contato" onClick={() => setMenuOpen(false)}>CONTRIBUA&nbsp; →</a>
        </div>
      )}
    </header>
  );
}
