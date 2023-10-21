class DraftStore {
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
