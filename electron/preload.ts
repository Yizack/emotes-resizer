import { contextBridge, ipcRenderer, webUtils } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
export const handlers = {
  selectImages: (): Promise<{ name: string, path: string, type: string }[]> => ipcRenderer.invoke("select-images"),
  selectDirectory: (): Promise<string> => ipcRenderer.invoke("select-directory"),
  processImages: (paths: string[], options: ImagesProcessOptions): Promise<void> => ipcRenderer.invoke("process-images", paths, options),
  getFilePath: (file: File): string => webUtils.getPathForFile(file)
};

contextBridge.exposeInMainWorld("electron", handlers);
