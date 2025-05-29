import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import setLanguages from "electron-packager-languages";

export default {
  packagerConfig: {
    name: "emotes-resizer",
    icon: "public/favicon",
    appBundleId: "com.yizack.emotes-resizer",
    appCategoryType: "public.app-category.utilities",
    asar: {
      unpack: "**/node_modules/{sharp,@img}/**/*"
    },
    osxSign: {},
    ignore: [
      /^\/(?!node_modules|package\.json|.vite)/
    ],
    afterCopy: [setLanguages(["en", "en-US", "en-GB"], { allowRemoveAll: true })]
  },
  rebuildConfig: {
    onlyModules: ["sharp"],
    force: true
  },
  makers: [
    new MakerSquirrel({ usePackageJson: true }),
    new MakerZIP({}),
    new MakerRpm({}),
    new MakerDeb({})
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
      renderer: []
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
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Yizack",
          name: "emotes-resizer"
        },
        prerelease: true
      }
    }
  ]
} satisfies ForgeConfig;
