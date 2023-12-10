import React, { useRef, useEffect, useMemo } from 'react';
import './index.less';
import WaveSurfer from 'wavesurfer.js';
import ClipCoreManager from '@render/pages/clip/core';
import { useSelector, shallowEqual } from 'react-redux';

const AudioTrack = () => {
  const unitPX = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitPX) || 0;
  const unitTime = useSelector((store: MasterAppStoreType.AppState) => store?.trackPage?.unitTime) || 0;
  const videoMaterials = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);

  const wavesurfer = useRef<WaveSurfer>();
  useEffect(() => {
    if (!wavesurfer?.current) {
      wavesurfer.current = WaveSurfer.create({
        container: '#clip-track-audio',
        waveColor: 'rgba(255, 255, 255, 0.2)',
        progressColor: 'rgba(255, 255, 255, 0.2)',
        height: 20,
        interact: false,
        hideScrollbar: true,
      });
    }
  }, []);

  useEffect(() => {
    if (wavesurfer?.current && videoMaterials?.[0]?.data?.soundWavUrl) {
      wavesurfer?.current?.load(videoMaterials?.[0]?.data?.soundWavUrl);
    }
  }, [wavesurfer?.current, videoMaterials?.[0]?.data?.soundWavUrl]);

  const soundAudioPCMWidth = useMemo(() => {
    return ((videoMaterials?.[0]?.duration || 0) * unitPX) / unitTime < 0 ? 0 : ((videoMaterials?.[0]?.duration || 0) * unitPX) / unitTime;
  }, [videoMaterials?.[0], unitPX, unitTime]);

  return <div className="clip-track-audio" id="clip-track-audio" style={{ width: `${soundAudioPCMWidth}px` }} />;
};

export default AudioTrack;
