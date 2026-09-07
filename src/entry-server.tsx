// The prerender entry. `npm run build` runs this module in Node to render <App /> to a
// string, and scripts/prerender.mjs injects the result into dist/index.html - so the
// page that ships carries its own content instead of an empty <div id="root">.
//
// Nothing reachable from here may touch the DOM at render time: this runs in Node,
// where `document` and `localStorage` do not exist. The page satisfies that today
// because every browser API it uses (localStorage in Hero, document in
// AccessibilityWidget) sits inside an event handler, and handlers never fire during
// renderToString. Keep it that way: a `document.` in a component body or a useState
// initialiser breaks the build, not just the browser.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
