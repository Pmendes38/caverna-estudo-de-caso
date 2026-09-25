import { useEffect, useState } from 'react';

const channelLiveUrl = 'https://www.youtube.com/@acaverna396/live';

export function isSaturdayInBrasilia() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
  }).format(new Date()) === 'Sat';
}

export function useSaturdayLiveStatus() {
  const [isSaturday, setIsSaturday] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;

    const checkLiveStatus = async () => {
      const saturday = isSaturdayInBrasilia();
      if (!active) return;
      setIsSaturday(saturday);

      if (!saturday) {
        setIsLive(false);
        return;
      }

      try {
        const response = await fetch('/api/youtube-live', { cache: 'no-store' });
        const data = await response.json() as { live?: boolean };
        if (active) setIsLive(data.live === true);
      } catch {
        if (active) setIsLive(false);
      }
    };

    checkLiveStatus();
    const timer = window.setInterval(checkLiveStatus, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return { isSaturday, isLive };
}

export function LiveNowButton({ className = '' }: { className?: string }) {
  const { isSaturday, isLive } = useSaturdayLiveStatus();

  if (!isSaturday || !isLive) return null;

  return (
    <a
      className={`live-now-button ${className}`.trim()}
      href={channelLiveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Assistir live ao vivo no YouTube"
    >
      <span className="live-now-dot" aria-hidden="true" />
      ASSISTIR LIVE AGORA&nbsp; ↗
    </a>
  );
}
