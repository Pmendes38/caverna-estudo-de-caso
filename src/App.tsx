import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HomeApp } from './HomeApp';
import { pageKeyFromPath, Subpage } from './components/Subpage';
import './styles.css';

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }: { pathname?: string }) {
  const subpage = pageKeyFromPath(pathname);
  const page = subpage ? <Subpage page={subpage} /> : <HomeApp />;

  return (
    <>
      {page}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
