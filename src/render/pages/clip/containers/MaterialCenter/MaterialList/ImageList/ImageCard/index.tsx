import React from 'react';
import './index.less';
import { ReactComponent as IcCommonAddSvg } from '@common/svgs/ic_common_add.svg';

interface IProps {
  /**
   * @description 图片资源
   */
  material: MasterResourceType.IImageResource;
}

const TextCard = (props: IProps) => {
  return (
    <div
      className="material-image-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <IcCommonAddSvg className="material-image-card-add-svg" />
      <img src={props?.material?.cover} className="material-image-card-cover" />
    </div>
  );
};

export default TextCard;
