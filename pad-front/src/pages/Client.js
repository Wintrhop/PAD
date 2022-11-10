import { useSelector } from "react-redux";
import AccountPopover from "../components/AccountPopover";
import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";
import "../styles/pages/client.scss";
import axios from "axios";
import { useState } from "react";
import ListallStudies from "../components/ListallStudies";

const Client = () => {
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profileImg = localStorage.getItem("profileImg");
  const [tradLib, setTradLib] = useState(null);
  const [tradlibPrev, setTradLibPrev] = useState(null);
  const [mayorExt, setMayorExt] = useState(null);
  const [mayorExtPrev, setMayorExtPrev] = useState(null);
  const [escritura, setEscritura] = useState(null);
  const [escrituraPrev, setEscrituraPrev] = useState(null);
  const [regPropHo, setRegPropHo] = useState(null);
  const [regPropHoPrev, setRegPropHoPrev] = useState(null);

  function readFile(file, setFilePrev) {
    const reader = new FileReader();

    reader.onload = (e) => setFilePrev(e.target.result);
    // reader.onload = (e) => console.log(e.target.result)

    reader.readAsDataURL(file);
  }
  const handleChange = (event, file, setFile, setFilePrev) => {
    readFile(event.target.files[0], setFilePrev);
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append("tradLib", tradLib);
      data.append("mayorExtension", mayorExt);
      data.append("escritura", escritura);
      data.append("regPropHorizontal", regPropHo);

      await axios.post(
        "https://property-advice.herokuapp.com/api/studies",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      document.getElementById("tradLib").value = "";
      document.getElementById("mayorExtension").value = "";
      document.getElementById("escritura").value = "";
      document.getElementById("regPropHorizontal").value = "";
      setTradLibPrev(null);
      setMayorExtPrev(null);
      setEscrituraPrev(null);
      setRegPropHoPrev(null);
    } catch (error) {}
  };
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
                <div className="formCreateStudy">
                  <form onSubmit={handleSubmit} className="formStudy">
                    <h1>Los Documentos deben ser Formato Pdf</h1>
                    <button className="inputDiv" type="button">
                      <label htmlFor={"tradLib"}>
                        Certificado de Tradicion y libertad
                      </label>
                      <input
                        type={"file"}
                        name={"tradLib"}
                        className={"inputForm"}
                        id={"tradLib"}
                        accept="image/.pdf"
                        onChange={(e) => {
                          handleChange(e, tradLib, setTradLib, setTradLibPrev);
                        }}
                      ></input>
                    </button>

                    <button className="inputDiv" type="button">
                      <label htmlFor={"mayorExtension"}>
                        Certificado de Mayor Extension
                      </label>
                      <input
                        type={"file"}
                        name={"mayorExtension"}
                        className={"inputForm"}
                        id={"mayorExtension"}
                        accept="image/.pdf"
                        onChange={(e) => {
                          handleChange(
                            e,
                            mayorExt,
                            setMayorExt,
                            setMayorExtPrev
                          );
                        }}
                      ></input>
                    </button>

                    <button className="inputDiv" type="button">
                      <label htmlFor={"escritura"}>Escritura Publica</label>
                      <input
                        type={"file"}
                        name={"escritura"}
                        className={"inputForm"}
                        id={"escritura"}
                        accept="image/.pdf"
                        onChange={(e) => {
                          handleChange(
                            e,
                            escritura,
                            setEscritura,
                            setEscrituraPrev
                          );
                        }}
                      ></input>
                    </button>

                    <button className="inputDiv" type="button">
                      <label htmlFor={"regPropHorizontal"}>
                        Reglamento de propiedad Horizontal
                      </label>
                      <input
                        type={"file"}
                        name={"regPropHorizontal"}
                        className={"inputForm"}
                        onChange={(e) => {
                          handleChange(
                            e,
                            regPropHo,
                            setRegPropHo,
                            setRegPropHoPrev
                          );
                        }}
                        id={"regPropHorizontal"}
                        accept="image/.pdf"
                      ></input>
                    </button>
                    {!!tradlibPrev && (
                      <img
                        className="condImg"
                        src={tradlibPrev}
                        alt="tradLib"
                      ></img>
                    )}
                    {!!mayorExtPrev && (
                      <img
                        className="condImg"
                        src={mayorExtPrev}
                        alt="tradLib"
                      ></img>
                    )}
                    {!!escrituraPrev && (
                      <img
                        className="condImg"
                        src={escrituraPrev}
                        alt="tradLib"
                      ></img>
                    )}
                    {!!regPropHoPrev && (
                      <img
                        className="condImg"
                        src={regPropHoPrev}
                        alt="tradLib"
                      ></img>
                    )}
                    <div className="loginAndSign">
                      <button type="submit" className="popoverBtn">
                        Solicitar Estudio de Titulos
                      </button>
                    </div>
                  </form>
                </div>
                <ListallStudies />
              </div>
            )}
          </div>
          
            <div className="clientLogoContainer">
              <div className="logoSticky">
                <img
                  className="clientLogo"
                  src={LogoRadius}
                  alt="Property Advice"
                ></img>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Client;
