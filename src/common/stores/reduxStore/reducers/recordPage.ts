import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const recordPage: MasterRecordType.IRecordPageInfo = {
  sharedNumber: 0,
  privateNumber: 0,
};

export const recordPageSlice = createSlice({
  name: 'recordPage',
  initialState: recordPage,
  reducers: {
    incrementSharedNumber: (state) => {
      state.sharedNumber += 1;
    },
    incrementPrivateNumber: (state) => {
      state.privateNumber += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.sharedNumber += action.payload;
    },
  },
});
