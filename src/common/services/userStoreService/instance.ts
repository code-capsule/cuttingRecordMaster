import CuttingRecordMasterElectronStore from '@common/stores/localStore';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { userPageSlice } from '@common/stores/reduxStore/reducers/userPage';
import { initialUserState } from '@common/stores/reduxStore/reducers/userPage';

interface IProps {
  reduxStore: ToolkitStore;
  localStore?: CuttingRecordMasterElectronStore;
}

class UserStore {
  reduxStore?: ToolkitStore;
  localStore?: CuttingRecordMasterElectronStore;

  constructor(props: IProps) {
    this.reduxStore = props.reduxStore;
    this.localStore = props.localStore;
  }

  /**
   * @description 获取用户信息
   */
  public getUserInfo(): MasterUserType.IUserInfo {
    console.log('[userStoreService] get user info');
    return this.localStore?.get('userInfo') as MasterUserType.IUserInfo;
  }

  /**
   * @description 更新用户信息
   * @param {IUserDataInfo} userInfo 用户信息
   */
  public updateUserInfo(userInfo: MasterUserType.IUserInfo) {
    console.log('[userStoreService] update user info');
    this.reduxStore?.dispatch(userPageSlice?.actions?.updateUserInfo({ ...userPageSlice.getInitialState(), ...userInfo }));
    // 同步更新本地json
    this.localStore?.set({
      userInfo: { ...initialUserState, ...userInfo },
    });
  }

  /**
   * @description 重写用户信息
   */
  public overrideUserInfo() {
    console.log('[userStoreService] override user info');
    this.reduxStore?.dispatch(userPageSlice?.actions?.updateUserInfo(initialUserState));
    // 同步更新本地json
    this.localStore?.set({
      userInfo: initialUserState,
    });
  }
}

export default UserStore;
