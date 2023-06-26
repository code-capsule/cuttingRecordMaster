import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { merge } from 'lodash';

export interface BaseWindowProps {
  name: string;
  options: BrowserWindowConstructorOptions;
}

export interface CreateBaseWindowProps
  extends BrowserWindowConstructorOptions {}

function getDefaultWindowOptions(): BrowserWindowConstructorOptions {
  return {
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  };
}

class BaseWindow {
  public name: string;
  private _instance: BrowserWindow | null = null;
  private _browserWindowOptions: BrowserWindowConstructorOptions;

  constructor(props: BaseWindowProps) {
    this.name = props.name;
    this._browserWindowOptions = merge(
      getDefaultWindowOptions(),
      props.options
    );
  }

  public create(options?: CreateBaseWindowProps): BaseWindow {
    const _options = this._mergeOptions(options);
    this._instance = new BrowserWindow(_options);
    this._instance.loadURL(`http://localhost:3000/entry/${this.name}.html`);
    this._beforeCreate();
    return this;
  }

  public isCreated(): boolean {
    return !!this._instance;
  }

  public getInstance(): BrowserWindow {
    if (!this._instance)
      throw new Error(
        `failed to obtain the ${this.name} window instance. the window was not created!`
      );
    return this._instance;
  }

  public show() {
    if (!this.getInstance().isVisible()) {
      this.getInstance().show();
    }
  }

  public destroy() {
    this.getInstance().destroy();
    this._instance = null;
  }

  private _mergeOptions(options?: BrowserWindowConstructorOptions) {
    return merge(this._browserWindowOptions, options);
  }

  private _beforeCreate() {
    require('@electron/remote/main').enable(this._instance?.webContents);
    this._instance?.once('closed', () => {
      this.destroy();
    });
  }
}

export default BaseWindow;
