// 官方文档可见：https://zillow.github.io/react-slider/
import React from 'react';
import './index.less';
import ReactSlider, { ReactSliderProps } from 'react-slider';

type ISliderProps = ReactSliderProps & {
  style?: React.CSSProperties 
}
const Slider = (props?: ISliderProps) => {
  return (
    <div className='common-slider-box' style={props?.style}>
      <ReactSlider
      {...props}
      className="common-slider"
      thumbClassName="common-slider-thumb"
      trackClassName="common-slider-track"
      min={props?.min || 0}
      max={props?.max || 10}
      value={props?.value}
      disabled={props?.disabled}
      onChange={(val, idx) => props?.onChange?.(val, idx)}
      onAfterChange={(val, idx) => props?.onAfterChange?.(val, idx)}
    />
    </div>
  );
};

export default Slider;
