import React, { useContext } from 'react';
import './index.less';
import { ResourcePoolContext, ResourceContextProps } from '@render/pages/clip/containers/ResourcePool';
import { ReactComponent as IcCommonVideoSvg } from '@common/svgs/ic_common_video.svg';
import { ReactComponent as IcCommonImageSvg } from '@common/svgs/ic_common_image.svg';
import { ReactComponent as IcCommonTextSvg } from '@common/svgs/ic_common_text.svg';
import { EResourceType } from '@src/typings/resource/enum';

const ResourceSidebar = () => {
  const resourceContextReducer = useContext<ResourceContextProps>(ResourcePoolContext);

  return (
    <div className="clip-resource-sidebar">
      <div
        className={`clip-resource-item ${resourceContextReducer.sidebarType === EResourceType.video ? 'active' : ''}`}
        onClick={() => resourceContextReducer?.updateSidebarType?.(EResourceType.video)}
      >
        <IcCommonVideoSvg className="resource-svg" />
      </div>
      <div
        className={`clip-resource-item ${resourceContextReducer.sidebarType === EResourceType.text ? 'active' : ''}`}
        onClick={() => resourceContextReducer?.updateSidebarType?.(EResourceType.text)}
      >
        <IcCommonTextSvg className="resource-svg" />
      </div>
      <div
        className={`clip-resource-item ${resourceContextReducer.sidebarType === EResourceType.image ? 'active' : ''}`}
        onClick={() => resourceContextReducer?.updateSidebarType?.(EResourceType.image)}
      >
        <IcCommonImageSvg className="resource-svg" />
      </div>
    </div>
  );
};

export default ResourceSidebar;
