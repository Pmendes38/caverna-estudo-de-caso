import { useState } from 'react';
import { siteContent } from '../data/siteContent';
import { LiveNowButton } from './LiveNowButton';

type ProtagonistAsset = {
  src: string;
  srcSet: string;
  sizes: string;
};

const PROTAGONIST_COUNT = 16;
const PROTAGONIST_STORAGE_ID = 'igreja-ac-protagonist-rotation-v2';
const PROTAGONIST_ROTATION_LENGTH = PROTAGONIST_COUNT * 2 - 2;

function createProtagonistAssets(directory: string, widths: [number, number, number]): ProtagonistAsset[] {
  return Array.from({ length: PROTAGONIST_COUNT }, (_, index) => {
    const name = `hero-${String(index + 1).padStart(2, '0')}`;
    return {
      src: `/assets/site-images/${directory}/${name}@3x.png`,
      srcSet: `${`/assets/site-images/${directory}/${name}@1x.png`} ${widths[0]}w, ${`/assets/site-images/${directory}/${name}@2x.png`} ${widths[1]}w, ${`/assets/site-images/${directory}/${name}@3x.png`} ${widths[2]}w`,
      sizes: directory === 'd01-desktop'
        ? '(min-width: 1440px) 1179px, 100vw'
        : directory === 'd01-tablet'
          ? 'min(603px, calc(100vw - 40px))'
          : 'min(430px, calc(100vw - 20px))',
    };
  });
}

const desktopProtagonistAssets = createProtagonistAssets('d01-desktop', [1179, 2358, 3537]);
const tabletProtagonistAssets = createProtagonistAssets('d01-tablet', [603, 1206, 1809]);
const mobileProtagonistAssets = createProtagonistAssets('d01-mobile', [514, 1028, 1542]);

export const protagonistImages = desktopProtagonistAssets.map(({ src }) => src);
export const mobileProtagonistImages = mobileProtagonistAssets.map(({ src }) => src);

export function getRotatingProtagonist() {
  return desktopProtagonistAssets[getRotatingProtagonistIndex()].src;
}

export function getRotatingProtagonistIndex() {
  const stored = window.localStorage.getItem(PROTAGONIST_STORAGE_ID);
  const previousStep = stored === null ? 0 : Number.parseInt(stored, 10);
  const step = Number.isFinite(previousStep)
    ? ((previousStep % PROTAGONIST_ROTATION_LENGTH) + PROTAGONIST_ROTATION_LENGTH) % PROTAGONIST_ROTATION_LENGTH
    : 0;
  const protagonistIndex = step % 2 === 0 ? 0 : (step + 1) / 2;
  window.localStorage.setItem(PROTAGONIST_STORAGE_ID, String((step + 1) % PROTAGONIST_ROTATION_LENGTH));
  return protagonistIndex;
}

export function getCurrentProtagonistIndex() {
  const stored = window.localStorage.getItem(PROTAGONIST_STORAGE_ID);
  if (stored === null) return 0;

  const step = Number.parseInt(stored, 10);
  const normalizedStep = Number.isFinite(step)
    ? ((step - 1) % PROTAGONIST_ROTATION_LENGTH + PROTAGONIST_ROTATION_LENGTH) % PROTAGONIST_ROTATION_LENGTH
    : 0;
  return normalizedStep % 2 === 0 ? 0 : (normalizedStep + 1) / 2;
}

export function getCurrentProtagonist() {
  return desktopProtagonistAssets[getCurrentProtagonistIndex()].src;
}

export function getCurrentMobileProtagonist() {
  return mobileProtagonistAssets[getCurrentProtagonistIndex()].src;
}

export function ProtagonistPicture({ index, className, alt }: { index: number; className: string; alt: string }) {
  const desktop = desktopProtagonistAssets[index % desktopProtagonistAssets.length];
  const tablet = tabletProtagonistAssets[index % tabletProtagonistAssets.length];
  const mobile = mobileProtagonistAssets[index % mobileProtagonistAssets.length];
  const toneClass = index === 0 ? 'protagonist--original' : 'protagonist--alternate';

  return (
    <picture>
      <source media="(max-width: 720px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <source media="(max-width: 1024px)" srcSet={tablet.srcSet} sizes={tablet.sizes} />
      <img className={`${className} ${toneClass}`} src={desktop.src} srcSet={desktop.srcSet} sizes={desktop.sizes} alt={alt} decoding="async" fetchPriority="high" />
    </picture>
  );
}

export function Hero() {
  const [protagonistIndex] = useState(() => getRotatingProtagonistIndex());

  return (
    <section className="hero">
      <div className="hero-word" aria-label="A Caverna">A CAVERNA</div>
      <div className="hero-stage" aria-label="Identidade visual da Igreja A Caverna">
        <div className="hero-glow" />
        <ProtagonistPicture index={protagonistIndex} className="hero-person" alt="Líder da Igreja A Caverna ministrando" />
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
