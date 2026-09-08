import { type FormEvent, useEffect, useState } from 'react';
import { siteContent, whatsappUrl } from '../data/siteContent';

const mapsQuery = encodeURIComponent(`${siteContent.churchName}, ${siteContent.address}`);
const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const publicService = { title: 'CULTO PÚBLICO', timeLabel: '19H30' };

function getNextPublicService(now: Date) {
  const target = new Date(now);
  const daysUntilSaturday = (6 - target.getDay() + 7) % 7;
  target.setDate(target.getDate() + daysUntilSaturday);
  target.setHours(19, 30, 0, 0);

  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function formatCountdown(value: number) {
  return String(value).padStart(2, '0');
}

export type EventMode = 'discipulado' | 'culto' | 'live';

function EventCountdown() {
  const [now, setNow] = useState(() => new Date());
  const target = getNextPublicService(now);
  const totalSeconds = Math.max(Math.floor((target.getTime() - now.getTime()) / 1000), 0);
  const countdown = {
    target,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
  const eventDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(countdown?.target ?? now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    ['DIAS', countdown?.days ?? 0],
    ['HORAS', countdown?.hours ?? 0],
    ['MIN', countdown?.minutes ?? 0],
    ['SEG', countdown?.seconds ?? 0],
  ] as const;

  return (
    <>
      <span>PRÓXIMA REUNIÃO</span>
      <h2>{publicService.title.split(' ')[0]}<br />{publicService.title.split(' ').slice(1).join(' ')}</h2>
      <p>{eventDate} às {publicService.timeLabel}<br />{siteContent.address}</p>
      <div className="event-countdown" aria-live="polite" aria-label="Contagem regressiva para o próximo culto público">
        <div className="event-countdown-header">
          <div>
            <span>PRÓXIMA REUNIÃO</span>
            <strong>{eventDate} às {publicService.timeLabel} • {publicService.title}</strong>
          </div>
          <a href="#agenda">Ver agenda</a>
        </div>
        <div className="event-countdown-grid">
          {units.map(([label, value]) => (
            <div className="event-countdown-unit" key={label}>
              <strong>{formatCountdown(value)}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function EventLeadModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('NOME') ?? '').trim();
    const phone = String(data.get('WHATSAPP/TELEFONE') ?? '').trim();
    const body = `NOME: ${name}\nWHATSAPP/TELEFONE: ${phone}\nTenho interesse em saber mais sobre o discipulado da A Caverna.`;
    window.location.href = `mailto:${siteContent.email}?subject=${encodeURIComponent('Interesse em discipulado - Igreja A Caverna')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="event-lead-backdrop" role="dialog" aria-modal="true" aria-label="Mais informações sobre discipulado">
      <div className="event-lead-modal">
        <button className="event-lead-close" type="button" onClick={onClose} aria-label="Fechar formulário">×</button>
        {sent ? (
          <div className="event-lead-success">
            <p className="institutional-label">RECEBEMOS SEU INTERESSE</p>
            <h3>VAMOS<br />CAMINHAR JUNTOS</h3>
            <p>Seu aplicativo de e-mail foi aberto para enviar seus dados. A equipe entrará em contato.</p>
          </div>
        ) : (
          <form className="event-lead-form" onSubmit={handleSubmit}>
            <p className="institutional-label">[DISCIPULADO]</p>
            <h3>CLIQUE AQUI<br />PARA MAIS<br />INFORMAÇÕES</h3>
            <p>Deixe seu nome e telefone. A equipe da A Caverna entra em contato com você.</p>
            <label><span>NOME</span><input name="NOME" required autoComplete="name" /></label>
            <label><span>WHATSAPP/TELEFONE</span><input name="WHATSAPP/TELEFONE" type="tel" required autoComplete="tel" /></label>
            <button className="institutional-action" type="submit">ENVIAR MEU CONTATO&nbsp; ↗</button>
          </form>
        )}
      </div>
    </div>
  );
}

export function EventVisual({ mode, onDiscipleshipClick }: { mode: EventMode; onDiscipleshipClick: () => void }) {
  const image = mode === 'discipulado'
    ? '/assets/attached/discipulado-event.png'
    : mode === 'live'
      ? '/assets/attached/saturday-live.png'
      : '/assets/attached/saturday-service.png';
  const alt = mode === 'discipulado' ? 'Encontro de discipulado da Igreja A Caverna' : mode === 'live' ? 'Culto de sábado ao vivo na Igreja A Caverna' : 'Culto de sábado às 19h30 na Igreja A Caverna';

  if (mode === 'discipulado') {
    return (
      <button className="event-visual event-visual--button" type="button" onClick={onDiscipleshipClick}>
        <img src={image} alt={alt} />
        <span>CLIQUE AQUI PARA MAIS INFORMAÇÕES&nbsp; ↗</span>
      </button>
    );
  }

  return (
    <a className="event-visual" href={mode === 'live' ? 'https://www.youtube.com/@acaverna396/live' : '/agenda'} target={mode === 'live' ? '_blank' : undefined} rel={mode === 'live' ? 'noreferrer' : undefined}>
      <img src={image} alt={alt} />
      <span>{mode === 'live' ? 'ASSISTIR LIVE AGORA&nbsp; ↗' : 'VER DETALHES DO CULTO&nbsp; ↗'}</span>
    </a>
  );
}

const ministries = [
  { title: 'DISCIPULADO', description: 'Cresça na Palavra e caminhe em comunhão.', image: '/assets/whatsapp/foto-38.jpeg', href: '/discipulado' },
  { title: 'ORAÇÃO', description: 'Não caminhe sozinho. Deixe alguém orar com você.', image: '/assets/attached/ministry-prayer.jpg', href: '/oracao' },
  { title: 'MISSÕES', description: 'Sirva pessoas dentro e fora da comunidade.', image: '/assets/whatsapp/foto-53.jpeg', href: '/missoes' },
  { title: 'ESPORTES DA CAVERNA', description: 'Atletas, disciplina e comunidade em movimento.', image: '/assets/sports/jiu-jitsu-atleta.jpeg', href: '/esportes' },
];

export function InstitutionalContinuation() {
  return (
    <div className="institutional-continuation">
      <section className="institutional-about" id="sobre">
        <p className="institutional-label">01 / A CAVERNA</p>
        <div className="institutional-split">
          <div className="institutional-photo"><img src="/assets/whatsapp/foto-43.jpeg" alt="Comunidade da Igreja A Caverna reunida" /></div>
          <div className="institutional-copy">
            <h2>UMA IGREJA<br />NASCIDA DA<br />MISSÃO</h2>
            <p>A Caverna começou nas ruas de Ceilândia, em 2016. Em 2017, a missão chegou ao Jardim Ingá e se tornou comunidade: firmada na Palavra, centrada em Cristo e presente na vida das pessoas.</p>
            <a className="institutional-action" href="/a-caverna">CONHEÇA NOSSA HISTÓRIA&nbsp; ↗</a>
          </div>
        </div>
      </section>

      <section className="institutional-agenda" id="agenda">
        <p className="institutional-label">02 / ENCONTRE-NOS</p>
        <h2>A CAVERNA<br />NÃO TERMINA<br />NO CULTO</h2>
        <div className="schedule-grid">
          <a className="schedule-card" href="/agenda"><span>SÁBADO</span><strong>CULTO PÚBLICO</strong><small>19H30</small></a>
          <a className="schedule-card" href="/agenda"><span>QUINTA</span><strong>DISCIPULADO</strong><small>19H30</small></a>
          <a className="schedule-card" href="/agenda"><span>EM DATAS SAZONAIS</span><strong>REINO EM NÓS</strong><small>CONFIRME PELO WHATSAPP</small></a>
        </div>
      </section>

      <section className="institutional-ministries" id="comunidade">
        <p className="institutional-label">03 / VIDA EM COMUNIDADE</p>
        <h2>CAMINHE COM A<br />CAVERNA DURANTE A SEMANA</h2>
        <div className="ministry-grid">
          {ministries.map(({ title, description, image, href }, index) => (
            <a className={`ministry-card ministry-card--${index % 2 ? 'plum' : 'gray'}`} href={href} key={title}>
              <img className={`ministry-card-image ministry-card-image--${index === 0 ? 'bottom' : index === 1 ? 'center' : index === 3 ? 'sports' : 'center'}`} src={image} alt="" />
              <h3>{title}</h3>
              <p>{description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="institutional-identity" id="fe">
        <p className="institutional-label">04 / UMA IGREJA QUE EDIFICA IGREJA</p>
        <div className="institutional-split institutional-split--identity">
          <div className="institutional-copy">
            <h2>NÃO QUEREMOS APENAS REUNIR PESSOAS<br />QUEREMOS EDIFICAR UMA COMUNIDADE QUE EDIFICA</h2>
            <p>A missão trouxe pessoas até nós. A Palavra nos firma, a comunidade nos aproxima e o serviço nos envia para além do prédio.</p>
            <a className="institutional-action" href="/nossa-fe">NOSSA IDENTIDADE&nbsp; ↗</a>
          </div>
          <div className="institutional-photo"><img src="/assets/whatsapp/foto-46.jpeg" alt="Liderança ministrando em um culto" /></div>
        </div>
      </section>

      <section className="institutional-event">
        <p className="institutional-label">05 / PRÓXIMO EVENTO</p>
        <div className="event-split">
          <div className="institutional-photo institutional-map">
            <iframe
              className="map-frame"
              src={mapsEmbedUrl}
              title="Localização da Igreja A Caverna no Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="map-open-link" href={siteContent.mapsUrl} target="_blank" rel="noreferrer">ABRIR LOCALIZAÇÃO&nbsp; ↗</a>
          </div>
          <div className="event-copy">
            <EventCountdown />
            <a className="institutional-action" href="/agenda">VER PROGRAMAÇÃO&nbsp; ↗</a>
          </div>
        </div>
      </section>

      <footer className="institutional-footer" id="contato">
        <p className="institutional-label">QUER CONHECER A CAVERNA?</p>
        <h2>VENHA CAMINHAR<br />COM A GENTE</h2>
        <div className="footer-actions">
          <a href="/visite-nos">PLANEJE SUA VISITA&nbsp; ↗</a>
          <a href="/contato">FALE CONOSCO&nbsp; ↗</a>
          <a href="/contato#oracao">PEDIDO DE ORAÇÃO&nbsp; ↗</a>
        </div>
        <div className="institutional-footer-bottom">
          <strong>{siteContent.shortName}</strong>
          <span>JARDIM INGÁ • LUZIÂNIA/GO</span>
          <div className="institutional-social-links" aria-label="Redes sociais">
            <a className="institutional-social-button" href="https://instagram.com/a_cavernaa" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a className="institutional-social-button" href={whatsappUrl('Olá! Quero falar com a Igreja A Caverna.')}>WHATSAPP</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
