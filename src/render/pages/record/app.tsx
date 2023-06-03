import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import setupRender, { SetupRenderOptions } from '@render/setup';
import { Provider } from 'react-redux';
import './index.less';

const Main = lazy(() => import('./containers/Main'));

const setupOptions: SetupRenderOptions = {
  processKey: 'record',
};

setupRender(setupOptions).then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={window.master.store.reduxStore}>
        <Suspense fallback={<div>Loading...</div>}>
          <Main />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
});
