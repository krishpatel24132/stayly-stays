import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// base "./" makes the build work on any host (Vercel, Netlify, GitHub Pages) without extra setup
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
