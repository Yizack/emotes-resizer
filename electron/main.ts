import { fileURLToPath } from "node:url";
import { BrowserWindow, app, shell } from "electron";
import started from "electron-squirrel-startup";
import handlerProcessImages from "./handlers/process-images";
import handlerOpenImagesDialog from "./handlers/open-images-dialog";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 400,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: fileURLToPath(new URL("preload.cjs", import.meta.url))
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.webContents.on("will-navigate", function (event, reqUrl) {
    const requestedHost = new URL(reqUrl).host;
    const currentHost = new URL(mainWindow.webContents.getURL()).host;
    if (requestedHost && requestedHost != currentHost) {
      event.preventDefault();
      shell.openExternal(reqUrl);
    }
  });

  // and load the index.html of the app.
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    mainWindow.setIcon(fileURLToPath(new URL("../../public/favicon.ico", import.meta.url)));
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  }
  else {
    mainWindow.loadFile(fileURLToPath(new URL("../renderer/index.html", import.meta.url)));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Register IPC handlers
handlerProcessImages();
handlerOpenImagesDialog();
