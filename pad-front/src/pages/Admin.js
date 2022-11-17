import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AccountPopover from "../components/AccountPopover";
import ButtonComp from "../components/ButtonComp";
import InfoClient from "../components/InfoClient";
import ListAssignments from "../components/ListAssignments";
import PetitionCreated from "../components/PetitionCreated";
import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";
import "../styles/pages/advicer.scss";

import "../styles/components/listAllStudies.scss";
import AdminBtn from "../components/AdminBtn";
import AdminListPetitions from "../components/AdminListPetitions";

const Admin = () => {
    const navigate = useNavigate();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profileImg = localStorage.getItem("profileImg");
  const [certificate, setCertificate] = useState(null);
  const [certificatePrev, setCertificatePrev] = useState(null);
  const [petAlreadyCreated, setPetAlreadyCreated] = useState(null);

  const verify = ()=>{
    if(role==="client"){
      navigate("/userClient")
    } else if(role==="advicer"){
      navigate("/advicer")
    }
  }
  useEffect(()=>{
    verify();
  },[])
  return (
    <div className="AdvicerContainer">
      <div className="advicerFlexContainer">
        <div className="clientLogobox">
          <div className="clientLogoContainer">
            <div className="logoSticky">
              {reduxExpired ? (
                <></>
              ) : (
                <div className="infoClientStudy"><InfoClient name={name} email={email} profileImg={profileImg} /></div>
                
              )}
              <img
                className="clientLogo"
                src={LogoRadius}
                alt="Property Advice"
              ></img>
              {reduxExpired ? (
                <></>
              ) : (
                <ButtonComp
                  setClick={() => navigate("/advicer")}
                  className={"buttonComp1 cardContainer"}
                  child={"Volver"}
                />
              )}
              
            </div>
          </div>
        </div>
        <div className="advicerBox">
        {!reduxExpired&&role === "admin"&& (
              <div className="offersflex">
                <div className="whatWeOffer">Hola</div>
                <div className="offerText">administrador</div>
              </div>
            )}

          
          {reduxExpired &&
            <div className="loginAndSign">
              <div className="loginAndSignText">
                ¡Primero debes iniciar sesión o registrarte!
              </div>
              <AccountPopover />
            </div>
          }
          <AdminListPetitions/>
        </div>
      </div>
    </div>
  )
}

export default Admin