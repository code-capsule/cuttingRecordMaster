import React from 'react';
import './index.less';
import { ReactComponent as IcCommonAddSvg } from '@common/svgs/ic_common_add.svg';

interface IProps {
  /**
   * @description 文字资源
   */
  resource: MasterResourceType.ITextResource;
  /**
   * @description 预览卡片
   */
  onPreviewResource?: (resource?: MasterResourceType.ITextResource) => void;
  /**
   * @description 添加资源到轨道区
   */
  onInsertResourceToVideoTrackCell?: (resource?: MasterResourceType.ITextResource) => void;
}

const TextCard = (props: IProps) => {
  return (
    <div
      className="resource-text-card-item"
      onClick={(e) => {
        e?.stopPropagation();
        e?.nativeEvent?.stopImmediatePropagation();
      }}
    >
      <IcCommonAddSvg className="resource-text-card-add-svg" />
      <div
        className="resource-text-card-content"
        style={{
          color: props?.resource?.data?.fontColor,
          fontSize: props?.resource?.data?.fontSize,
          lineHeight: `${props?.resource?.data?.fontSize ? props?.resource?.data?.fontSize + 8 : 16}px`,
        }}
      >
        {props?.resource?.data?.content}
      </div>
    </div>
  );
};

export default TextCard;
