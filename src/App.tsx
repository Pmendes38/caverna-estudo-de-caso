import { CreativeExperience } from './components/CreativeExperience';
import { InstitutionalContinuation } from './components/InstitutionalContinuation';
import './styles.css';

function App() {
  return (
    <div className="site-shell">
      <main>
        <CreativeExperience />
        <InstitutionalContinuation />
      </main>
    </div>
  );
}

export default App;
