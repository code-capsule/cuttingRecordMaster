import UserStore from './instance';

class UserLocalStore {
  _instance: UserStore = new UserStore();

  async initialize() {
    return this._instance;
  }
}

export default new UserLocalStore();
