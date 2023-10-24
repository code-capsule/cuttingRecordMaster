import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';
import { EResourceType } from '@src/typings/resource/enum';
import VideoList from './VideoList';
import ImageList from './ImageList';
import TextList from './TextList';
import MATERIAL_CONSTANTS from '@src/assets/material';

const ResourceList = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);
  const material = useSelector((store: MasterAppStoreType.AppState) => store?.projectPage?.material || {}, shallowEqual);

  return (
    <React.Fragment>
      {resourceContextReducer?.sidebarType === EResourceType.video && <VideoList data={material?.video || []} />}
      {resourceContextReducer?.sidebarType === EResourceType.image && <ImageList data={MATERIAL_CONSTANTS?.image || []} />}
      {resourceContextReducer?.sidebarType === EResourceType.text && <TextList data={MATERIAL_CONSTANTS?.text || []} />}
    </React.Fragment>
  );
};

export default ResourceList;
