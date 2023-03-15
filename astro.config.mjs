import netlify from '@astrojs/netlify/functions';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://thisisloupe.com',
  output: 'server',
  adapter: netlify(),
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
