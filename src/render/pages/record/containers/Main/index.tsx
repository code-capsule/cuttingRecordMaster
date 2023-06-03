import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';
import { AppState } from '@common/stores/reduxStore/typings';
import { recordPageActions } from '@common/stores/reduxStore/actions';

function Main() {
  const count = useSelector((state: AppState) => state.recordPage.count);
  return (
    <div className="record-main">
      <h1>Record</h1>
      <div className="card">
        <button
          aria-label="Increment value"
          onClick={() => recordPageActions.increment()}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => recordPageActions.decrement()}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default Main;
