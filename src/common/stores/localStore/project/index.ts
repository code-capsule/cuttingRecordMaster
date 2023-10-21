import ProjectStore from './instance';
import baseConfig from '@src/config/config.base.json';
import { generateUUid } from '@common/utils/uuid';
import { PROJECT_STORE_IPC_KEY } from '@common/constants/ipcEventKey';
import CuttingRecordMasterElectronStore from '@common/stores/localStore';

class ProjectStoreService {
  _instance: ProjectStore = new ProjectStore();
  _onInstanceUnmount: () => void = () => {};

  async initialize() {
    global.master.services.ipc.on(PROJECT_STORE_IPC_KEY.INIT_PROJECT_STORE, async (e, params: MasterProjectType.ICreateProjectStoreParams) => {
      await this.initProjectStore(params);
      e?.request?.resolve(true);
    });
    global.master.services.ipc.on(PROJECT_STORE_IPC_KEY.UNMOUNT_PROJECT_STORE, () => {
      this._onInstanceUnmount();
    });
    return this._instance;
  }

  /**
   * @description 初始化一份工程
   * @summary 需注意，工程数据中没有与用户信息相关的字段，用户以uid作为文件夹名，该文件夹下存放该用户创作的作品
   */
  async initProjectStore(params: MasterProjectType.ICreateProjectStoreParams) {
    const userInfo = global.master.stores?.localStore?.user?.getUserInfo();
    let localProjectId: string;

    // 创建一份工程 project id 映射表
    const projectMapStore = new CuttingRecordMasterElectronStore({
      name: 'projectMapStore',
      stitchFolder: `${userInfo?.uid}`,
    });

    let isNewLocalProject = false;
    if (!params?.projectId) {
      // 1.参数中不携带 projectId，表示新增工程，则在该用户目录下新增一份新工程
      console.log('[stores.project] no project id provided, generate new one!');
      localProjectId = generateUUid();
      isNewLocalProject = true;
      projectMapStore.set(localProjectId, localProjectId);
    } else {
      // 2.携带 projectId，寻找 projectMapStore 下的工程
      const findProjectId = projectMapStore.get(params?.projectId) as string;
      if (!findProjectId) {
        console.log(`[stores.project] no found for the project id ${params?.projectId} in map, will generate new one!`);
        localProjectId = params?.projectId;
        isNewLocalProject = true;
        projectMapStore.set(localProjectId, localProjectId);
      } else {
        console.log(`[stores.project] find the project file with project id ${params?.projectId}`);
        localProjectId = params?.projectId;
      }
    }

    console.log('[stores.project] local project id: ', localProjectId);

    // 3.生成一份本地工程文件 json 文件，存于用户 uid 目录下
    const projectLocalStore = new CuttingRecordMasterElectronStore({
      name: localProjectId,
      stitchFolder: `${userInfo?.uid}/projectData`,
    });

    // 4.读取工程数据
    const reduxStore = global.master.stores.reduxStore;
    await this._instance.connectStore(reduxStore, projectLocalStore);

    // 5.监听 reduxStore 变化，同步至本地工程文件
    this._onInstanceUnmount = this._instance.subscribeProjectStore(reduxStore);

    if (isNewLocalProject) {
      this._instance.updateProjectInfo({
        id: localProjectId,
        projectName: params?.projectName,
        projectHash: this._instance.createHash(),
        createTime: new Date().valueOf(),
        updateTime: new Date().valueOf(),
        appVersion: baseConfig.version,
      });
    }
  }
}

export default new ProjectStoreService();
