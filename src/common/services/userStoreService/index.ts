import UserStore from './instance';

class UserStoreService {
  _instance: UserStore = new UserStore();

  async initialize() {
    return this._instance;
  }
}

export default new UserStoreService();
