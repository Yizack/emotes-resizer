import path from "node:path";
import { dialog, ipcMain } from "electron";

export default function () {
  return ipcMain.handle("open-images-dialog", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile", "multiSelections"],
      filters: [{
        name: "Images",
        extensions: ["jpg", "jpeg", "png", "gif", "webp"]
      }]
    });

    if (result.canceled) return [];

    return result.filePaths.map(filePath => ({
      name: path.basename(filePath),
      path: filePath
    }));
  });
}
