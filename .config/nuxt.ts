export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint"
  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      title: "Emote Resizer",
      meta: [
        { "http-equiv": "content-security-policy", "content": "script-src 'self' 'unsafe-inline'" }
      ]
    }
  },
  css: [
    "~/assets/css/ui.tailwind.css",
    "~/assets/scss/app.scss"
  ],
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
    typedPages: true
  },
  compatibilityDate: "2025-05-26",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
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
