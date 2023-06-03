import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';

export interface BaseWindowOptions extends BrowserWindowConstructorOptions {
  name: string;
}

/**
 * 公共的创建窗口的方法
 * @param {*} params 参数
 */
export const createWindow = (params: BaseWindowOptions) => {
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
