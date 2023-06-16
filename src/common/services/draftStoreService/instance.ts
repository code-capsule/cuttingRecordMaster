class DraftStore {
  /**
   * @description 获取本地草稿读取的目录路径
   */
  private getProjectPath = () => {
    const appSavePath = global.master.appSavePath;
    const userStoreService = global.master.services.userStoreService;
    const uid = userStoreService?.getUserInfo()?.uid || undefined;
    if (!uid) return '';
    else {
      console.log('[draftStore] get project draft path is: ', `${appSavePath}\\${uid}\\projectData`);
      return `${appSavePath}\\${uid}\\projectData`;
    }
  };

  /**
   * @description 获取首页的草稿列表
   */
  async getHomeDraftList() {
    console.log('[draftStore] get home draft list!');
  }

  /**
   * @description 获取回收站的草稿列表
   */
  async getRecycleDraftList() {
    console.log('[draftStore] get recycle draft list!');
  }

  /**
   * @description 更新一份草稿
   */
  async updateOneDraft() {
    console.log('[draftStore] update on draft!');
  }

  /**
   * @description 删除一份草稿
   */
  async deleteOneDraft() {
    console.log('[draftStore] delete on draft!');
  }
}

export default DraftStore;
