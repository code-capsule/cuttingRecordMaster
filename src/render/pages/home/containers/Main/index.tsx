import React from 'react'
import './index.less'
import { useSelector } from 'react-redux'
import { AppState } from '@common/stores/reduxStore/typings';
import { recordPageActions } from '@common/stores/reduxStore/actions'
const { ipcRenderer } = require('electron');

function Main() {
  const count = useSelector((state: AppState) => state.recordPage.count)

  const handleOpenRecordWindow = () => {
    ipcRenderer.send('open.record.window')
  }
  return (
    <div className="home-main">
      <h1>Home</h1>
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
        <button
          aria-label="Decrement value"
          onClick={() => handleOpenRecordWindow()}
        >
          打开录制窗口
        </button>
      </div>
    </div>
  )
}

export default Main