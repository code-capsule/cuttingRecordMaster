import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';
import { EResourceFromType, EResourceType } from '@src/typings/resource/enum';
import VideoList from './VideoList';
import AudioList from './AudioList';
import ImageList from './ImageList';
import TextList from './TextList';

const ResourceList = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);
  const resourcePool = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.resource?.pool || {}, shallowEqual);
  const resourceCloud = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.resource?.cloud || {}, shallowEqual);

  return (
    <React.Fragment>
      {resourceContextReducer?.sidebarType === EResourceType.video && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <VideoList data={resourcePool?.video || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <VideoList data={resourceCloud?.video || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.audio && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <AudioList data={resourcePool?.audio || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <AudioList data={resourceCloud?.audio || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.image && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <ImageList data={resourcePool?.image || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <ImageList data={resourceCloud?.image || []} />}
        </React.Fragment>
      )}
      {resourceContextReducer?.sidebarType === EResourceType.text && (
        <React.Fragment>
          {resourceContextReducer?.tabType === EResourceFromType.local && <TextList data={resourcePool?.text || []} />}
          {resourceContextReducer?.tabType === EResourceFromType.cloud && <TextList data={resourceCloud?.text || []} />}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ResourceList;
