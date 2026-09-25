import { siteContent, whatsappUrl } from '../data/siteContent';

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contato">
      <a className="footer-brand" href="#inicio" aria-label="Voltar para o início">
        <img src="/assets/brand/logo-a-caverna-horizontal-optimized.png" alt="Igreja A Caverna" width="800" height="159" />
      </a>
      <div className="footer-column">
        <a href={`mailto:${siteContent.email}`}>E-MAIL</a>
        <a href={whatsappUrl('Olá! Quero falar com a Igreja A Caverna.')}>WHATSAPP</a>
        <a href="#contato">LOCALIZAÇÃO</a>
      </div>
      <div className="footer-column">
        <a href="https://instagram.com/a_cavernaa" target="_blank" rel="noreferrer">INSTAGRAM</a>
        <a href="#inicio">VOLTAR AO TOPO</a>
        <a href="#contato">PRIVACIDADE</a>
      </div>
      <address className="footer-address">Igreja A Caverna<br />{siteContent.address}</address>
    </footer>
  );
}
