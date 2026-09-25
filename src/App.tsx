import { CreativeExperience } from './components/CreativeExperience';
import { InstitutionalContinuation } from './components/InstitutionalContinuation';
import { SiteOpening } from './components/SiteOpening';
import { SaturdayLive } from './components/SaturdayLive';
import { pageKeyFromPath, Subpage } from './components/Subpage';
import './styles.css';

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }: { pathname?: string }) {
  const subpage = pageKeyFromPath(pathname);

  if (subpage) return <Subpage page={subpage} />;

  return (
    <div className="site-shell">
      <SiteOpening />
      <main>
        <CreativeExperience />
        <SaturdayLive />
        <InstitutionalContinuation />
      </main>
    </div>
  );
}

export default App;
