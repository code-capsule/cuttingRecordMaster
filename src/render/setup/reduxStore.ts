import { configureStore } from '@reduxjs/toolkit';
import initialReducers from '@common/stores/reduxStore/reducers';
import { AppState } from '@common/stores/reduxStore/typings';
const electronRedux = require('electron-redux');
const replayActionRenderer = electronRedux.replayActionRenderer;
const forwardToMain = electronRedux.forwardToMain;

export default function initReduxStore(preloadedState: AppState) {
  const store = configureStore({
    reducer: initialReducers(),
    preloadedState,
    middleware: [forwardToMain],
  });
  replayActionRenderer(store);
  return store;
}

export type { AppState };
