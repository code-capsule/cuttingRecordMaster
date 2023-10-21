import fileTool from '@common/tools/fileTool';
import { draftPageSlice } from '@common/stores/reduxStore/reducers/draftPage';

class DraftStore {
  /**
   * @description 获取本地草稿读取的目录路径
   */
  private getProjectPath = () => {
    const appArchivePath = global.master.appArchivePath;
    const userLocalStore = global.master.stores?.localStore.user;
    const uid = userLocalStore?.getUserInfo()?.uid || undefined;
    if (!uid) return '';
    else {
      console.log('[stores.draft] get project draft path is: ', `${appArchivePath}\\${uid}\\projectData`);
      return `${appArchivePath}\\${uid}\\projectData`;
    }
  };

  /**
   * @description 获取首页的草稿列表
   */
  async getHomeDraftList() {
    const draftList = await this.readDraftList({ isDelete: false });
    console.log('[stores.draft] get home draft list!');
    // 同步到 redux 中
    global.master.stores.reduxStore?.dispatch(draftPageSlice?.actions.updateDraftList(draftList));
    return draftList;
  }

  /**
   * @description 获取回收站的草稿列表
   */
  async getRecycleDraftList() {
    console.log('[stores.draft] get recycle draft list!');
  }

  /**
   * @description 获取草稿列表数据
   */
  private async readDraftList({ isDelete }: { isDelete: boolean }): Promise<MasterDraftType.IDraftItem[]> {
    const projectSavePath = this.getProjectPath();
    if (!projectSavePath) return [];
    console.log(`[stores.draft] read draft project directory, the directory path is ${projectSavePath}`);
    try {
      // 1.读到该目录下所有的文件名
      const projectFileList = await fileTool.readdirSync(projectSavePath);
      // 2.读取文件内容
      const _promiseList = projectFileList?.map((projectFileName: string) => this.readFileJson(`${projectSavePath}\\${projectFileName}`));
      const promiseResolveDataList = await Promise.all(_promiseList);
      // 3.构造草稿信息
      const draftList: MasterDraftType.IDraftItem[] = [];
      promiseResolveDataList?.forEach((data: string) => {
        const fileSaveStore = this.parseFileJson(data);
        if (fileSaveStore && fileSaveStore.projectData?.id) {
          const draftDataItem = this.composeDraftData(fileSaveStore.projectData);
          if (isDelete) {
            if (draftDataItem.isDelete) draftList.push(draftDataItem);
          }
          if (!isDelete) {
            if (!draftDataItem.isDelete) draftList.push(draftDataItem);
          }
        }
      });
      // 按照更新时间进行排序
      return draftList?.sort(
        (p: MasterDraftType.IDraftItem, d: MasterDraftType.IDraftItem) => (d?.updateTime || 0) - (p?.updateTime || 0)
      ) as MasterDraftType.IDraftItem[];
    } catch (err) {
      return [];
    }
  }

  /**
   * @description 更新一份草稿
   */
  async updateOneDraft() {
    console.log('[stores.draft] update on draft!');
  }

  /**
   * @description 删除一份草稿
   */
  async deleteOneDraft() {
    console.log('[stores.draft] delete on draft!');
  }

  /**
   * @description 对 json 文件
   */
  private async readFileJson(path: string) {
    return fileTool.read(path, 'utf-8');
  }

  /**
   * @description 解析 json 文件
   */
  private parseFileJson(data: string) {
    try {
      return JSON.parse(data) as MasterProjectType.ISaveLocalProjectJson;
    } catch (err) {
      return undefined;
    }
  }

  /**
   * @description 组装成草稿数据
   */
  private composeDraftData(data?: MasterProjectType.IProjectDataInfo): MasterDraftType.IDraftItem {
    return {
      id: data?.id,
      projectName: data?.projectName,
      cover: data?.cover,
      videoUrl: data?.cover,
      duration: data?.duration,
      createTime: data?.createTime,
      updateTime: data?.updateTime,
      isDelete: data?.isDelete,
    };
  }
}

export default DraftStore;
