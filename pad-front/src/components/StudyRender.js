import React from "react";
import { useSelector } from "react-redux";
import InfoClient from "./InfoClient";
import "../styles/components/studyRender.scss"

const StudyRender = ({ item, adviceCreated }) => {

  const role = localStorage.getItem('role')
  let userStudy;
  if (item) {
    userStudy = item.user;
  }
 

  const profileImg = localStorage.getItem("profileImg");
  return (
    <div className="studyContainerFlex">
      <div className="renderFlex">
        <img className="studyImgRend" src={item.tradLib} alt="tradLib"></img>
        <img
          className="studyImgRend"
          src={item.mayorExtension}
          alt="mayorExtension"
        ></img>
        <img
          className="studyImgRend"
          src={item.escritura}
          alt="escritura"
        ></img>
        <img
          className="studyImgRend"
          src={item.regPropHorizontal}
          alt="regPropHorizontal"
        ></img>
        {adviceCreated?<div>
          <div>Advice</div>
        <img
          className="studyImgRend"
          src={adviceCreated}
          alt="advice"
        ></img>
        </div>:<></>}
        
      </div>
      {role === "client" ? (
        <></>
      ) : (
        <div className="clientRenderInfo">
          <div>Cliente</div>
        <InfoClient
          name={userStudy.name}
          email={userStudy.email}
          profileImg={profileImg}
        />
        </div>
      )}
    </div>
  );
};

export default StudyRender;
