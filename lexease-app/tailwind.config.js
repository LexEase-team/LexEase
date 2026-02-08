/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#F1F5F9', // Light greyish background
                primary: '#6366F1', // Indigo
                secondary: '#EC4899', // Pink
                accent: '#8B5CF6', // Purple
                dark: '#0F172A', // Slate 900
                'pastel-blue': '#E0E7FF',
                'pastel-purple': '#F3E8FF',
                'pastel-pink': '#FCE7F3',
                'pastel-teal': '#CCFBF1',
                'pastel-yellow': '#FEF3C7',
                'surface': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'sans-serif'],
                satoshi: ['Outfit', 'sans-serif'],
                dyslexic: ['OpenDyslexic', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            boxShadow: {
                'soft': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
                'nav': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
