import ReduxStore from './reduxStore'
import { Store } from 'redux'

interface Master {
  store: {
    reduxStore: Store
  }
}

export function initMaster(): Master {
  const reduxStore = ReduxStore

  const master: Master = {
    store: {
      reduxStore,
    },
  }

  return master
}

export default initMaster()
