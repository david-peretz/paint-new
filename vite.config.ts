import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two builds come out of this config. The default one is the client bundle in dist/.
// The second, `vite build --ssr src/entry-server.tsx`, produces a throwaway Node bundle
// in dist-ssr/ that scripts/prerender.mjs imports to render the page to static HTML.
// The SSR build must not inherit the client's manualChunks - splitting a bundle that
// Node imports once serves nothing - and must not write over dist/.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    ...(isSsrBuild
      ? { outDir: 'dist-ssr' }
      : {
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom'],
                icons: ['lucide-react'],
              },
            },
          },
        }),
  },
  server: {
    host: true,
    port: 5173,
  },
}));
