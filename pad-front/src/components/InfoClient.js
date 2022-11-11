import React from "react";

const InfoClient = ({ profileImg, name, email }) => {
  return (
    <div className="infoClientFlex">
      <div className="profileImgContainer">
        <img className="profileImg" src={profileImg} alt="profile img"></img>
      </div>
      <div className="infoClient">
        <div className="nameClient">{name}</div>
        <div className="emailClient">{email}</div>
      </div>
    </div>
  );
};

export default InfoClient;
