![presentation](https://github.com/user-attachments/assets/b3ce0973-15e3-4ed4-98e9-93e52db7a6fb)

# emotes-resizer

![GitHub release](https://img.shields.io/github/v/release/Yizack/emotes-resizer)
![License](https://img.shields.io/github/license/Yizack/emotes-resizer)

A desktop application for streamers and content creators to quickly resize emotes, badges, and other stream assets.

- [✨ Release Notes](CHANGELOG.md)

## Contents

- 🚀 [Features](#features)
- 📥 [Installation](#installation)
- 📚 [Usage](#usage)
- 🗒️ [Credits](#credits)
- ⚖️ [License](#license)
- 💻 [Development](#development)

## <a name="features">🚀 Features</a>

- 🖼️ User-friendly interface with drag-and-drop support
- 📐 Resizing modes
- 💾 Processing multiple files at once
- 📂 Save processed images to the original folder or select a custom output directory
- ⚡ Fast image processing using [Sharp](https://sharp.pixelplumbing.com/)
- 🖥️ Cross-platform support for Windows, macOS, and Linux

## <a name="installation">📥 Installation</a>

We provide pre-built binaries for Windows, macOS, and Linux. You can download the latest version from the [Releases](https://github.com/Yizack/emotes-resizer/releases) page.

### Download guide

Where `X.X.X` is the current version number, you can chose from the following options:

- **Windows**:
  - `emotes-resizer-X.X.X.Setup.exe`
  - `emotes-resizer-win32-x64-X.X.X.zip`
  - `emotes_resizer-X.X.X-full.nupkg`
- **macOS**:
  - `emotes-resizer-X.X.X-arm64.dmg`
  - `emotes-resizer-darwin-arm64-X.X.X.zip`
- **Linux**:
  - `emotes-resizer_X.X.X_amd64.deb`
  - `emotes-resizer-linux-x64-X.X.X.zip`

## <a name="usage">📚 Usage</a>

### Quick Start Guide

- **Open the application**: Launch the app from the downloaded executable.
- **Select files**: You can add files to the app in two ways:
  - Click the "Select Files" button
  - Drag and drop your images directly into the app window.

### Configure resizing options

- **Resample**: Available resample methods: Nearest neighbor, Cubic, Mitchell, Lanczos2 and Lanczos3.
- **Action**: Processing mode available:
  - **Generate**: Generate specified sizes from the original image.
  - **Scale**: Scale the original image by a specified percentage factor.
  - **Resize**: Resize the original image to the specified size.

### Process images

The processed images will be saved in the same directory as the original files by default or in the selected directory, by default the images are saved in its original format unless a format option has been chosen. Each generated image's filename will include a size suffix (e.g., `emote-28.png`, `emote-56.png`, `emote-200%.png`) to identify its dimensions or scale percentage.

### Application Screenshots

| Initial Screen | Files selected |
|:---:|:---:|
| ![initial](https://github.com/user-attachments/assets/993b13c8-7394-4c82-8203-277e2689a75c) | ![generate](https://github.com/user-attachments/assets/d23caca3-5809-450f-8c2e-2ccc9b59c9ac) |
| *Drag & drop interface* | *Action mode: Generate* |
  
## <a name="credits">🗒️ Credits</a>

- [Nuxt](https://nuxt.com/), the [Vue](https://vuejs.org/) framework
- Build for desktop with [Electron Forge](https://www.electronforge.io/)
- Image processing with [Sharp](https://sharp.pixelplumbing.com/)
- Styling with [Nuxt UI](https://ui.nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/)

## <a name="license">⚖️ License</a>

Made with ❤️

Open Source app and published under [MIT License](LICENSE).

## <a name="development">💻 Development</a>

<details>
  <summary>Local development</summary>

### Install, lint, and typecheck
```sh
# Install dependencies
pnpm install

# Run ESLint
npm run lint

# Run typecheck
npm run test:types
```

### Run the application in development mode

```sh
# Run Nuxt + Electron app in development mode
npm run dev
```

### Build the application for production:

```sh
# Build Nuxt app
npm run generate

# Make distributable packages
npm run make

# (or run both in one command)
# npm run build
```
</details>
