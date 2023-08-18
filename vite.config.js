import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        // Mengatur proxy untuk mengakses API The Movie DB
        proxy: {
            "/api": {
                target: "https://api.themoviedb.org/3",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
