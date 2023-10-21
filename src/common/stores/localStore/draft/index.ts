import DraftStore from './instance';

class DraftStoreService {
  _instance: DraftStore = new DraftStore();

  async initialize() {
    return this._instance;
  }
}

export default new DraftStoreService();
