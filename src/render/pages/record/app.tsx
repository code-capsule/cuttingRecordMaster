import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './containers/Main'
import master from '@render/model'
import { Provider } from 'react-redux'
import './index.less'

function App() {
  return (
    <Provider store={master.store.reduxStore}>
      <Main />
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
