/**
 * @description Y轴滚动
 */
import React, { useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
          height: props?.x?.height || 8,
          right: props?.x?.gap || 8,
          borderRadius: props?.x?.radius || 4,
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
            height: props?.x?.height || 8,
            borderRadius: props?.x?.radius || 4,
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
          width: props?.y?.width || 8,
          right: props?.y?.gap || 8,
          borderRadius: props?.y?.radius || 4,
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
            width: props?.y?.width || 8,
            borderRadius: props?.y?.radius || 4,
            background: props?.y?.thumbBackgroundColor || 'rgba(255, 255, 255, 0.2)',
          };
          return <div style={yStyles} />;
        }
      }}
    >
      {props?.children}
    </Scrollbars>
  );
};

export default Scrollbar;
