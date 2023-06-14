import CuttingRecordMasterElectronStore from '@common/stores/localStore';
import { userPage as initialUserState } from '@common/stores/reduxStore/reducers/userPage';
import { userPageActions } from '@common/stores/reduxStore/actions';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

interface IProps {
  reduxStore: ToolkitStore;
  localStore?: CuttingRecordMasterElectronStore;
}

class UserStore {
  reduxStore?: ToolkitStore;
  localStore?: CuttingRecordMasterElectronStore;

  constructor(props: IProps) {
    console.log('props', props.reduxStore);
    this.reduxStore = props.reduxStore;
    this.localStore = props.localStore;
  }
  
  /**
   * @description 获取用户信息
   */
  public getUserInfo(): MasterUserType.IUserInfo {
    return this.localStore?.get('userInfo') as MasterUserType.IUserInfo;
  }

    /**
   * @description 设置用户信息
   * @param {IUserDataInfo} userInfo 用户信息
   * @param {boolean} isOverride 是否覆盖
   */
  // public setUserInfo(userInfo: MasterUserType.IUserInfo, isOverride = true) {
  //   const info: MasterUserType.IUserInfo = isOverride ? { ...Object.assign(initialUserState, userInfo) } : { ...userInfo };
  //   userPageActions.updateUserInfo(info);
  //   // 更新localStore
  //   this.localStore?.set({
  //     userInfo: info,
  //   });
  // }
}

export default UserStore;






