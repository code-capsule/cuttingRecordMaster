import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import {
  forwardToRenderer,
  replayActionMain,
  replayActionRenderer,
  forwardToMainWithParams,
} from 'electron-redux';
import initialReducers, { initialState } from './reducers';

export default function initReduxStore(
  preloadedState: MasterAppStoreType.AppState = initialState,
  scope = 'main'
) {
  let middleware: Middleware[] = [];
  let replayAction = replayActionMain;

  if (scope === 'render') {
    const forwardBlackList: string[] = ['incrementPrivateNumber'];
    middleware = [
      forwardToMainWithParams({
        blacklist: forwardBlackList.map((item) => new RegExp(item)),
      }),
    ];
    replayAction = replayActionRenderer;
  } else {
    middleware = [forwardToRenderer];
  }

  const store = configureStore({
    reducer: initialReducers(),
    preloadedState,
    middleware,
  });

  replayAction(store);
  return store;
}
