import './style.css';
import { renderSelectScreen } from './select-screen';
import { renderPaintScreen } from './paint-screen';
import { getPage } from './pages';

const app = document.getElementById('app');

function route(): void {
  if (!app) return;
  const m = location.hash.match(/^#\/page\/([a-z0-9-]+)$/);
  app.replaceChildren();
  if (m) {
    const page = getPage(m[1]);
    if (page) {
      app.append(renderPaintScreen(page));
      return;
    }
  }
  app.append(renderSelectScreen());
}

window.addEventListener('hashchange', route);
route();
