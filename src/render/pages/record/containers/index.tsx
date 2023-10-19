import React from 'react';
import RecordUnStart from './RecordUnStart';
import Recording from './Recording';
import { useSelector } from 'react-redux';
import './index.less';

const Main = () => {
  const recordStatus = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.recordStatus);

  const renderRecordPage = () => {
    switch (recordStatus) {
      case 'unStart':
        return <RecordUnStart />;
      case 'recording':
        return <Recording />;
      default:
        return <RecordUnStart />;
    }
  };
  return (
    <div className="record-page">
      {renderRecordPage()}
    </div>
  );
};

export default Main;
