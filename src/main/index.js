import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const window = new BrowserWindow({});
  window.loadURL("http://localhost:3000/src/main/index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
