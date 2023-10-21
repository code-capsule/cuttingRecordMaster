/**
 * @description 应用的数据存储路径
 */
import { app } from 'electron';
import path from 'path';
import { PROJECT_NAME } from '@common/constants/processKey';
import fileTool from '@common/tools/fileTool';

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
