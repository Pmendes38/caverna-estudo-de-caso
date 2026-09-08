import { useEffect, useState } from 'react';
import { EventLeadModal, EventVisual, type EventMode } from './InstitutionalContinuation';
import { useSaturdayLiveStatus } from './LiveNowButton';

const youtubeChannelId = 'UCBpbmVm-Nz31yLeZ86WeFzQ';
const youtubeChannelUrl = 'https://www.youtube.com/@acaverna396';

function getBrasiliaWeekday() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
  }).format(new Date());
}

export function SaturdayLive() {
  const [weekday, setWeekday] = useState(getBrasiliaWeekday);
  const [leadOpen, setLeadOpen] = useState(false);
  const { isSaturday, isLive } = useSaturdayLiveStatus();

  useEffect(() => {
    const updateDay = () => setWeekday(getBrasiliaWeekday());
    const timer = window.setInterval(updateDay, 60_000);
    updateDay();
    return () => window.clearInterval(timer);
  }, []);

  const visible = weekday === 'Thu' || weekday === 'Sat';
  if (!visible) return null;

  const mode: EventMode = weekday === 'Thu' ? 'discipulado' : isSaturday && isLive ? 'live' : 'culto';
  const isDiscipulado = mode === 'discipulado';
  const isLiveNow = mode === 'live';

  return (
    <section className={`saturday-live${isDiscipulado ? ' saturday-live--discipulado' : ''}`} id="ao-vivo" aria-label={isDiscipulado ? 'Discipulado de quinta-feira' : 'Transmissão de sábado'}>
      <div className="saturday-live-copy">
        <p className="saturday-live-label">{isDiscipulado ? 'QUINTA · DISCIPULADO' : isLiveNow ? 'SÁBADO · AO VIVO' : 'SÁBADO · CULTO'}</p>
        <h2>{isDiscipulado ? <>DISCIPULADO<br />ACONTECE AQUI</> : isLiveNow ? <>O CULTO<br />ESTÁ AO VIVO</> : <>CULTO DE<br />SÁBADO</>}</h2>
        <p>{isDiscipulado ? 'Toda quinta-feira, às 19h30, existe um lugar para crescer na Palavra e caminhar em comunhão.' : isLiveNow ? 'A transmissão do culto está acontecendo agora no canal da A Caverna.' : 'O culto de sábado começa às 19h30. A transmissão aparece aqui quando entrar no ar.'}</p>
        {isDiscipulado ? (
          <button className="saturday-live-link" type="button" onClick={() => setLeadOpen(true)}>CLIQUE PARA MAIS INFORMAÇÕES&nbsp; ↗</button>
        ) : (
          <a className="saturday-live-link" href={youtubeChannelUrl} target="_blank" rel="noreferrer">ABRIR CANAL NO YOUTUBE&nbsp; ↗</a>
        )}
      </div>
      <div className="saturday-live-media">
        <div className="saturday-live-player">
          <EventVisual mode={mode} onDiscipleshipClick={() => setLeadOpen(true)} />
        </div>
        {isLiveNow && (
          <div className="saturday-live-embed">
            <iframe
              title="Culto ao vivo da Igreja A Caverna"
              src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${youtubeChannelId}&rel=0`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </div>
      {leadOpen && <EventLeadModal onClose={() => setLeadOpen(false)} />}
    </section>
  );
}
