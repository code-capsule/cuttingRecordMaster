import { screen } from 'electron';
import windowService from '../../index';
import { RECORD_PROCESS_KEY } from '@common/constants/processKey';

export function registerRecord() {
  windowService.register(RECORD_PROCESS_KEY, {
    width: 880,
    height: 466,
    frame: false,
    transparent: true, // 是否透明
    resizable: false, // 是否可以改变窗口大小
    skipTaskbar: true, // 是否在任务栏中显示窗口
    hasShadow: false, // 是否显示阴影
    // fullscreen: true, // 是否全屏
    // simpleFullscreen:true,
    // alwaysOnTop: true, // 是否在其他窗口上面
    // type: 'desktop', // 设置窗口类型为 desktop
    // titleBarStyle: 'customButtonsOnHover', // 标题栏样式
    // minimizable: false,
    // maximizable: false,
    // closable: false,
  });
}

export function createRecord() {
  windowService.create(RECORD_PROCESS_KEY);
}
