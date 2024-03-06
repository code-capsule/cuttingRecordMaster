const { desktopCapturer } = require('@electron/remote');
const remote = require('@electron/remote');
const screen = remote.screen;
import { IScreenDisplay } from './typings';
import { getLogger } from '@src/common/tools/log';
const log = getLogger('SystemTool');

const ENTIRE_SCREEN = 'Entire screen';

class SystemTool {
  public async getPrimaryScreenDisplay(): Promise<IScreenDisplay> {
    const sources = await this.getDesktopCapturerSources();
    const primaryDisplay = this.getPrimaryDisplay();
    const primaryDisplayId: number = primaryDisplay.id;
    const primaryDpiDisplaySize = this.getDpiDisplaySize(primaryDisplay.size, primaryDisplay.scaleFactor);
    log.info('get primaryDisplayId:', primaryDisplayId);
    try {
      const primarySourceId = this.findDesktopSourceIdByDisplayId(sources, primaryDisplayId);
      return {
        sourceId: primarySourceId,
        display: primaryDisplay,
        dpiDisplaySize: primaryDpiDisplaySize
      };
    } catch {
      const primarySourceId = this.getAfterDegradationSourceId(sources);
      return {
        sourceId: primarySourceId,
        display: primaryDisplay,
        dpiDisplaySize: primaryDpiDisplaySize
      };
    }
  }

  /**
   * 在某些低版本 windows 系统下，sources 里的 display_id 为空
   * 此时，需要做一些降级处理，通过 source.name 来获取主屏幕的 sourceId
   * @param sources 一堆可以被捕获的源
   */
  public getAfterDegradationSourceId = (sources: Electron.DesktopCapturerSource[]): string => {
    log.info('get after degradation sourceId');
    let sourceId = '';
    for (const source of sources) {
      if (source.name === ENTIRE_SCREEN) {
        sourceId = source.id;
        break;
      }
    }
    if (!sourceId) {
      sourceId = sources[0].id;
    }
    if (!sourceId) {
      const error = 'Can not find after degradation sourceId';
      log.error(error);
      throw new Error(error);
    }
    return sourceId;
  };

  /**
   * 获取当前可以被捕获的源
   * @param types string[]，值为 'screen' | 'window'，加入了 'window' 则可以获取当前设备所以可被捕获的应用窗口
   * @returns 当前可以被捕获的源
   */
  public getDesktopCapturerSources = async (types: string[] = ['screen']): Promise<Electron.DesktopCapturerSource[]> => {
    try {
      const sources = await desktopCapturer.getSources({ types });
      log.info('get desktop capturer sources success', sources);
      return sources;
    } catch (error: any) {
      log.error('get desktop capturer sources error:', error);
      return [];
    }
  };

  /**
   * 根据 displayId 获取对应屏幕的 sourceId
   * @param sources 一堆可以被捕获的源
   * @param displayId 通过 remote.screen 获取到的屏幕的 displayId
   */
  public findDesktopSourceIdByDisplayId = (sources: Electron.DesktopCapturerSource[], displayId: number): string => {
    let sourceId = '';
    for (const source of sources) {
      if (source.display_id === String(displayId)) {
        sourceId = source.id;
        break;
      }
    }
    if (!sourceId) {
      const error = `Can not find target sourceId, the target displayId is ${displayId}`;
      log.error(error);
      throw new Error(error);
    }
    return sourceId;
  };

  /**
   * 获取当前主屏的 display
   * @returns 主屏的 display
   */
  public getPrimaryDisplay = (): Electron.Display => {
    const primaryDisplay = screen.getPrimaryDisplay();
    return primaryDisplay;
  };

  /**
   * 通过 displayId 获取对应屏幕的 dip 尺寸
   * @param displayId
   */
  public getDpiDisplaySizeByDisplayId = (displayId: number): Electron.Size => {
    const display = this.findDisplayByDisplayId(displayId);
    const { size, scaleFactor } = display;
    return this.getDpiDisplaySize(size, scaleFactor);
  };

  /**
   * 通过 displayId 获取对应屏幕的 display
   * @param displayId
   */
  public findDisplayByDisplayId = (displayId: number): Electron.Display => {
    const allDisplay = screen.getAllDisplays();
    let targetDisplay;
    for (const display of allDisplay) {
      if (display.id === displayId) {
        targetDisplay = display;
        break;
      }
    }
    if (!targetDisplay) {
      const error = `Can not find target display, the target displayId is ${displayId}`;
      log.error(error);
      throw new Error(error);
    }
    return targetDisplay;
  };

  /**
   * 获取 dpi 的尺寸大小
   * @param displaySize 尺寸
   * @param scaleFactor 屏幕缩放比
   */
  public getDpiDisplaySize = (displaySize: Electron.Size, scaleFactor: number): { width: number; height: number } => {
    return {
      width: displaySize.width * scaleFactor,
      height: displaySize.height * scaleFactor
    };
  };

  /**
   * 获取麦克风列表
   */
  public getMicrophoneList = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const microphones = devices.filter((device) => device.kind === 'audioinput');
    return microphones;
  };

  /**
   * 获取摄像头列表
   */
  public getCameraList = async (): Promise<MediaDeviceInfo[]> => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    return cameras;
  };
}

export default new SystemTool() as SystemTool;
