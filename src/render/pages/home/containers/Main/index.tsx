import React from 'react';
import './index.less';
import { getLogger } from '@common/tools/log';
const logger = getLogger('home');

function Main() {
  const handleOpenRecordWindow = () => {
    logger.info('open record window');
    window.master.services.ipc.send('open.record.window');
  };
  return (
    <div className="home-main">
      <h1>Home</h1>
      <div className="card">
        <button
          aria-label="Decrement value"
          onClick={() => handleOpenRecordWindow()}
        >
          打开录制窗口
        </button>
      </div>
    </div>
  );
}

export default Main;
