import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "field.png"],
            manifest: {
                short_name: "3494 Scouting",
                name: "3494 Scouting Application",
                description: "Scouting App",
                icons: [
                    {
                        src: "/favicon.svg",
                        type: "image/svg+xml",
                        sizes: "512x512",
                    },
                    {
                        src: "/favicon-192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "/favicon-512.png",
                        type: "image/png",
                        sizes: "512x512",
                    },
                ],
                start_url: "/#/",
                background_color: "#1A1B1E",
                display: "browser",
                scope: "/",
                theme_color: "#1971C2",
            },
        }),
    ],
});
