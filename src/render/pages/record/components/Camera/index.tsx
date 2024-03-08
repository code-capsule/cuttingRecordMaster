import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SystemTool from '@common/tools/systemTool';
import './index.less';

const Camera = () => {
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const cameraDeviceId = useSelector((state: MasterAppStoreType.AppState) => state.recordPage.cameraDeviceId);

  useEffect(() => {
    if (cameraDeviceId && cameraVideoRef.current) {
      SystemTool.getVideoStream(cameraDeviceId)
        .then((stream) => {
          console.log('get video stream success', cameraDeviceId);
          cameraVideoRef.current!.srcObject = stream;
        });
    }
  }, [cameraDeviceId, cameraVideoRef.current]);

  return (
    <div className="camera">
      <video className="camera-video" autoPlay playsInline ref={cameraVideoRef} />
    </div>
  );
};

export default Camera;