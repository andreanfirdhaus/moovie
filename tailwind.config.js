/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                surface: '#0f0f0f',
                'surface-raised': '#121212', //1 ini naik satu level untuk #000000. pada dasarnya untuk diatasnya backgrounnd hitam
                'surface-hover': '#434343', // ini hover efect untuk bakground #121212
                'surface-strong': '#242424', //2 ini naik satu level untuk surface-raised. pada dasarnya untuk diatasnya surface-raised
                border: '#252525',
                primary: '#0957e1',
                'primary-hover': '#4a8aff',
                'primary-muted': '#0957e120',
            },
        },
    },
    plugins: [],
};