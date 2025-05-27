import { defineConfig } from "vite";

export default defineConfig({
  build: {
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
        "node:path",
        "node:url",
        "node:fs"
      ]
    }
  },
  publicDir: false
});
