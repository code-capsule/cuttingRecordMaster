import UserStore from './instance';
import CuttingRecordMasterElectronStore from '@common/stores/localStore';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

interface InitializeProps {
  reduxStore: ToolkitStore
}

class userStoreService {
  _instance?: UserStore;

  async initialize(props: InitializeProps) {
    const UserLocalStore = new CuttingRecordMasterElectronStore({
      name: 'userInfo',
    });

    this._instance = new UserStore({
      reduxStore: props.reduxStore,
      localStore: UserLocalStore,
    });
    return this._instance;
  }
}

export default new userStoreService();
