import { BrowserWindow } from "electron";

/**
 * 公共的创建窗口的方法
 * @param {*} params 参数
 */
export const createWindow = (params) => {
  const { name, width, height } = params;
  const window = new BrowserWindow({
    title: name,
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.loadURL(`http://localhost:3000/entry/${name}.html`);
};
