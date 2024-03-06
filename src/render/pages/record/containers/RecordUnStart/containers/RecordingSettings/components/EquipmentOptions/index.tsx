import React from 'react';
import MicOptions from './MicOptions';
import CamOptions from './CamOptions';
import './index.less';

interface IProps {
  camKey: string;
  micKey: string;
  micVisible?: boolean;
  camVisible?: boolean;
  onChangeCamKey: (camKey: string) => void;
  onChangeMicKey: (micKey: string) => void;
}

const EquipmentOptions = (props: IProps) => {
  const { camKey, micKey, micVisible = true, camVisible = true, onChangeCamKey, onChangeMicKey } = props;

  return (
    <div className="equipment-options">
      {micVisible ? <MicOptions micKey={micKey} onChangeMicKey={onChangeMicKey} /> : null}
      {camVisible ? <CamOptions camKey={camKey} onChangeCamKey={onChangeCamKey} />: null}
    </div>
  );
};

export default EquipmentOptions;
