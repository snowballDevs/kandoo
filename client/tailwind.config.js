/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                fluid: 'repeat(auto-fit, minmax(320px, 1fr))',
            },
        },
    },
    plugins: [
      require('daisyui'),
      require('@tailwindcss/forms')
    
    ] // eslint-disable-line global-require
};
