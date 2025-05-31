import { ipcMain } from "electron";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defineIpcHandler = (channel: string, handler: (...args: any[]) => any) => {
  return () => ipcMain.handle(channel, (_, ...args) => handler(...args));
};
