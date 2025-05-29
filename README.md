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
- 📂 Save processed images in the same directory as originals
- ⚡ Fast image processing using [Sharp](https://sharp.pixelplumbing.com/)

## <a name="installation">📥 Installation</a>

### Windows

1. Download the latest `.exe` file from the [Releases](https://github.com/Yizack/emotes-resizer/releases) page.
2. Run the executable to start the application.


### Mac and Linux

Not yet available.

## <a name="usage">📚 Usage</a>

### Quick Start Guide

- **Open the application**: Launch the app from the downloaded executable.
- **Select files**: You can add files to the app in two ways:
  - Click the "Select Files" button
  - Drag and drop your images directly into the app window.

### Configure resizing options

- **Resample**: Choose the interpolation method. (Nearest Neighbor, Bilinear, Bicubic)
- **Action**: Processing mode availables:
  - **Generate**: Generate specified sizes from the original image.
  - **Scale**: Scale the original image by a specified percentage factor.
  - **Resize**: Resize the original image to the specified size.

### Process images

The processed images will be saved in the same directory as the original files in `PNG` format. Each generated image's filename will include a size suffix (e.g., `emote-28.png`, `emote-56.png`) to identify its dimensions.

### Application Screenshots

| Initial Screen | Files selected |
|:---:|:---:|
| ![initial](https://github.com/user-attachments/assets/618d9667-d0f7-4cb9-9873-b89c0e46388c) | ![generate](https://github.com/user-attachments/assets/a13b6937-20cc-43de-a582-b7898a984171) |
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
