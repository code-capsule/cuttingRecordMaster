import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { CLIP_PROCESS_KEY } from '@common/constants/processKey';
import setupRender, { SetupRenderOptions } from '@render/setup';
import { Provider } from 'react-redux';
import '@common/styles/base.css';

const Main = lazy(() => import('./containers'));

const setupOptions: SetupRenderOptions = {
  processKey: CLIP_PROCESS_KEY,
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
