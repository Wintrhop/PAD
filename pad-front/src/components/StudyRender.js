import React from "react";
import { useSelector } from "react-redux";
import InfoClient from "./InfoClient";

const StudyRender = ({ item, role1 }) => {
  let userStudy;
  if (item) {
    userStudy = item.user;
  }
  const role = useSelector((state) => state.authReducer.role);
 

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
      </div>
      {role === "client" ? (
        <></>
      ) : (
        <InfoClient
          name={userStudy.name}
          email={userStudy.email}
          profileImg={profileImg}
        />
      )}
    </div>
  );
};

export default StudyRender;
