import { siteContent } from '../data/siteContent';

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir para o início">
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>A CAVERNA</span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {siteContent.navigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className="header-cta" href={whatsappUrl('Olá! Quero conhecer a Igreja A Caverna.')}>FALE CONOSCO</a>
      <a className="mobile-menu" href="#agenda">MENU <span aria-hidden="true">☰</span></a>
    </header>
  );
}

function whatsappUrl(message: string) {
  return `https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(message)}`;
}
