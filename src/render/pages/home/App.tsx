import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
import setupRender, { SetupRenderOptions } from '@render/setup';
import { Provider } from 'react-redux';
import './index.less';

const Main = lazy(() => import('./containers/Main'));

const setupOptions: SetupRenderOptions = {
  processKey: HOME_PROCESS_KEY,
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
