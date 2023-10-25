import React from 'react';
import './index.less';
import { getLogger } from '@common/tools/log';
import { ICustomResponseMetaData } from '@common/tools/ffmpegTool/types';
const logger = getLogger('home');
const remote = require('@electron/remote');

function Main() {
  const handleOpenRecordWindow = () => {
    logger.info('open record window');
    window.master.services.ipc.send('open.record.window');
  };

  const [metadataInfoArray, setMetadataInfoArray] = React.useState<ICustomResponseMetaData[]>([]);

  const handleSelectVideo = async () => {
    const result = await remote.dialog.showOpenDialog({
      title: '选择视频',
      filters: [{ name: 'Videos', extensions: ['mp4'] }],
      properties: ['openFile', 'multiSelections'],
    });
    const tasks = result?.filePaths?.map(async (filePath: string) => {
      return window.master.tools.ffmpegTool.getMetaInfo(filePath);
    });
    const rsp = await Promise.all(tasks);
    setMetadataInfoArray(rsp);
  };

  return (
    <div className="home-main">
      <h1>Home</h1>
      <div className="card">
        <button aria-label="Decrement value" onClick={() => handleOpenRecordWindow()}>
          打开录制窗口
        </button>
      </div>
      <div className="card">
        <p className="ffmpeg">验证 FFmpegTool 模块</p>
        <div className="select-file" onClick={() => handleSelectVideo()}>
          选择文件
        </div>
        <ul>
          {metadataInfoArray?.map((metadataInfo, index: number) => {
            return (
              <li key={index}>
                <div className="path">【URL】{metadataInfo?.filePath}</div>
                <div className="desc">
                  <div className="tag blue">[时长] {metadataInfo?.duration}</div>
                  <div className="tag cyan">[分辨率] {metadataInfo?.resolution}</div>
                  <div className="tag gold">[音频编码] {metadataInfo?.audioExpandedInfo?.codec_name}</div>
                  <div className="tag lime">[视频编码] {metadataInfo?.videoExpandedInfo?.codec_name}</div>
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
