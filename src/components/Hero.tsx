import { useEffect, useState } from 'react';
import { siteContent } from '../data/siteContent';
import { LiveNowButton } from './LiveNowButton';

type ProtagonistAsset = {
  src: string;
  srcSet: string;
  webpSrcSet?: string;
  sizes: string;
  width: number;
  height: number;
};

const ACTIVE_PROTAGONIST_SOURCE_INDICES = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15];
const PROTAGONIST_COUNT = ACTIVE_PROTAGONIST_SOURCE_INDICES.length;
const PROTAGONIST_STORAGE_ID = 'igreja-ac-protagonist-rotation-v3';
const PROTAGONIST_ROTATION_LENGTH = PROTAGONIST_COUNT * 2 - 2;
let pageProtagonistIndex: number | null = null;

function createProtagonistAssets(directory: string, widths: [number, number, number]): ProtagonistAsset[] {
  return ACTIVE_PROTAGONIST_SOURCE_INDICES.map((sourceIndex) => {
    const name = `hero-${String(sourceIndex + 1).padStart(2, '0')}`;
    const isOriginalCutout = sourceIndex === 0;
    const mobileOptimizedName = directory === 'd01-mobile' && isOriginalCutout ? 'hero-01-optimized' : name;
    return {
      src: directory === 'd01-mobile' && isOriginalCutout
        ? `/assets/site-images/${directory}/${mobileOptimizedName}-1028.png`
        : `/assets/site-images/${directory}/${name}@3x.png`,
      srcSet: directory === 'd01-mobile' && isOriginalCutout
        ? `${`/assets/site-images/${directory}/${mobileOptimizedName}-514.png`} ${widths[0]}w, ${`/assets/site-images/${directory}/${mobileOptimizedName}-1028.png`} ${widths[1]}w`
        : `${`/assets/site-images/${directory}/${name}@1x.png`} ${widths[0]}w, ${`/assets/site-images/${directory}/${name}@2x.png`} ${widths[1]}w, ${`/assets/site-images/${directory}/${name}@3x.png`} ${widths[2]}w`,
      webpSrcSet: directory === 'd01-mobile' && isOriginalCutout
        ? `${`/assets/site-images/${directory}/${mobileOptimizedName}-514.webp`} ${widths[0]}w, ${`/assets/site-images/${directory}/${mobileOptimizedName}-1028.webp`} ${widths[1]}w`
        : undefined,
      sizes: directory === 'd01-desktop'
        ? 'min(1273px, 100vw)'
        : directory === 'd01-tablet'
          ? 'min(603px, calc(100vw - 40px))'
          : 'min(360px, calc(100vw - 32px))',
      width: isOriginalCutout ? 1179 : widths[0],
      height: isOriginalCutout ? 900 : Math.round(widths[0] * 1423 / 1179),
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
  if (pageProtagonistIndex !== null) return pageProtagonistIndex;

  const initialIndex = (window as Window & { __cavernaHeroIndex?: number }).__cavernaHeroIndex;
  if (typeof initialIndex === 'number' && Number.isInteger(initialIndex) && initialIndex >= 0 && initialIndex < PROTAGONIST_COUNT) {
    pageProtagonistIndex = initialIndex;
    return pageProtagonistIndex;
  }

  try {
    const stored = window.localStorage.getItem(PROTAGONIST_STORAGE_ID);
    const previousStep = stored === null ? 0 : Number.parseInt(stored, 10);
    const step = Number.isFinite(previousStep)
      ? ((previousStep % PROTAGONIST_ROTATION_LENGTH) + PROTAGONIST_ROTATION_LENGTH) % PROTAGONIST_ROTATION_LENGTH
      : 0;
    pageProtagonistIndex = step % 2 === 0 ? 0 : (step + 1) / 2;
    window.localStorage.setItem(PROTAGONIST_STORAGE_ID, String((step + 1) % PROTAGONIST_ROTATION_LENGTH));
  } catch {
    pageProtagonistIndex = 0;
  }
  return pageProtagonistIndex;
}

export function getCurrentProtagonistIndex() {
  return getRotatingProtagonistIndex();
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
  const indexClass = `protagonist--index-${String(index + 1).padStart(2, '0')}`;

  return (
    <picture>
      {mobile.webpSrcSet && <source type="image/webp" media="(max-width: 720px)" srcSet={mobile.webpSrcSet} sizes={mobile.sizes} />}
      <source media="(max-width: 720px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      {index === 0 && <source type="image/webp" media="(min-width: 721px)" srcSet="/assets/site-images/d01-desktop/hero-01-optimized.webp 1179w" sizes={desktop.sizes} />}
      <source media="(max-width: 1024px)" srcSet={tablet.srcSet} sizes={tablet.sizes} />
      <img className={`${className} ${toneClass} ${indexClass}`} src={desktop.src} srcSet={desktop.srcSet} sizes={desktop.sizes} alt={alt} width={desktop.width} height={desktop.height} loading="eager" decoding="async" fetchPriority="high" />
    </picture>
  );
}

export function Hero() {
  const [protagonistIndex, setProtagonistIndex] = useState(0);

  useEffect(() => setProtagonistIndex(getRotatingProtagonistIndex()), []);

  return (
    <section className="hero">
      <h1 className="hero-word" aria-label="Igreja A Caverna">A CAVERNA</h1>
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
