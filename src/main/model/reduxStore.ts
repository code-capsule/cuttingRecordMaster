import { configureStore } from '@reduxjs/toolkit'
import initialReducers from '@common/stores/reduxStore/reducers'
import { replayActionMain, forwardToRenderer } from 'electron-redux'
import { AppState } from '@common/stores/reduxStore/typings'

const initialState: AppState = {
  recordPage: {
    count: 3,
  },
}

const store = configureStore({
  reducer: initialReducers(),
  preloadedState: initialState,
  middleware: [forwardToRenderer],
})

export function initReduxStore() {
  replayActionMain(store)
}
initReduxStore()
export default store
