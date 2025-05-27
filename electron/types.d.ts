// TypeScript declarations for the Electron APIs
// This makes TypeScript understand our window.electron object

interface ElectronAPI {
  openFile: () => Promise<{ filePath: string, data: string } | null>;
  saveFile: (options: { data: string, defaultPath: string }) => Promise<string | null>;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {};
