import { useSelector } from "react-redux";
import AccountPopover from "../components/AccountPopover";
import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";
import "../styles/pages/client.scss";

const Client = () => {
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profileImg = localStorage.getItem("profileImg");
  return (
    <div className="clientContainer">
      <div className="centerContainer">
        <div className="clientHeaderFlex">
          <div className="clientInfo">
            {reduxExpired ? (
              <div className="loginAndSign">
                <div className="loginAndSignText">
                  ¡Primero debes iniciar sesión o Registrarte!
                </div>
                <AccountPopover />
              </div>
            ) : (
              <div className="infoContainer">
                <div className="infoClientFlex">
                  <div className="profileImgContainer">
                    <img
                      className="profileImg"
                      src={profileImg}
                      alt="profile img"
                    ></img>
                  </div>
                  <div className="infoClient">
                    <div className="nameClient">{name}</div>
                    <div className="emailClient">{email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="clientLogoContainer">
            <img
              className="clientLogo"
              src={LogoRadius}
              alt="Property Advice"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
