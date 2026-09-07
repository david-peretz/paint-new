import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// `npm run build` prerenders the page into #root (see scripts/prerender.mjs), so the
// production bundle finds markup already there and hydrates it. `npm run dev` serves
// index.html untouched, so #root is empty and there is nothing to hydrate - calling
// hydrateRoot on an empty container would throw away the server markup it expects and
// warn on every reload. Branching on the actual DOM covers both without a build flag.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
