import { userPageSlice, userPage } from './userPage';
import { recordPageSlice, recordPage } from './recordPage';

export const initialState: MasterAppStoreType.AppState = {
  userPage,
  recordPage,
};

export default function initialReducers() {
  return {
    userPage: userPageSlice.reducer,
    recordPage: recordPageSlice.reducer,
  };
}
