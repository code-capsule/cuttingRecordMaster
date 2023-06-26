import { recordPageSlice, initialRecordPageState } from './recordPage';

export const initialState: MasterAppStoreType.AppState = {
  recordPage: initialRecordPageState,
};

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
  };
}
