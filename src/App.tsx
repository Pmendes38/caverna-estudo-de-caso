import { HomeApp } from './HomeApp';
import { pageKeyFromPath, Subpage } from './components/Subpage';
import './styles.css';

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }: { pathname?: string }) {
  const subpage = pageKeyFromPath(pathname);

  if (subpage) return <Subpage page={subpage} />;

  return <HomeApp />;
}

export default App;
