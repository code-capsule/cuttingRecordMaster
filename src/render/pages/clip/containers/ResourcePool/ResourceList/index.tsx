import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';
import { EResourceFromType, EResourceType } from '@src/typings/resource/enum';
import VideoList from './VideoList';
import AudioList from './AudioList';
import ImageList from './ImageList';
import TextList from './TextList';
import CLOUD_RESOURCE_CONSTANTS from '@src/assets/cloudResource';

const ResourceList = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);
  const resourcePool = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.resource?.pool || {}, shallowEqual);

  return (
    <React.Fragment>
      {resourceContextReducer?.sidebarType === EResourceType.video && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <VideoList data={resourcePool?.video || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <VideoList data={CLOUD_RESOURCE_CONSTANTS?.video || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.audio && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <AudioList data={resourcePool?.audio || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <AudioList data={CLOUD_RESOURCE_CONSTANTS?.audio || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.image && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <ImageList data={resourcePool?.image || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <ImageList data={CLOUD_RESOURCE_CONSTANTS?.image || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.text && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <TextList data={resourcePool?.text || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <TextList data={CLOUD_RESOURCE_CONSTANTS?.text || []} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ResourceList;
