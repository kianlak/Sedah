import { defineConfig } from "vite";

export default defineConfig({
  root: "frontend",
  envDir: "..",
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  envPrefix: ["VITE_", "TAURI_"]
});
