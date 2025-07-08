import { APP } from "../app/utils/app-info";

export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint"
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    baseURL: "./",
    cdnURL: "./",
    head: {
      title: APP.name,
      meta: [
        { "http-equiv": "content-security-policy", "content": "script-src 'self' 'unsafe-inline'" }
      ]
    }
  },
  css: [
    "~/assets/css/ui.tailwind.css",
    "~/assets/scss/app.scss"
  ],
  router: {
    options: {
      hashMode: true
    }
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    storageKey: "nuxt-color-mode"
  },
  ui: {
    colorMode: true,
    fonts: false
  },
  future: { compatibilityVersion: 4 },
  features: {
    inlineStyles: false
  },
  experimental: {
    typedPages: true,
    payloadExtraction: false,
    renderJsonPayloads: false
  },
  compatibilityDate: "2025-05-26",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["mixed-decls", "color-functions", "import", "global-builtin"]
        }
      }
    }
  },
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {}
    }
  },
  eslint: {
    config: {
      autoInit: false,
      stylistic: true
    }
  },
  icon: {
    provider: "iconify",
    clientBundle: {
      scan: true
    }
  }
});
