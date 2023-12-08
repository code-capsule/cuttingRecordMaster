import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialProjectState: MasterProjectType.IProjectDataInfo = {
  id: '',
  projectName: '',
  cover: '',
  duration: 0,
  appVersion: '',
  projectVersion: 0,
  createTime: 0,
  updateTime: 0,
  projectHash: undefined,
  isDelete: false,
  record: {},
  material: {
    video: [],
    text: [],
    image: [],
  },
  track: {
    videoTrack: {
      id: 'track.video.001',
      type: 'video',
      cells: [],
    },
    textTrack: {
      id: 'track.text.001',
      type: 'text',
      cells: [],
    },
    imageTrack: {
      id: 'track.image.001',
      type: 'image',
      cells: [],
    },
  },
};

export const projectPageSlice = createSlice({
  name: 'projectPage',
  initialState: initialProjectState,
  reducers: {
    overrideProjectInfo: (state, action: PayloadAction<MasterProjectType.IProjectDataInfo>) => {
      return {
        ...action.payload,
      };
    },
    updateProjectInfo: (state, action: PayloadAction<MasterProjectType.IProjectDataInfo>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
