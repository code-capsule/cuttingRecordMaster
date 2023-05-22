import initReduxStore, { AppState } from './reduxStore'
import { Store } from 'redux'
const remote = require('@electron/remote')

interface Master {
  store: {
    reduxStore: Store
  }
}

export function initMaster(): Master {
  const Master = remote.getGlobal('master')

  const state: AppState = Master.store.reduxStore.getState()

  const reduxStore = initReduxStore(state)

  const master: Master = {
    store: {
      reduxStore,
    },
  }

  return master
}

export default initMaster()
