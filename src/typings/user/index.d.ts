declare namespace MasterUserType {
  interface IUserInfo {
    uid?: string;
    token?: string;
    /**
     * @description 手机号
     */
    phone?: string;
    /**
     * @description 名称
     */
    username?: string;
    /**
     * @description 头像链接
     */
    photoUrl?: string;
    /**
     * @description 密码
     */
    password?: string;
  }
}
