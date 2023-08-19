module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",

            // light mode colors
            blackLight: "#000000",
            whiteLight: "#edf2f4",
            //------------------//

            // dark mode colors
            blackDark: "#202020",
            whiteDark: "#e2e8f0",
            blackSecondary: "#181818",
            blackThird: "#121212",
            grayBg1: "#1c2022",
            //------------------//
        },
    },
    plugins: [],
};
