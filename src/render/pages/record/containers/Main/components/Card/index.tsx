import React, { CSSProperties } from 'react';
import './index.less';

const DEFAULT_STYLE: CSSProperties = {
  width: 160,
  height: 70,
};

export interface IProps {
  text: string;
  style?: CSSProperties;
  selected?: boolean;
  Icon?: React.FC<void>;
  onClick?: () => void;
}

const Card = (props: IProps) => {
  const { selected, style, text, Icon, onClick } = props;

  const wrapStyle: CSSProperties = {
    ...DEFAULT_STYLE,
    ...style,
  };

  return (
    <div className={`card ${selected ? 'selected' : ''}`} style={wrapStyle} onClick={onClick}>
      <div className="card-content">
        {Icon ? Icon() : null}
        <div className="card-text">
          { text }
        </div>
      </div>
    </div>
  );
};

export default Card;