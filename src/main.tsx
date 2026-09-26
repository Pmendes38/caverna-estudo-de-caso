import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HomeApp } from './HomeApp';
import './styles.css';

const root = document.getElementById('root')!;

function mount(app: React.ReactNode) {
  const wrapped = (
    <StrictMode>
      {app}
      <Analytics />
      <SpeedInsights />
    </StrictMode>
  );

  if (root.children.length) hydrateRoot(root, wrapped);
  else createRoot(root).render(wrapped);
}

if (window.location.pathname === '/') {
  mount(<HomeApp />);
} else {
  import('./components/Subpage').then(({ pageKeyFromPath, Subpage }) => {
    const page = pageKeyFromPath(window.location.pathname);
    mount(page ? <Subpage page={page} /> : <HomeApp />);
  });
}
