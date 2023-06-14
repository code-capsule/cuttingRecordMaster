import BaseService from '../BaseService';
import UserStore from './instance';
import CuttingRecordMasterElectronStore from '@common/stores/localStore';

class userStoreService extends BaseService {
  _instance?: UserStore;

  async install() {
    const UserLocalStore = new CuttingRecordMasterElectronStore({
      name: 'userInfo',
    });

    const { reduxStore } = global.master.stores;
    this._instance = new UserStore({
      reduxStore,
      localStore: UserLocalStore,
    });
    return this._instance;
  }
}

export default new userStoreService();
