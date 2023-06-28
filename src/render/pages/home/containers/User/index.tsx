import React from 'react';
import './index.less';
import { useSelector } from 'react-redux';

const User = () => {
  const userInfo = useSelector((state: MasterAppStoreType.AppState) => state.userPage);
  return (
    <div className="home-user">
      <img src={userInfo?.photoUrl} alt="" className="home-user-avatar" />
      <div className="home-user-name">{userInfo?.username}</div>
    </div>
  );
};

export default User;
