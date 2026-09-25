import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export type PageKey = 'caverna' | 'fe' | 'comunidade' | 'agenda' | 'visite' | 'contato' | 'contribua' | 'discipulado' | 'oracao' | 'missoes' | 'criancas' | 'esportes';

export const subpageLinks: Array<{ key: PageKey; label: string; href: string }> = [
  { key: 'caverna', label: 'QUEM SOMOS?', href: '/a-caverna' },
  { key: 'fe', label: 'NOSSA FÉ', href: '/nossa-fe' },
  { key: 'comunidade', label: 'COMUNIDADE', href: '/comunidade' },
  { key: 'missoes', label: 'MISSÕES', href: '/missoes' },
  { key: 'esportes', label: 'ATLETAS', href: '/esportes' },
  { key: 'agenda', label: 'AGENDA', href: '/agenda' },
  { key: 'visite', label: 'VISITE-NOS', href: '/visite-nos' },
  { key: 'contato', label: 'CONTATO', href: '/contato' },
  { key: 'contribua', label: 'CONTRIBUA', href: '/contribua' },
];

const homeNavigation = [
  { label: '[INÍCIO]', href: '#inicio', aria: 'Ir para o início' },
  { label: '[NOSSOS ATLETAS]', href: '/esportes', aria: 'Conheça nossos atletas' },
  { label: '[QUEM SOMOS?]', href: '/a-caverna', aria: 'Conheça a história da igreja' },
  { label: '[AGENDA]', href: '/agenda', aria: 'Ver a agenda' },
  { label: '[COMUNIDADE]', href: '/comunidade', aria: 'Conheça a comunidade' },
  { label: '[CONTATO]', href: '/contato', aria: 'Entrar em contato' },
];

type SiteHeaderProps = {
  activePage?: PageKey;
  subpage?: boolean;
};

export function SiteHeader({ activePage, subpage = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${subpage ? ' site-header--subpage' : ''}${menuOpen ? ' site-header--menu-open' : ''}`}>
      {subpage ? (
        <nav className="subpage-nav" aria-label="Navegação principal">
          <a className="subpage-nav-brand" href="/" aria-label="Igreja A Caverna">
            <img src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" width="2351" height="468" />
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
          <a className="hero-nav-link hero-nav-link--active" href={homeNavigation[0].href} aria-label={homeNavigation[0].aria}>{homeNavigation[0].label}</a>
          <a className="hero-nav-link" href={homeNavigation[1].href} aria-label={homeNavigation[1].aria}>{homeNavigation[1].label}</a>
          <a className="hero-nav-link" href={homeNavigation[2].href} aria-label={homeNavigation[2].aria}>{homeNavigation[2].label}</a>
          <a className="hero-nav-logo" href="#inicio" aria-label="Ir para o início">
            <img src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" width="2351" height="468" />
          </a>
          <a className="hero-nav-link" href={homeNavigation[3].href} aria-label={homeNavigation[3].aria}>{homeNavigation[3].label}</a>
          <a className="hero-nav-link" href={homeNavigation[4].href} aria-label={homeNavigation[4].aria}>{homeNavigation[4].label}</a>
          <a className="hero-nav-link" href={homeNavigation[5].href} aria-label={homeNavigation[5].aria}>{homeNavigation[5].label}</a>
        </nav>
      )}

      <div className="mobile-brand">
        <a className={`mobile-brand-logo${subpage ? ' mobile-brand-word' : ''}`} href={subpage ? '/' : '#inicio'} aria-label="Ir para o início">
          <img src="/assets/brand/logo-a-caverna-horizontal.png" alt="Igreja A Caverna" width="2351" height="468" />
        </a>
        <button className="mobile-menu-inline" type="button" onClick={() => setMenuOpen(true)}>MENU&nbsp; ☰</button>
      </div>

      {menuOpen && createPortal(
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
        </div>,
        document.body,
      )}
    </header>
  );
}
