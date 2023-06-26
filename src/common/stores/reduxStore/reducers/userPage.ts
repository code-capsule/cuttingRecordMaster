import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const initialUserState: MasterUserType.IUserInfo = {
  uid: '',
  username: '',
  phone: '',
  password: '',
  token: '',
  photoUrl: '',
};

export const userPageSlice = createSlice({
  name: 'userPage',
  initialState: initialUserState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<MasterUserType.IUserInfo>) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});
