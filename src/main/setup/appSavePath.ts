/**
 * @description 应用的数据存储路径
 */
import { app } from 'electron';
import path from 'path';
import { PROJECT_NAME } from '@common/constants/processKey';
import fileTool from '@common/tools/fileTool';

async function initAppSavePath() {
  const appSavePath = path.join(app.getPath('userData'), '../', PROJECT_NAME);
  try {
    await fileTool.mkdirDir(appSavePath);
  } catch (err) {
    console.log(`create ${PROJECT_NAME} folder fail !`);
  }
  return appSavePath;
}

export default initAppSavePath;