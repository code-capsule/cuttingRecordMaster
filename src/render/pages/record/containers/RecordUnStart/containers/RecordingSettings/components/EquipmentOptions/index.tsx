import React from 'react';
import { ISelectItem } from '../../../../../../components/Select';
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

  const handleClickCamKey = (selectItem: ISelectItem) => {
    onChangeCamKey(selectItem.key as string);
  };

  const handleClickMicKey = (selectItem: ISelectItem) => {
    onChangeMicKey(selectItem.key as string);
  };

  return (
    <div className="equipment-options">
      {micVisible ? <MicOptions micKey={micKey} onChangeMicKey={handleClickMicKey} /> : null}
      {camVisible ? <CamOptions camKey={camKey} onChangeCamKey={handleClickCamKey} />: null}
    </div>
  );
};

export default EquipmentOptions;
