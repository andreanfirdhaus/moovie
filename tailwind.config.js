/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                surface: {
                    base: '#0B0B0B',
                    raised: '#141414',
                    elevated: '#1E1E1E',
                    overlay: '#282828',
                    hover: '#2E2E2E',
                    active: '#383838',
                },
                foreground: {
                    DEFAULT: '#F4F4F5',
                    secondary: '#D4D4D8',
                    muted: '#A1A1AA',
                    disabled: '#7A7A83',
                },
                border: {
                    DEFAULT: '#2B2B2B',
                    subtle: '#1C1C1C',
                    hover: '#3F3F3F',
                    strong: '#525252',
                },
                primary: {
                    DEFAULT: '#0957E1',
                    hover: '#256EF4',
                    active: '#0742AB',
                    accent: '#4A8AFF',
                    muted: '#0957E126',
                },
                danger: {
                    surface: '#450A0A50',
                    border: '#7F1D1D',
                    text: '#F87171',
                    hover: '#DC2626',
                },
                success: {
                    surface: '#052E1650',
                    border: '#14532D',
                    text: '#4ADE80',
                },
                warning: {
                    surface: '#42200650',
                    border: '#713F12',
                    text: '#FACC15',
                },
            },
            borderRadius: {
                sm: '6px',
                md: '10px',
                lg: '12px',
            },
        },
    },
    plugins: [],
};