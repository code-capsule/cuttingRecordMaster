import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './containers/Main';
import master from '@render/model';
import { Provider } from 'react-redux';
import { attachIpc } from '@render/model/ipc';
import './index.less';

attachIpc('record');
function App() {
  return (
    <Provider store={master.store.reduxStore}>
      <Main />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
