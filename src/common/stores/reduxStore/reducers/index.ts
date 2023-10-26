import { recordPageSlice, initialRecordPageState } from './recordPage';
import { userPageSlice, initialUserState } from './userPage';
import { projectPageSlice, initialProjectState } from './projectPage';
import { draftPageSlice, initialDraftState } from './draftPage';
import { trackPageSlice, initialTrackState } from './trackPage';

export const initialState: MasterAppStoreType.AppState = {
  recordPage: initialRecordPageState,
  userPage: initialUserState,
  projectPage: initialProjectState,
  draftPage: initialDraftState,
  trackPage: initialTrackState,
};

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
    userPage: userPageSlice.reducer,
    projectPage: projectPageSlice.reducer,
    draftPage: draftPageSlice.reducer,
    trackPage: trackPageSlice.reducer,
  };
}
