/**
 * @TODO 应用启动时的一些处理
 */
import path from 'path';
import fileTool from '@common/tools/fileTool';
import { app } from 'electron';
import { PROJECT_NAME } from '@common/constants/processKey';

/**
 * @description 启动时应用数据存档路径设置
 */
async function initAppArchivePath() {
  const appArchivePath = path.join(app.getPath('userData'), '../', PROJECT_NAME);
  try {
    await fileTool.mkdirDir(appArchivePath);
  } catch (err) {
    console.log(`create ${PROJECT_NAME} folder fail !`);
  }
  return appArchivePath;
}

export { initAppArchivePath };
