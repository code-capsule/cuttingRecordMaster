import React, { useContext } from 'react';
import './index.less';
import { EResourceType } from '@src/typings/resource/enum';
import { MaterialCenterContext, MaterialContextProps } from '@render/pages/clip/containers/MaterialCenter';
import { ReactComponent as IcCommonVideoSvg } from '@common/svgs/ic_common_video.svg';
import { ReactComponent as IcCommonImageSvg } from '@common/svgs/ic_common_image.svg';
import { ReactComponent as IcCommonTextSvg } from '@common/svgs/ic_common_text.svg';

const Sidebar = () => {
  const materialContextReducer = useContext<MaterialContextProps>(MaterialCenterContext);

  return (
    <div className="clip-material-sidebar">
      <div
        className={`clip-material-item ${materialContextReducer.sidebarType === EResourceType.video ? 'active' : ''}`}
        onClick={() => materialContextReducer?.updateSidebarType?.(EResourceType.video)}
      >
        <IcCommonVideoSvg className="material-svg" />
      </div>
      <div
        className={`clip-material-item ${materialContextReducer.sidebarType === EResourceType.text ? 'active' : ''}`}
        onClick={() => materialContextReducer?.updateSidebarType?.(EResourceType.text)}
      >
        <IcCommonTextSvg className="material-svg" />
      </div>
      <div
        className={`clip-material-item ${materialContextReducer.sidebarType === EResourceType.image ? 'active' : ''}`}
        onClick={() => materialContextReducer?.updateSidebarType?.(EResourceType.image)}
      >
        <IcCommonImageSvg className="material-svg" />
      </div>
    </div>
  );
};

export default Sidebar;
