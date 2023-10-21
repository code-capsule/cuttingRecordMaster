import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RECORD_PROCESS_KEY } from '@common/constants/processKey';
import setupRender, { SetupRenderOptions } from '@render/setup';
import './index.less';

const Main = lazy(() => import('./containers/Main'));

const setupOptions: SetupRenderOptions = {
  processKey: RECORD_PROCESS_KEY,
};

setupRender(setupOptions).then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    </React.StrictMode>
  );
});
