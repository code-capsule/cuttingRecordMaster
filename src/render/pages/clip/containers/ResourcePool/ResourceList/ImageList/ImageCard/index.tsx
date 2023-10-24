import React from 'react';
import './index.less';
import { ReactComponent as IcCommonAddSvg } from '@common/svgs/ic_common_add.svg';

interface IProps {
  /**
   * @description 图片资源
   */
  resource: MasterResourceType.IImageResource;
}

const TextCard = (props: IProps) => {
  return (
    <div
      className="resource-image-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <IcCommonAddSvg className="resource-image-card-add-svg" />
      <img src={props?.resource?.cover} className="resource-image-card-cover" />
    </div>
  );
};

export default TextCard;
