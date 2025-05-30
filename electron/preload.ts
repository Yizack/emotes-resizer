import { contextBridge, ipcRenderer, webUtils } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
export const handlers = {
  processImages: (paths: string[], options: ImagesProcessOptions): Promise<void> => ipcRenderer.invoke("process-images", paths, options),
  openImagesDialog: (): Promise<{ name: string, path: string, type: string }[]> => ipcRenderer.invoke("open-images-dialog"),
  getFilePath: (file: File): string => webUtils.getPathForFile(file)
};

contextBridge.exposeInMainWorld("electron", handlers);
