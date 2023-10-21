import { Unsubscribe } from 'redux';
import md5 from 'md5';
import { merge  } from 'lodash';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import CuttingRecordMasterElectronStore from '@common/stores/localStore';
import { projectPageSlice, initialProjectState } from '@common/stores/reduxStore/reducers/projectPage';

class ProjectStore {
  private reduxStore?: ToolkitStore;
  private localStore?: CuttingRecordMasterElectronStore;
  public currentVersion = 0;
  public lastHash: string | undefined;
  private unsubscribe?: Unsubscribe | any;
  public isWritingFile = false; // 是否正在写入本地文件

  async connectStore(reduxStore: ToolkitStore, localStore: CuttingRecordMasterElectronStore) {
    this.reduxStore = reduxStore;
    this.localStore = localStore;
    this.lastHash = (reduxStore?.getState() as MasterAppStoreType.AppState)?.projectPage?.projectHash || undefined;
    this.currentVersion = (this.localStore?.get('projectVersion') as number) || 0;
    const projectInfo = this.localStore?.get('projectData') as MasterProjectType.IProjectDataInfo;
    const initState = merge({}, initialProjectState, projectInfo);
    this.overrideProjectInfo(initState);
  }

  /**
   * 1.由于 dispatch action 导致 redux 数据更改
     2.通过订阅 redux 数据的更改去更新工程数据，换言之，由 redux 驱动更新工程数据
   */
  subscribeProjectStore(reduxStore: ToolkitStore) {
    this.unsubscribe = reduxStore.subscribe(() => {
      const state: MasterAppStoreType.AppState = reduxStore?.getState();
      if (state?.projectPage?.projectVersion !== this.currentVersion) {
        this.currentVersion = state?.projectPage?.projectVersion || 0;
        if (!this.isWritingFile) {
          console.log('[projectStoreService] will write local project json file');
          this.isWritingFile = true;
          this.save2JsonSync(this.currentVersion, state.projectPage);
        }
      }
    });
    return () => {
      this?.unsubscribe();
      this.overrideProjectInfo(initialProjectState);
      this.localStore = undefined;
      this.reduxStore = undefined;
      this.currentVersion = 0;
    };
  }

  createHash() {
    const projectInfo = this.getProjectInfo();
    const _hash = md5(JSON.stringify(projectInfo));
    return _hash;
  }

  /**
   * @description 获取工程信息
   */
  public getProjectInfo() {
    console.log('[projectStoreService] get project info');
    const projectInfo = (this.reduxStore?.getState() as MasterAppStoreType.AppState)?.projectPage;
    return projectInfo;
  }

  /**
   * @description 更新工程信息
   * @summary 每次更新数据，工程版本号都加一
   */
  public updateProjectInfo(info?: MasterProjectType.IProjectDataInfo) {
    if (!this.reduxStore) return -1;
    const version = this.currentVersion + 1;
    console.log('[projectStoreService] update project info');
    this.reduxStore?.dispatch(
      projectPageSlice?.actions.updateProjectInfo({
        ...info,
        projectVersion: version,
        updateTime: new Date().valueOf(),
      })
    );
    return version;
  }

  /**
   * @description 重写工程信息
   */
  public overrideProjectInfo(info: MasterProjectType.IProjectDataInfo) {
    console.log('[projectStoreService] override project info');
    this.reduxStore?.dispatch(
      projectPageSlice?.actions.overrideProjectInfo({
        ...info,
        updateTime: new Date().valueOf(),
      })
    );
  }

  /**
   * @description redux 状态驱动修改本地的 project.json
   */
  private save2JsonSync = (version?: number, data?: MasterProjectType.IProjectDataInfo) => {
    this.localStore?.set('projectData', data);
    this.localStore?.set('projectVersion', version);
    this.isWritingFile = false;
    console.log('[projectStoreService] update local project json file');
  };
}

export default ProjectStore;
