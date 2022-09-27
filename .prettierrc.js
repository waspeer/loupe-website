// @ts-check

/** @type {import('prettier').Config & { astroAllowShorthand: boolean }} */
const config = {
  trailingComma: "all",
  singleQuote: true,
  arrowParens: "always",
  printWidth: 100,
  endOfLine: "auto",

  astroAllowShorthand: false,

  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "**/*.astro",
      options: { parser: "astro" },
    },
  ],
};

module.exports = config;
