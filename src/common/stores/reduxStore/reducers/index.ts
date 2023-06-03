import { recordPageSlice } from './recordPage';

export default function initialReducers() {
  return {
    recordPage: recordPageSlice.reducer,
  };
}
