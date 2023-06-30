import { recordPageSlice, initialRecordPageState } from './recordPage';
import { userPageSlice, initialUserState } from './userPage';
import { projectPageSlice, initialProjectState } from './projectPage';

export const initialState: MasterAppStoreType.AppState = {
  recordPage: initialRecordPageState,
  userPage: initialUserState,
  projectPage: initialProjectState,
};

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
    userPage: userPageSlice.reducer,
    projectPage: projectPageSlice.reducer,
  };
}
