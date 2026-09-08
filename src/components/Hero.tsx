import { useState } from 'react';
import { siteContent } from '../data/siteContent';
import { LiveNowButton } from './LiveNowButton';

export const protagonistImages = [
  '/assets/site-images/d01-desktop/hero-01.png',
  '/assets/site-images/d01-desktop/hero-02.png',
  '/assets/site-images/d01-desktop/hero-03.png',
  '/assets/site-images/d01-desktop/hero-04.png',
  '/assets/site-images/d01-desktop/hero-05.png',
  '/assets/site-images/d01-desktop/hero-06.png',
];

export const mobileProtagonistImages = protagonistImages.map((_, index) =>
  `/assets/site-images/d01-mobile/hero-${String(index + 1).padStart(2, '0')}.png`,
);

export function getRotatingProtagonist() {
  const storageKey = 'igreja-ac-protagonist-index';
  const stored = window.localStorage.getItem(storageKey);
  const previousIndex = stored === null ? -1 : Number.parseInt(stored, 10);
  const nextIndex = Number.isFinite(previousIndex)
    ? (previousIndex + 1) % protagonistImages.length
    : 0;
  window.localStorage.setItem(storageKey, String(nextIndex));
  return protagonistImages[nextIndex];
}

export function getCurrentProtagonist() {
  const stored = window.localStorage.getItem('igreja-ac-protagonist-index');
  const index = stored === null ? 0 : Number.parseInt(stored, 10);
  return protagonistImages[Number.isFinite(index) ? index % protagonistImages.length : 0];
}

export function getCurrentMobileProtagonist() {
  const stored = window.localStorage.getItem('igreja-ac-protagonist-index');
  const index = stored === null ? 0 : Number.parseInt(stored, 10);
  return mobileProtagonistImages[Number.isFinite(index) ? index % mobileProtagonistImages.length : 0];
}

export function Hero() {
  const [protagonist] = useState(() => getRotatingProtagonist());

  return (
    <section className="hero">
      <div className="hero-word" aria-label="A Caverna">A CAVERNA</div>
      <div className="hero-stage" aria-label="Identidade visual da Igreja A Caverna">
        <div className="hero-glow" />
        <img className="hero-person" src={protagonist} alt="Líder da Igreja A Caverna ministrando" />
      </div>
      <div className="hero-actions">
        <a className="hero-cta" href="#sobre">CONHEÇA A CAVERNA</a>
        <LiveNowButton className="hero-live-cta" />
      </div>
      <div className="hero-info">
        <strong>{siteContent.churchName.toUpperCase()}</strong>
        <span>{siteContent.slogan}</span>
      </div>
      <a className="scroll-hint" href="#sobre">↓ ROLE PARA DESCOBRIR</a>
    </section>
  );
}
