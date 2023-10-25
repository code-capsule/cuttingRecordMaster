import DraftStore from './instance';

class DraftLocalStore {
  _instance: DraftStore = new DraftStore();

  async initialize() {
    return this._instance;
  }
}

export default new DraftLocalStore();
