import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { recordPageActions } from '@common/stores/reduxStore/actions';

function Main() {
  const sharedNumber = useSelector(
    (state: MasterAppStoreType.AppState) => state.recordPage?.sharedNumber
  );
  const privateNumber = useSelector(
    (state: MasterAppStoreType.AppState) => state.recordPage?.privateNumber
  );
  return (
    <div className="record-main">
      <h1>Record</h1>
      <div className="card">
        <button onClick={() => recordPageActions.incrementSharedNumber()}>
          累加共享数字：
        </button>
        <span>{sharedNumber}</span>
        <br></br>
        <button onClick={() => recordPageActions.incrementPrivateNumber()}>
          累加私有数字：
        </button>
        <span>{privateNumber}</span>
      </div>
    </div>
  );
}

export default Main;
