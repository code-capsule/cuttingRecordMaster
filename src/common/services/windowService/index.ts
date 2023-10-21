import { BrowserWindowConstructorOptions } from 'electron';
import BaseWindow, { CreateBaseWindowProps } from './baseWindow';

export class WindowService {
  private _cacheWindows: { [key: string]: BaseWindow } = {};
  constructor() {}

  public register(
    name: string,
    options: BrowserWindowConstructorOptions
  ): BaseWindow {
    if (this._cacheWindows[name])
      throw new Error(
        `the ${name} window is registered! can not duplicate registration!`
      );
    return (this._cacheWindows[name] = new BaseWindow({ name, options }));
  }

  public create(name: string, options?: CreateBaseWindowProps): BaseWindow {
    if (!this._cacheWindows[name])
      throw new Error(
        `the ${name} window is not registered, please register first!`
      );
    if (this._cacheWindows[name].isCreated()) {
      console.log(`the ${name} window has been created and will display it`);
      this._cacheWindows[name].show();
      return this._cacheWindows[name];
    }
    const win = this._cacheWindows[name].create(options);
    return win;
  }

  public get(name: string): BaseWindow {
    if (!this._cacheWindows[name])
      throw new Error(
        `the ${name} window is not registered, please register first!`
      );
    return this._cacheWindows[name];
  }

  public exist(name: string): boolean {
    return !!this._cacheWindows[name];
  }
}

export default new WindowService();
