import { useSelector } from "react-redux";
import AccountPopover from "../components/AccountPopover";
import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";
import "../styles/pages/client.scss";
import axios from "axios";
import { useState } from "react";
import ListallStudies from "../components/ListallStudies";
import Swal from "sweetalert2";
import ButtonComp from "../components/ButtonComp";
import { useNavigate } from "react-router-dom";
import InfoClient from "../components/InfoClient";

import "../styles/components/listAllStudies.scss";
import Payment from "../components/Payment";

const Client = () => {
  const navigate = useNavigate();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const role = localStorage.getItem('role')
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
  const[states,setStates]= useState(0)
  console.log('role',role);

  let buttonText = "";
  if (role === "client") {
    buttonText = "Conviertete en colaborador";
  } else {
    buttonText = "Modo Advicer";
  }

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

      if (!tradlibPrev || !mayorExtPrev || !escrituraPrev || !regPropHoPrev) {
        Swal.fire({
          title: "Error",
          text: "Debes Agregar todos los documentos",
          icon: "error",
          confirmButtonText: "Perfecto",
        });
        throw new Error("sin documentos");
      }

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
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Estudio de Titulos Creado",
      });
      

      document.getElementById("tradLib").value = "";
      document.getElementById("mayorExtension").value = "";
      document.getElementById("escritura").value = "";
      document.getElementById("regPropHorizontal").value = "";
      setTradLibPrev(null);
      setMayorExtPrev(null);
      setEscrituraPrev(null);
      setRegPropHoPrev(null);
      setStates((e) => e + 1);
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
                <InfoClient name={name} email={email} profileImg={profileImg} />

                <div className="formCreateStudy">
                  <form onSubmit={handleSubmit} className="formStudy">
                    <h1>Los documentos deben ser formato Pdf</h1>
                    <button className="inputDiv cardContainer" type="button">
                      <label htmlFor={"tradLib"}>
                        Certificado de tradición y libertad
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

                    <button className="inputDiv cardContainer" type="button">
                      <label htmlFor={"mayorExtension"}>
                        Certificado de mayor extensión
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

                    <button className="inputDiv cardContainer" type="button">
                      <label htmlFor={"escritura"}>Escritura pública</label>
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

                    <button className="inputDiv cardContainer" type="button">
                      <label htmlFor={"regPropHorizontal"}>
                        Reglamento de propiedad horizontal
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
                      <Payment
                      setClick={handleSubmit}
                        type="button"
                        className={"popoverBtn"}
                        price1={190000}
                        name1={name}
                        tradlibPrev={tradlibPrev}
                        mayorExtPrev={mayorExtPrev}
                        escrituraPrev={escrituraPrev}
                        regPropHoPrev={regPropHoPrev}
                      />
                    </div>
                  </form>
                </div>
                <ListallStudies states={states} setStates={setStates} />
              </div>
            )}
          </div>
          <div className="clientLogobox">
            <div className="clientLogoContainer">
              <div className="logoSticky">
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
                    className={"buttonComp1"}
                    selected={"cardContainer"}
                    child={buttonText}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
