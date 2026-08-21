/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                surface: '#0a0a0a',
                'surface-raised': '#111111',
                'surface-hover': '#1a1a1a',
                'surface-strong': '#252525',
                border: '#252525',
                primary: '#0957e1',
                'primary-hover': '#4a8aff',
                'primary-muted': '#0957e120',
            },
        },
    },
    plugins: [],
};