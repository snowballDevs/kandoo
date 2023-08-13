/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                fluid: 'repeat(auto-fit, minmax(320px, 1fr))',
            },
            colors: {
                primaryLight: '#e9e9e5',
                secondaryLight: '#051e36',
                tertiaryLight: '#61A0AF',
                dangerLight: '#e63946',
                warningLight: '#f89e54',
                successLight: '#aafb9d',
                infoLight: '#96C9DC',
                flashy: '#a132e7',
                pinkLight: '#ec4899',
                redLight: '#ef4444',
                yellowLight: '#eab308',
            },
        },
    },
    plugins: [require('daisyui'), require('@tailwindcss/forms')], // eslint-disable-line global-require
};
