import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialProjectState: MasterProjectType.IProjectDataInfo = {
  id: '',
  projectName: '',
  introduce: '',
  cover: '',
  duration: 0,
  appVersion: '',
  projectVersion: 0,
  createTime: 0,
  updateTime: 0,
  uploadStatus: 'unpublish',
  projectHash: undefined,
  isDelete: false,
  clip: {},
  record: {},
  resource: {},
};

export const projectPageSlice = createSlice({
  name: 'projectPage',
  initialState: initialProjectState,
  reducers: {
    updateProjectInfo: (state, action: PayloadAction<MasterProjectType.IProjectDataInfo>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
