import React from 'react';
import './index.less';
const logger = window.master.tools.log.scope('home');

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
