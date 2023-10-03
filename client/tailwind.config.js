/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                fluid: 'repeat(auto-fill, minmax(300px, 1fr))',
            },
            colors: {
                whiteLight: '#ffffff',
                primaryLight: '#ebebeb', // gray, fmrly e9e9e5
                secondaryLight: '#051e36', // fmrly 051e36
                tertiaryLight: '#219ebc', // fmrly 61a0af
                dangerLight: '#e63946', 
                warningLight: '#fb8500', // fmrly f89e54
                successLight: '#aafb9d',
                infoLight: '#8ecae6', // fmrly 96c9dc
                flashy: '#a132e7',
                pinkLight: '#ec4899',
                redLight: '#ef4444',
                yellowLight: '#ffb703', // fmrly eab308
            },
            maxHeight: {
                kanban: 'calc(100vh - 216px)',
            },
        },
    },
    plugins: [require('daisyui'), require('@tailwindcss/forms')], // eslint-disable-line global-require 
};
