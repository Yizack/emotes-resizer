import { fileURLToPath } from "node:url";
import { cp, mkdir } from "node:fs/promises";
import { type Plugin, defineConfig } from "vite";

const copyNuxtOutput: Plugin = {
  name: "copy-nuxt-output",
  async closeBundle () {
    const outputDir = fileURLToPath(new URL("../.output/public", import.meta.url));
    const targetDir = fileURLToPath(new URL("../.vite/renderer", import.meta.url));
    await mkdir(targetDir, { recursive: true });
    await cp(outputDir, targetDir, { recursive: true, force: true });
  }
};

export default defineConfig({
  publicDir: false,
  plugins: [copyNuxtOutput],
  build: {
    emptyOutDir: false,
    lib: {
      entry: "electron/main.ts",
      formats: ["cjs"]
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].cjs"
      },
      external: [
        "electron",
        "serialport",
        "sqlite3",
        "sharp"
      ]
    }
  }
});
