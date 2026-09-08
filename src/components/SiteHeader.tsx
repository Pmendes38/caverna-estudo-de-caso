import { useState } from 'react';
import { siteContent } from '../data/siteContent';

export type PageKey = 'caverna' | 'fe' | 'comunidade' | 'agenda' | 'visite' | 'contato' | 'contribua' | 'discipulado' | 'oracao' | 'missoes' | 'criancas' | 'esportes';

export const subpageLinks: Array<{ key: PageKey; label: string; href: string }> = [
  { key: 'caverna', label: 'QUEM SOMOS', href: '/a-caverna' },
  { key: 'fe', label: 'NOSSA FÉ', href: '/nossa-fe' },
  { key: 'comunidade', label: 'COMUNIDADE', href: '/comunidade' },
  { key: 'missoes', label: 'MISSÕES', href: '/missoes' },
  { key: 'esportes', label: 'ATLETAS', href: '/esportes' },
  { key: 'agenda', label: 'AGENDA', href: '/agenda' },
  { key: 'visite', label: 'VISITE-NOS', href: '/visite-nos' },
  { key: 'contato', label: 'CONTATO', href: '/contato' },
  { key: 'contribua', label: 'CONTRIBUA', href: '/contribua' },
];

const [homeStartLink, homeAthletesLink, homeCavernaLink, homeAgendaLink, homeCommunityLink, homeContactLink] = siteContent.navigation;

type SiteHeaderProps = {
  activePage?: PageKey;
  subpage?: boolean;
};

export function SiteHeader({ activePage, subpage = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${subpage ? ' site-header--subpage' : ''}`}>
      {subpage ? (
        <nav className="subpage-nav" aria-label="Navegação principal">
          <a className="subpage-nav-brand" href="/" aria-label="Igreja A Caverna">
            <img src="/assets/brand/logo-a-caverna.png" alt="Igreja A Caverna" />
          </a>
          <div className="subpage-nav-links">
            {subpageLinks.map((link) => (
              link.key === activePage ? (
                <span className="subpage-nav-link subpage-nav-link--active" key={link.key}>{link.label}</span>
              ) : (
                <a className="subpage-nav-link" href={link.href} key={link.key}>{link.label}</a>
              )
            ))}
          </div>
        </nav>
      ) : (
        <nav className="hero-nav" aria-label="Navegação principal">
          <a className="hero-nav-link hero-nav-link--active" href={homeStartLink.href} aria-label="Ir para o início">{homeStartLink.label}</a>
          <a className="hero-nav-link" href={homeAthletesLink.href} aria-label="Conheça nossos atletas">{homeAthletesLink.label}</a>
          <a className="hero-nav-link" href={homeCavernaLink.href} aria-label="Quem somos">{homeCavernaLink.label}</a>
          <a className="hero-nav-logo" href="#inicio" aria-label="Ir para o início">
            <img src="/assets/brand/logo-a-caverna.png" alt="Símbolo da Igreja A Caverna" />
          </a>
          <a className="hero-nav-link" href={homeAgendaLink.href} aria-label="Ver a agenda">{homeAgendaLink.label}</a>
          <a className="hero-nav-link" href={homeCommunityLink.href} aria-label="Conheça a comunidade">{homeCommunityLink.label}</a>
          <a className="hero-nav-link" href={homeContactLink.href} aria-label="Entrar em contato">{homeContactLink.label}</a>
        </nav>
      )}

      <div className="mobile-brand">
        <a className={`mobile-brand-logo${subpage ? ' mobile-brand-word' : ''}`} href={subpage ? '/' : '#inicio'} aria-label="Ir para o início">
          <img src="/assets/brand/logo-a-caverna.png" alt="Igreja A Caverna" />
        </a>
        <button className="mobile-menu-inline" type="button" onClick={() => setMenuOpen(true)}>MENU&nbsp; ☰</button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Menu principal">
          <a className="mobile-menu-home" href="/" onClick={closeMenu}>A CAVERNA</a>
          <button className="mobile-menu-close" type="button" onClick={closeMenu}>[FECHAR]</button>
          <span className="mobile-menu-kicker">NAVEGAÇÃO</span>
          <nav className="mobile-menu-links" aria-label="Navegação mobile">
            <a href="/" onClick={closeMenu}>INÍCIO&nbsp; →</a>
            {subpageLinks.map((link) => (
              <a href={link.href} onClick={closeMenu} key={link.key}>{link.label}&nbsp; →</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
