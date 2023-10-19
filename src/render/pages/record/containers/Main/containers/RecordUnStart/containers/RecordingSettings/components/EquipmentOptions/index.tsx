import React from 'react';
import Select, { ISelectItem } from '../../../../../../components/Select';
import { ReactComponent as MicIcon } from '@render/pages/record/assets/mic.svg';
import { ReactComponent as CamIcon } from '@render/pages/record/assets/cam.svg';
import { MIC_OPTIONS, CAM_OPTIONS } from '../../../../../../constants';
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

  const renderMicIcon = () => {
    return <MicIcon width={20} height={20} style={{ marginRight: '8px' }} />;
  };

  const renderCamIcon = () => {
    return <CamIcon width={25} height={25} style={{ marginRight: '8px' }} />;
  };

  const handleClickCamKey = (selectItem: ISelectItem) => {
    onChangeCamKey(selectItem.key as string);
  };

  const handleClickMicKey = (selectItem: ISelectItem) => {
    onChangeMicKey(selectItem.key as string);
  };

  return (
    <div className="equipment-options">
      {micVisible ? (
        <div className="equipment-option">
          <Select Icon={renderMicIcon} list={MIC_OPTIONS} currentKey={micKey} onChange={handleClickMicKey}></Select>
        </div>
      ) : null}
      {camVisible ? (
        <div className="equipment-option">
          <Select Icon={renderCamIcon} list={CAM_OPTIONS} currentKey={camKey} onChange={handleClickCamKey}></Select>
        </div>
      ) : null}
    </div>
  );
};

export default EquipmentOptions;
