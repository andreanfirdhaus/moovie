const { info } = require("autoprefixer")
const { Warning } = require("postcss")

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

            //---- Theme default business daisyui ----//

            primary: "#1c4f82",
            secondary: "#7d919b",
            accent: "#eb6b47",
            neutral: "#23282f",
            base: "#212121",
            info: "#0092d6",
            success: "#6cb288",
            warning: "#daad58",
            error: "#ab3d30",

            // scrollbar theme
            grayScrl: "#a6acba",
        },
    },
    plugins: [
        require("tailwind-scrollbar")({ nokompatibel: true }),
    ],
};
