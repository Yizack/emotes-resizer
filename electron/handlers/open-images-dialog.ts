import path from "path";
import { dialog } from "electron";
import { defineIpcHandler } from "../utils/handler";

const mimeTypes: Record<string, string> = {
  png: "image/png",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  jfif: "image/jpeg",
  gif: "image/gif"
};

const getMimeType = (filePath: string) => {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return mimeTypes[ext];
};

export default defineIpcHandler("open-images-dialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    filters: [{
      name: "Images",
      extensions: Object.keys(mimeTypes)
    }]
  });

  if (result.canceled) return [];

  return result.filePaths.map(filePath => ({
    name: path.basename(filePath),
    path: filePath,
    type: getMimeType(filePath)
  }));
});
