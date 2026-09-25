import { renderToString } from 'react-dom/server';
import App from './App';
export { createSeoHead, seoPages, siteOrigin } from './seo';
export { getNextMeeting } from './data/meetings';

export function renderPage(pathname: string) {
  return renderToString(<App pathname={pathname} />);
}
