// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages project site: https://jonathangomz.github.io/karlavega/
  // For a custom domain later: set `site` to the domain, delete `base`, and
  // put the domain in `public/CNAME`.
  site: 'https://jonathangomz.github.io',
  base: '/karlavega',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // English stays at `/`, Spanish is served from `/es/`.
      prefixDefaultLocale: false,
    },
  },
  image: {
    // Allow the placeholder service used while real artwork images are missing.
    domains: ['placehold.co'],
  },
});
