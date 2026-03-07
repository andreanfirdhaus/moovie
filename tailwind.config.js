/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                surface: {
                    base: '#000000',
                    1: '#0a0a0a',
                    2: '#111111',
                    3: '#1a1a1a',
                    4: '#252525',
                },
                brand: {
                    DEFAULT: '#0957e1',
                    light: '#4a8aff',
                    muted: '#0957e120',
                    shadow: '#0957e14d',
                },
            },
        },
    },
    plugins: [],
}