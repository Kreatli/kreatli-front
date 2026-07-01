const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    'node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui(), require('@tailwindcss/typography')],
  safelist: [
    'bg-primary-50',
    'bg-secondary-50',
    'bg-success-50',
    'bg-warning-50',
    'bg-default-50',
    'bg-danger-50',
    'text-primary-500',
    'text-secondary-500',
    'text-success-500',
    'text-warning-500',
    'text-default-500',
    'text-danger-500',
    'marker:text-primary-500',
    'marker:text-secondary-500',
    'marker:text-success-500',
    'marker:text-warning-500',
    'marker:text-default-500',
    'w-20',
    'h-20',
  ],
}
