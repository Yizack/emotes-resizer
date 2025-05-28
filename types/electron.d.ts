import type { handlers } from "./../electron/preload";

type ElectronAPI = typeof handlers;

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
