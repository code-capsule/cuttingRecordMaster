import CuttingRecordMasterElectronStore from '@common/stores/localStore';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { userPageSlice } from '@common/stores/reduxStore/reducers/userPage';

interface IProps {
  reduxStore: ToolkitStore;
  localStore?: CuttingRecordMasterElectronStore;
}

class UserStore {
  private reduxStore?: ToolkitStore;
  private localStore?: CuttingRecordMasterElectronStore;

  constructor(props: IProps) {
    this.reduxStore = props.reduxStore;
    this.localStore = props.localStore;
  }

  /**
   * @description 获取用户信息
   */
  public getUserInfo(): MasterUserType.IUserInfo {
    console.log('[stores.user] get user info');
    return this.localStore?.get('userInfo') as MasterUserType.IUserInfo;
  }

  /**
   * @description 更新用户信息
   * @param {IUserDataInfo} userInfo 用户信息
   * @param {boolean} isOverride 是否覆盖
   */
  public updateUserInfo(userInfo: MasterUserType.IUserInfo, isOverride?: boolean) {
    console.log('[stores.user] update user info');
    const info: MasterUserType.IUserInfo = isOverride ? { ...Object.assign(userPageSlice.getInitialState(), userInfo) } : { ...userInfo };
    this.reduxStore?.dispatch(userPageSlice?.actions?.updateUserInfo(info));
    // 同步更新本地json
    this.localStore?.set({
      userInfo: info,
    });
  }
}

export default UserStore;
