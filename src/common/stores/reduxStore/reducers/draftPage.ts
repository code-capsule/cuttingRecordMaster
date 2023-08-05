import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialDraftState: MasterDraftType.IDraftDataInfo = {
  draftList: []
};

export const draftPageSlice = createSlice({
  name: 'draftPage',
  initialState: initialDraftState,
  reducers: {
    updateDraftList: (state, action: PayloadAction<MasterDraftType.IDraftItem[]>) => {
      return {
        ...state,
        draftList: [...action.payload]
      };
    },
  },
});
