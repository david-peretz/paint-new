// Post-build step: render the app to static HTML and inject it into dist/index.html.
//
// Runs after both Vite builds - the client build that writes dist/, and the SSR build
// that writes dist-ssr/entry-server.js. Reads the client's index.html (which already
// has the hashed <script>/<link> tags rewritten into it) and replaces the empty root
// div with the rendered markup. main.tsx then hydrates that markup instead of
// mounting over nothing.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { render } from '../dist-ssr/entry-server.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');

// Must match index.html byte for byte. Vite copies the body through untouched, so if
// this ever stops matching, the build fails loudly here rather than silently shipping
// an empty page that looks fine in a browser and blank to a crawler.
const PLACEHOLDER = '<div id="root"></div>';

const template = readFileSync(htmlPath, 'utf8');
if (!template.includes(PLACEHOLDER)) {
  throw new Error(
    `prerender: could not find ${PLACEHOLDER} in dist/index.html. ` +
      'If the root element in index.html changed, update PLACEHOLDER in this script.'
  );
}

const appHtml = render();
writeFileSync(htmlPath, template.replace(PLACEHOLDER, `<div id="root">${appHtml}</div>`), 'utf8');

console.log(`prerender: injected ${appHtml.length.toLocaleString('en-US')} chars into dist/index.html`);
