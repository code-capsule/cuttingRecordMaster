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
      uid: 'track.video.001',
      type: 'video',
      cells: [],
    },
    textTrack: {
      uid: 'track.text.001',
      type: 'text',
      cells: [],
    },
    imageTrack: {
      uid: 'track.image.001',
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
    updateProjectVideoTrack: (state, action: PayloadAction<MasterTrackCell.IVideoTrackCell[]>) => {
      return {
        ...state,
        ...action.payload,
        track: {
          ...state.track,
          videoTrack: {
            ...state.track?.videoTrack,
            type: 'video',
            cells: action?.payload,
          },
        },
      };
    },
  },
});
