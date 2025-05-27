import { fileURLToPath } from "node:url";
import { cp, mkdir } from "node:fs/promises";
import { defineConfig } from "vite";

const outputDir = fileURLToPath(new URL("../.output/public", import.meta.url));
const targetDir = fileURLToPath(new URL("../.vite/renderer", import.meta.url));

await mkdir(targetDir, { recursive: true });
await cp(outputDir, targetDir, { recursive: true, force: true });

export default defineConfig({
  root: outputDir,
  publicDir: false,
  build: {
    outDir: targetDir,
    write: false,
    emptyOutDir: true
  }
});
