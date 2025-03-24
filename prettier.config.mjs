/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './assets/css/main.css',
  tailwindAttributes: ['cls'],
  tailwindFunctions: ['clsx', 'tv', 'twMerge'],
};

export default config;
