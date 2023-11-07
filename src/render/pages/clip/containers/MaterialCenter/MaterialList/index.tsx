import React, { useState, useContext } from 'react';
import './index.less';
import { createPortal } from 'react-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { EResourceType } from '@src/typings/resource/enum';
import { ReactComponent as IcCommonVideoSvg } from '@common/svgs/ic_common_video.svg';
import { MaterialCenterContext, MaterialContextProps } from '@render/pages/clip/containers/MaterialCenter';
import VideoList from './VideoList';
import ImageList from './ImageList';
import TextList from './TextList';
import MATERIAL_CONSTANTS from '@src/assets/material';
import FullScreenLoading from '@src/common/components/FullScreenLoading';

const MaterialList = () => {
  const materialContextReducer = useContext<MaterialContextProps>(MaterialCenterContext);
  const videoMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <React.Fragment>
      {materialContextReducer?.sidebarType === EResourceType.video && (
        <React.Fragment>
          {videoMaterial?.length > 0 && (
            <VideoList
              data={videoMaterial || []}
              onRetryMaterial={(material?: MasterResourceType.IVideoResource) => {}}
              onInsertMaterial={(material?: MasterResourceType.IVideoResource) => {}}
              onDeleteMaterial={(material?: MasterResourceType.IVideoResource) => {}}
            />
          )}
          {videoMaterial?.length === 0 && (
            <div className="empty-material-container">
              <div className="empty-material-button">
                <IcCommonVideoSvg className="empty-material-svg" />
                录制素材
              </div>
            </div>
          )}
        </React.Fragment>
      )}
      {materialContextReducer?.sidebarType === EResourceType.image && (
        <ImageList data={MATERIAL_CONSTANTS?.image || []} onInsertMaterial={(material?: MasterResourceType.IImageResource) => {}} />
      )}
      {materialContextReducer?.sidebarType === EResourceType.text && (
        <TextList data={MATERIAL_CONSTANTS?.text || []} onInsertMaterial={(material?: MasterResourceType.ITextResource) => {}} />
      )}
      {isLoading && createPortal(<FullScreenLoading mask={true} />, document.body)}
    </React.Fragment>
  );
};

export default MaterialList;
