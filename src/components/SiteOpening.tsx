import { useEffect, useState } from 'react';

const openingDuration = 1500;

export function SiteOpening() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setVisible(false);
      return undefined;
    }

    const closeTimer = window.setTimeout(() => setClosing(true), 1000);
    const removeTimer = window.setTimeout(() => setVisible(false), openingDuration);

    return () => {
      window.clearTimeout(closeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`site-opening${closing ? ' site-opening--closing' : ''}`} role="status" aria-label="Igreja A Caverna">
      <div className="site-opening-content">
        <img className="site-opening-mark" src="/assets/brand/logo-a-caverna-horizontal-optimized.png" alt="Igreja A Caverna" width="800" height="159" />
        <span className="site-opening-rule" aria-hidden="true" />
        <span className="site-opening-caption">IGREJA QUE EDIFICA IGREJA</span>
      </div>
    </div>
  );
}
