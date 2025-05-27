import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  root: fileURLToPath(new URL(".output/public", import.meta.url)),
  publicDir: false,
  build: {
    outDir: fileURLToPath(new URL(".vite/renderer", import.meta.url)),
    emptyOutDir: true
  }
});
