export interface IScreenDisplay {
  sourceId: string;
  display: Electron.Display;
  dpiDisplaySize: {
    width: number;
    height: number;
  };
}