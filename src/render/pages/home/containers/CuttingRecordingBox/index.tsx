import React, { useState } from 'react';
import './index.less';
import { createPortal } from 'react-dom';
import Message from '@src/common/components/Message';
import MaskLoading from '@src/common/components/MaskLoading';
import { formatDate } from '@src/common/utils/time';
import { PROJECT_STORE_IPC_KEY } from '@src/common/constants/ipcEventKey';
import { CLIP_PROCESS_KEY, HOME_PROCESS_KEY, RECORD_PROCESS_KEY } from '@src/common/constants/processKey';

const CuttingRecordingBox = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreateProjectAndOpenWindow = async (openWindowFunction: () => void) => {
    setIsLoading(true);
    try {
      // 1.初始化一份新的工程数据
      const isInitSuccess = await window.master.services?.ipc?.request(PROJECT_STORE_IPC_KEY.INIT_PROJECT_STORE, 'infinite', {
        projectName:
          '未命名工程' +
          formatDate(new Date(), '', {
            showHours: false,
            showMinutes: false,
            showSeconds: false,
          }),
      } as MasterProjectType.ICreateProjectStoreParams);
      if (isInitSuccess) {
        // 2.获取窗口实例，打开录制/剪辑窗口
        openWindowFunction?.();
        const homeWindowInstance = window.master?.services?.windowService?.get(HOME_PROCESS_KEY)?._instance;
        homeWindowInstance.hide();
      } else {
        Message.error('新建作品失败，请重试');
      }
    } catch (err) {
      // 3.显示提示创建失败
      Message.error('新建作品失败，请重试');
    } finally {
      // 4.关闭loading
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="home-cutting-record-box">
        <div
          className="home-box home-recording"
          onClick={() => {
            onCreateProjectAndOpenWindow(() => {
              window.master?.services?.windowService?.create(RECORD_PROCESS_KEY);
            });
          }}
        >
          <div className="label">Record</div>
        </div>
        <div
          className="home-box home-cutting"
          onClick={() => {
            onCreateProjectAndOpenWindow(() => {
              window.master?.services?.windowService?.create(CLIP_PROCESS_KEY);
            });
          }}
        >
          <div className="label">Clip</div>
        </div>
      </div>
      {isLoading && createPortal(<MaskLoading />, document.body)}
    </>
  );
};

export default CuttingRecordingBox;
