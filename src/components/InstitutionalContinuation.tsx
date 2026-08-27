import { siteContent, whatsappUrl } from '../data/siteContent';

const ministries = [
  ['DISCIPULADO', 'Crescer na Palavra e na comunhão.', '/assets/whatsapp/foto-38.jpeg'],
  ['ORAÇÃO', 'Compartilhar necessidades e interceder.', '/assets/attached/ministry-prayer.jpg'],
  ['MISSÕES', 'Servir pessoas dentro e fora da comunidade.', '/assets/whatsapp/foto-53.jpeg'],
  ['CRIANÇAS E FAMÍLIAS', 'Edificar cada geração da igreja.', '/assets/whatsapp/foto-20.jpeg'],
];

export function InstitutionalContinuation() {
  return (
    <div className="institutional-continuation">
      <section className="institutional-about" id="sobre">
        <p className="institutional-label">01 / A CAVERNA</p>
        <div className="institutional-split">
          <div className="institutional-photo"><img src="/assets/whatsapp/foto-43.jpeg" alt="Comunidade da Igreja A Caverna reunida" /></div>
          <div className="institutional-copy">
            <h2>UM LUGAR DE<br />ABRIGO, FÉ E<br />EDIFICAÇÃO.</h2>
            <p>A Caverna é uma comunidade cristã no Jardim Ingá, nascida de trabalhos missionários e construída como lugar de acolhimento, crescimento e serviço.</p>
            <a href="#sobre">CONHEÇA NOSSA HISTÓRIA&nbsp; ↗</a>
          </div>
        </div>
      </section>

      <section className="institutional-agenda" id="agenda">
        <p className="institutional-label">02 / ENCONTRE-NOS</p>
        <h2>HÁ UM LUGAR<br />PARA VOCÊ AQUI.</h2>
        <div className="schedule-grid">
          <article><span>SÁBADO</span><strong>CULTO PÚBLICO</strong><small>19H</small></article>
          <article><span>QUINTA</span><strong>DISCIPULADO</strong><small>19H30</small></article>
          <article><span>DURANTE A SEMANA</span><strong>PROGRAMAÇÕES E MISSÕES</strong><small>CONSULTE A AGENDA</small></article>
        </div>
      </section>

      <section className="institutional-ministries" id="comunidade">
        <p className="institutional-label">03 / VIDA EM COMUNIDADE</p>
        <h2>ENCONTRE UMA FORMA<br />DE CAMINHAR JUNTO.</h2>
        <div className="ministry-grid">
          {ministries.map(([title, description, image], index) => (
            <article className={`ministry-card ministry-card--${index % 2 ? 'plum' : 'gray'}`} key={title}>
              <img className={`ministry-card-image ministry-card-image--${index === 0 ? 'bottom' : index === 1 ? 'top' : 'center'}`} src={image} alt="" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="institutional-identity" id="fe">
        <p className="institutional-label">04 / UMA IGREJA QUE EDIFICA IGREJA</p>
        <div className="institutional-split institutional-split--identity">
          <div className="institutional-copy">
            <h2>“NÃO QUEREMOS APENAS REUNIR PESSOAS. QUEREMOS EDIFICAR UMA COMUNIDADE QUE EDIFICA.”</h2>
            <p>Espaço para apresentar visão, valores, liderança e a forma como a comunidade compreende sua missão.</p>
            <a href="#fe">NOSSA IDENTIDADE&nbsp; ↗</a>
          </div>
          <div className="institutional-photo"><img src="/assets/whatsapp/foto-46.jpeg" alt="Liderança ministrando em um culto" /></div>
        </div>
      </section>

      <section className="institutional-event">
        <p className="institutional-label">05 / PRÓXIMO EVENTO</p>
        <div className="event-split">
          <div className="institutional-photo"><img src="/assets/figma/institutional-10.png" alt="Mapa de localização da Igreja A Caverna" /></div>
          <div className="event-copy">
            <span>DATA • HORÁRIO • LOCAL</span>
            <h2>NOME DO PRÓXIMO<br />ENCONTRO</h2>
            <p>Resumo do encontro, para quem é e como participar.</p>
            <a href="#agenda">VER PROGRAMAÇÃO&nbsp; ↗</a>
          </div>
        </div>
      </section>

      <footer className="institutional-footer" id="contato">
        <p className="institutional-label">QUER CONHECER A CAVERNA?</p>
        <h2>VENHA CAMINHAR<br />COM A GENTE.</h2>
        <div className="footer-actions">
          <a href="#agenda">PLANEJE SUA VISITA&nbsp; ↗</a>
          <a href={whatsappUrl('Olá! Quero falar com a Igreja A Caverna.')}>FALE CONOSCO&nbsp; ↗</a>
          <a href={whatsappUrl('Olá! Gostaria de enviar um pedido de oração.')}>PEDIDO DE ORAÇÃO&nbsp; ↗</a>
        </div>
        <div className="institutional-footer-bottom">
          <strong>{siteContent.shortName}</strong>
          <span>JARDIM INGÁ • LUZIÂNIA/GO</span>
          <span>INSTAGRAM&nbsp; • &nbsp;YOUTUBE&nbsp; • &nbsp;WHATSAPP</span>
        </div>
      </footer>
    </div>
  );
}
