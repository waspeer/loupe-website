import netlify from '@astrojs/netlify/functions';
import { defineConfig } from 'astro/config';

const config = defineConfig({
  site: 'https://thisisloupe.com',
  output: 'server',
  adapter: netlify(),
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});

export default config;
