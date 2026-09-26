import { CreativeExperience } from './components/CreativeExperience';
import { InstitutionalContinuation } from './components/InstitutionalContinuation';
import { SiteOpening } from './components/SiteOpening';
import { SaturdayLive } from './components/SaturdayLive';

export function HomeApp() {
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
