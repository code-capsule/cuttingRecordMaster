import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialTrackState: MasterTrackType.ITrackInfo = {
  boxWidth: 0,
  trackWidth: 0,
  totalDuration: 0,
  scrollLeft: 0,
  unitPX: 0,
  unitTime: 0,
  anchorTime: 0,
  timeScaleGears: 0,
  timeScaleMinGears: 0,
  timeScaleMaxGears: 0,
};

export const trackPageSlice = createSlice({
  name: 'trackPage',
  initialState: initialTrackState,
  reducers: {
    updateTrackInfo: (state, action: PayloadAction<MasterTrackType.ITrackInfo>) => {
      return {
        ...state,
        ...action?.payload,
      };
    },
  },
});
