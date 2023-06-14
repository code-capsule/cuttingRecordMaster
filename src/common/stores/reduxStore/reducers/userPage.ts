import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const userPage: MasterUserType.IUserInfo = {
  uid: 'CuttingRecordMaster',
  token: 'crazy_thursday_v50_ok',
  phone: '189****8869',
  username: '广州第一深情',
  photoUrl: ''
};

export const userPageSlice = createSlice({
  name: 'userPage',
  initialState: userPage,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<MasterUserType.IUserInfo>) => {
      // state = {
      //   ...action.payload
      // };
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.phone = action.payload.phone;
      state.username = action.payload.username;
      state.photoUrl = action.payload.photoUrl;
    },
  },
});
