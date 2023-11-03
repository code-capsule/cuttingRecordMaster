/**
 * @description Y轴滚动
 */
import { isUndefined } from 'lodash';
import React, { useMemo } from 'react';
import { Scrollbars, positionValues } from 'react-custom-scrollbars-2';

interface IProps {
  domRef?: any;
  /**
   * @description 最大高度，超出则Y轴滚动
   */
  maxHeight?: number;
  /**
   * @description 最大宽度，超出则X轴滚动
   */
  maxWidth?: number;
  /**
   * @description X轴样式
   */
  x?: {
    show?: boolean;
    /**
     * @description 宽度
     */
    height?: number;
    /**
     * @description 间距
     */
    gap?: number;
    /**
     * @description 圆角
     */
    radius?: number;
    /**
     * @description 滚动轨道背景色
     */
    trackBackgroundColor?: string;
    /**
     * @description 滑块背景色
     */
    thumbBackgroundColor?: string;
  };
  /**
   * @description Y轴样式
   */
  y?: {
    show?: boolean;
    /**
     * @description 宽度
     */
    width?: number;
    /**
     * @description 间距
     */
    gap?: number;
    /**
     * @description 圆角
     */
    radius?: number;
    /**
     * @description 滚动轨道背景色
     */
    trackBackgroundColor?: string;
    /**
     * @description 滑块背景色
     */
    thumbBackgroundColor?: string;
  };
  children?: any;
  onScrollStop?: () => void;
  onScrollStart?: () => void;
  onScroll?: React.UIEventHandler<any>;
  onUpdate?: (values: positionValues) => void;
}

const Scrollbar = (props?: IProps) => {
  const scrollBarStyles = useMemo(() => {
    const styles: React.CSSProperties = { height: 300, width: '100%' };
    if (props?.maxHeight) styles.height = props?.maxHeight;
    if (props?.maxWidth) styles.width = props?.maxWidth;
    return styles;
  }, [props?.maxHeight, props?.maxWidth]);
  return (
    <Scrollbars
      style={scrollBarStyles}
      ref={props?.domRef}
      renderTrackHorizontal={() => {
        // x轴滚动轨道
        const xStyles: React.CSSProperties = {
          position: 'absolute',
          left: 0,
          bottom: 8,
          width: '100%',
          height: isUndefined(props?.x?.height) ? 8 : props?.x?.height,
          right: isUndefined(props?.x?.gap) ? 8 : props?.x?.gap,
          borderRadius: isUndefined(props?.x?.radius) ? 4 : props?.x?.radius,
          background: props?.x?.trackBackgroundColor || 'transparent',
        };
        return <div style={xStyles} />;
      }}
      renderThumbHorizontal={() => {
        if (!props?.x?.show) {
          const xStyles: React.CSSProperties = {
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 0,
            borderRadius: 0,
            background: props?.x?.thumbBackgroundColor || 'rgba(255, 255, 255, 0.2)',
          };
          return <div style={xStyles} />;
        } else {
          const xStyles: React.CSSProperties = {
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: isUndefined(props?.x?.height) ? 8 : props?.x?.height,
            borderRadius: isUndefined(props?.x?.radius) ? 4 : props?.x?.radius,
            background: props?.x?.thumbBackgroundColor || 'rgba(255, 255, 255, 0.2)',
          };
          return <div style={xStyles} />;
        }
      }}
      renderTrackVertical={() => {
        // y轴滚动轨道
        const yStyles: React.CSSProperties = {
          position: 'absolute',
          top: 0,
          height: '100%',
          width: isUndefined(props?.y?.width) ? 8 : props?.y?.width,
          right: isUndefined(props?.y?.gap) ? 8 : props?.y?.gap,
          borderRadius: isUndefined(props?.y?.radius) ? 4 : props?.y?.radius,
          background: props?.y?.trackBackgroundColor || 'transparent',
        };
        return <div style={yStyles} />;
      }}
      renderThumbVertical={() => {
        if (!props?.y?.show) {
          const yStyles: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 0,
            borderRadius: 0,
            background: props?.y?.thumbBackgroundColor || 'rgba(255, 255, 255, 0.2)',
          };
          return <div style={yStyles} />;
        } else {
          const yStyles: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            right: 0,
            width: isUndefined(props?.y?.width) ? 8 : props?.y?.width,
            borderRadius: isUndefined(props?.y?.radius) ? 4 : props?.y?.radius,
            background: props?.y?.thumbBackgroundColor || 'rgba(255, 255, 255, 0.2)',
          };
          return <div style={yStyles} />;
        }
      }}
      onScroll={(e) => props?.onScroll?.(e)}
      onScrollStop={() => props?.onScrollStop?.()}
      onScrollStart={() => props?.onScrollStart?.()}
      onUpdate={(val) => props?.onUpdate?.(val)}
    >
      {props?.children}
    </Scrollbars>
  );
};

export default Scrollbar;
