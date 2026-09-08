import { useState } from 'react';
import { siteContent } from '../data/siteContent';
import { LiveNowButton } from './LiveNowButton';

export const protagonistImages = [
  '/assets/figma/d01-01.png',
  '/assets/figma/d01-02.png',
  '/assets/figma/d01-07.png',
  '/assets/figma/d01-08.png',
  '/assets/figma/d01-09.png',
  '/assets/figma/d01-10.png',
];

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
