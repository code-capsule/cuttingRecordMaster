import React, { lazy, Suspense } from 'react';
import '@common/styles/base.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { LOGIN_PROCESS_KEY } from '@common/constants/processKey';
import setupRender, { SetupRenderOptions } from '@render/setup';
import FullScreenLoading from '@common/components/FullScreenLoading';

const Main = lazy(() => import('./containers'));

const setupOptions: SetupRenderOptions = {
  processKey: LOGIN_PROCESS_KEY,
};

setupRender(setupOptions).then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={window.master.stores.reduxStore}>
        <Suspense fallback={<FullScreenLoading />}>
          <Main />
        </Suspense>
      </Provider>
    </React.StrictMode>
  );
});
