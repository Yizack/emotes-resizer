import { dialog } from "electron";
import { defineIpcHandler } from "../utils/handler";

export default defineIpcHandler("select-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  if (result.canceled) return "";

  return result.filePaths[0];
});
