class UserStore {
  /**
   * @description 获取用户信息
   */
  public getUserInfo() {
    console.log('[userStoreService] get user info');
  }

  /**
   * @description 更新用户信息
   */
  public updateUserInfo() {
    console.log('[userStoreService] update user info');
  }

  /**
   * @description 重写用户信息
   */
  public overrideUserInfo() {
    console.log('[userStoreService] override user info');
  }
}

export default UserStore;
