// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace `site` with the real domain once it is registered
// (e.g. 'https://kenmorozumi.com'). It is only used for canonical URLs
// and the sitemap; the site builds and deploys fine with the placeholder.
export default defineConfig({
  site: 'https://kenmorozumi.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
