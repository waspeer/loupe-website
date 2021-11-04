//@ts-check

/** @type {import('astro').AstroUserConfig} */
const config = {
  buildOptions: {
    site: 'https://thisisloupe.com'
  },
  renderers: ['@astrojs/renderer-react'],
}

export default config;