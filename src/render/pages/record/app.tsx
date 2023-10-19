import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RECORD_PROCESS_KEY } from '@common/constants/processKey';
import setupRender, { SetupRenderOptions } from '@render/setup';
import { Provider } from 'react-redux';
import '@common/styles/base.css';

<<<<<<< HEAD
const Main = lazy(() => import('./containers'));
=======
const Main = lazy(() => import('./containers/Main'));
>>>>>>> bc8c11e093c19293cb8f6f407c8f8b5ed1cfc0b5

const setupOptions: SetupRenderOptions = {
  processKey: RECORD_PROCESS_KEY,
};

setupRender(setupOptions).then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={window.master.stores.reduxStore}>
        <Suspense fallback={<div>Loading...</div>}>
          <Main />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
});
