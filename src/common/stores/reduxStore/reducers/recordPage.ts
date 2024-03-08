import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialRecordPageState: MasterRecordType.IRecordPageInfo = {
  recordStatus: 'unStart',
  recordingMode: 'camOnly',
  recordingAudioMode: 'micAndSystem',
  cameraDeviceId: '',
};

export const recordPageSlice = createSlice({
  name: 'recordPage',
  initialState: initialRecordPageState,
  reducers: {
    updateRecordStatus: (state, action: PayloadAction<MasterRecordType.TRecordStatus>) => {
      return {
        ...state,
        recordStatus: action.payload,
      };
    },
    updateRecordingMode: (state, action: PayloadAction<MasterRecordType.TRecordingMode>) => {
      return {
        ...state,
        recordingMode: action.payload,
      };
    },
    updateRecordingAudioMode: (state, action: PayloadAction<MasterRecordType.TRecordingAudioMode>) => {
      return {
        ...state,
        recordingAudioMode: action.payload,
      };
    },
    updateCameraDeviceId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        cameraDeviceId: action.payload,
      };
    },
  },
});
