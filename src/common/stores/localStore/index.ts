/**
 * @description 本地持久化缓存 store
 * @summary 以 json 格式存储于本地
 * https://www.npmjs.com/package/electron-store
 */
import { app } from 'electron';
import path from 'path';
import { PROJECT_NAME } from '@common/constants/processKey';
import ElectronStore from 'electron-store';

// 草稿工程列表数据
interface IProps {
  /**
   * @description 文件存储名
   * @default {string} config
   */
  name?: string;
  /**
   * @description 文件存储路径
   * @default {string} C:\Users\user\AppData\{PROJECT_NAME}
   */
  cwd?: string;
  /**
   * @description 路径下的子目录
   */
  stitchFolder?: string;
  /**
   * @description 文件存储格式
   * @default  {string} json
   */
  fileExtension?: string;
}

class CuttingRecordMasterElectronStore extends ElectronStore {
  constructor(props: IProps) {
    const _cwd = props?.cwd || path.join(app.getPath('userData'), '../', PROJECT_NAME, props.stitchFolder || '');
    super({
      name: props?.name,
      fileExtension: props?.fileExtension || 'json',
      cwd: _cwd,
    });
  }
}

export default CuttingRecordMasterElectronStore;
