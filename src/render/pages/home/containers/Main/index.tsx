import React from 'react';
import './index.less';
import { getLogger } from '@common/tools/log';
const logger = getLogger('home');
import { useSelector } from 'react-redux';
import { recordPageActions } from '@common/stores/reduxStore/actions';
const remote = require('@electron/remote');

interface MetadataInfo { videoInfo: any, audioInfo: any, inputPath: string}
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

  const [metadataInfoArray, setMetadataInfoArray] = React.useState<MetadataInfo[]>([]);

  const handleSelectVideo = async () => {
    const result = await remote.dialog.showOpenDialog( {
      title: '选择视频',
      filters: [{ name: 'Videos', extensions: ['mp4'] }],
      properties: ['openFile', 'multiSelections'],
    });
    const tasks =  result?.filePaths?.map(async (inputPath: string) => {
      return window.master.tools.ffmpegTool.getMetaInfo(inputPath);
    });
    const rsp = (await Promise.all(tasks)).map((metadata, idx) => {
      return {
        ...metadata,
        inputPath: result?.filePaths?.[idx]
      };
    });
    setMetadataInfoArray(rsp);
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
      <div className="card">
        <p className="ffmpeg">验证 FFmpegTool 模块</p>
        <div className='select-file' onClick={() => handleSelectVideo()}>选择文件</div>
        <ul>
          {metadataInfoArray?.map((metadataInfo, index: number) =>{ 
            return (
              <li key={index}>
                <div className='path'>【URL】{metadataInfo?.inputPath}</div>
                <div className='desc'>
                  <div className="tag blue">[时长] {metadataInfo.videoInfo.duration}</div>
                  <div className="tag cyan">[分辨率] {metadataInfo.videoInfo.width}x{metadataInfo.videoInfo.height}</div>
                  <div className="tag gold">[音频编码] {metadataInfo.audioInfo.codec_name}</div>
                  <div className="tag lime">[视频编码] {metadataInfo.videoInfo.codec_name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Main;
