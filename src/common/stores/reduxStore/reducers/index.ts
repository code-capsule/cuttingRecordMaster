import { recordPageSlice, recordPage } from './recordPage';
import { userPageSlice, initialUserState } from './userPage';

export const initialState: MasterAppStoreType.AppState = {
  recordPage,
  userPage: initialUserState
};

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
    userPage: userPageSlice.reducer
  };
}
