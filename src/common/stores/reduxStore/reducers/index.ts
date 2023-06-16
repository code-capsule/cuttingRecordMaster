import { recordPageSlice, recordPage } from './recordPage';

export const initialState: MasterAppStoreType.AppState = {
  recordPage,
};

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
  };
}
