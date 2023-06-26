import UserStore from './instance';
import CuttingRecordMasterElectronStore from '@common/stores/localStore';

class UserStoreService {
  _instance?: UserStore;

  async initialize() {
    const userLocalStore = new CuttingRecordMasterElectronStore({
      name: 'userInfo',
    });
    const { reduxStore } = global.master.stores.reduxStore;
    this._instance = new UserStore({
      reduxStore: reduxStore,
      localStore: userLocalStore,
    });
    return this._instance;
  }
}

export default new UserStoreService();
