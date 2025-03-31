import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.svg"],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  publicDir: "public",
});
