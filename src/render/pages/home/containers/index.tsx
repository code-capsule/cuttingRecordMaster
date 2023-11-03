import React, { useEffect, useState } from 'react';
import './index.less';
import { useSelector, shallowEqual } from 'react-redux';
import User from './User';
import Sidebar from './Sidebar';
import TopMenu from '@common/components/TopMenu';
import Scrollbar from '@common/components/ScrollBar';
import { SideMenuType } from './Sidebar/constant';
import { HOME_PROCESS_KEY } from '@common/constants/processKey';
import CuttingRecordingBox from './CuttingRecordingBox';
import ProductCard from './ProductCard';

function Main() {
  const [sideMenu, setSideMenu] = useState<SideMenuType>(SideMenuType.HOME);
  const draftList = useSelector((state: MasterAppStoreType.AppState) => state.draftPage?.draftList || [], shallowEqual);

  useEffect(() => {
    window.master?.stores?.localStore?.draft?.getHomeDraftList();
  }, []);

  return (
    <div className="home-container">
      <div className="home-drag-box" />
      <div className="home-top-menu">
        <TopMenu currentWindow={HOME_PROCESS_KEY} svgColor="#808191" />
      </div>
      <div className="home-left">
        <Sidebar currentSideMenu={sideMenu} onChange={setSideMenu} />
        <User />
      </div>
      <div className="home-right">
        <Scrollbar maxHeight={window.innerHeight - 32} x={{ show: false }} y={{ show: false }}>
          <CuttingRecordingBox />
          <div className="home-product-title">最近作品 ({draftList?.length}) </div>
          {!!draftList?.length && (
            <div className="home-product-list">
              {draftList?.map((draftInfo: MasterDraftType.IDraftItem, idx) => {
                return (
                  <React.Fragment key={`${draftInfo?.id}_${idx}`}>
                    <ProductCard data={draftInfo} />
                  </React.Fragment>
                );
              })}
            </div>
          )}
          {!draftList?.length && <div className="home-product-list-empty">暂无草稿作品，快去创建新作品吧~</div>}
        </Scrollbar>
      </div>
    </div>
  );
}

export default Main;
