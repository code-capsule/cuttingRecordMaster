import React from 'react';
import './index.less';
import { getLogger } from '@common/tools/log';
const logger = getLogger('home');
import { useSelector } from 'react-redux';
import { recordPageActions } from '@common/stores/reduxStore/actions';

function Main() {
  const sharedNumber = useSelector(
    (state: MasterAppStoreType.AppState) => state.recordPage?.sharedNumber
  );
  const privateNumber = useSelector(
    (state: MasterAppStoreType.AppState) => state.recordPage?.privateNumber
  );
  const handleOpenRecordWindow = () => {
    logger.info('open record window');
    window.master.services.ipc.send('open.record.window');
  };
  return (
    <div className="home-main">
      <h1>Home</h1>
      <div className="card">
        <button onClick={() => handleOpenRecordWindow()}>打开录制窗口</button>
      </div>
      <div className="card">
        <button onClick={() => recordPageActions.incrementSharedNumber()}>
          累加共享数字：
        </button>
        <span>{sharedNumber}</span>
      </div>
      <div className="card">
        <button onClick={() => recordPageActions.incrementPrivateNumber()}>
          累加私有数字：
        </button>
        <span>{privateNumber}</span>
      </div>
    </div>
  );
}

export default Main;
