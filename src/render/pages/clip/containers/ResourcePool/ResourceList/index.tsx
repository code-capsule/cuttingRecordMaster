import React, { useContext } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';
import { EResourceType } from '@src/typings/resource/enum';
import VideoList from './VideoList';
import ImageList from './ImageList';
import TextList from './TextList';
import MATERIAL_CONSTANTS from '@src/assets/material';
import { ReactComponent as IcCommonVideoSvg } from '@common/svgs/ic_common_video.svg';

const ResourceList = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);
  const videoMaterial = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material?.video || [], shallowEqual);

  return (
    <React.Fragment>
      {resourceContextReducer?.sidebarType === EResourceType.video && (
        <React.Fragment>
          {videoMaterial?.length > 0 && <VideoList data={videoMaterial || []} />}
          {videoMaterial?.length === 0 && (
            <div className="empty-resource-container">
              <div className="empty-resource-button">
                <IcCommonVideoSvg className="empty-resource-svg" />
                录制素材
              </div>
            </div>
          )}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.image && <ImageList data={MATERIAL_CONSTANTS?.image || []} />}
      {resourceContextReducer?.sidebarType === EResourceType.text && <TextList data={MATERIAL_CONSTANTS?.text || []} />}
    </React.Fragment>
  );
};

export default ResourceList;
