import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { PublisherGithub } from "@electron-forge/publisher-github";
import setLanguages from "electron-packager-languages";
import packageJSON from "../package.json";

export default {
  packagerConfig: {
    name: packageJSON.name,
    appBundleId: "com.yizack.emotes-resizer",
    appCategoryType: "public.app-category.utilities",
    appCopyright: `Copyright (C) ${new Date().getFullYear()} ${packageJSON.author.name}`,
    icon: "public/favicon",
    asar: {
      unpack: "**/node_modules/{sharp,@img}/**/*"
    },
    osxSign: {},
    ignore: [
      /^\/(?!node_modules|package\.json|.vite)/
    ],
    afterCopy: [setLanguages(["en", "en-US", "en-GB"])]
  },
  rebuildConfig: {
    onlyModules: ["sharp"],
    force: true
  },
  makers: [
    new MakerZIP({}),
    // Windows
    new MakerSquirrel({
      usePackageJson: true,
      iconUrl: "https://raw.githubusercontent.com/Yizack/emotes-resizer/main/public/favicon.ico",
      setupIcon: "public/favicon.ico"
    }),
    // macOS
    new MakerDMG({
      overwrite: true,
      format: "ULFO",
      icon: "public/favicon.icns"
    }),
    // Linux
    new MakerDeb({
      options: {
        categories: ["Utility"],
        icon: "public/favicon.png"
      }
    })
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          entry: "electron/main.ts",
          config: ".config/vite.forge.ts",
          target: "main"
        },
        {
          entry: "electron/preload.ts",
          config: ".config/vite.forge.ts",
          target: "preload"
        }
      ],
      renderer: [] // Nuxt app is generated no need to specify renderer
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    }),
    new AutoUnpackNativesPlugin({})
  ],
  publishers: [
    new PublisherGithub({
      repository: {
        owner: "Yizack",
        name: packageJSON.name
      },
      prerelease: true
    })
  ]
} satisfies ForgeConfig;
