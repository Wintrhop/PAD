import axios from "axios";
import { useState } from "react";
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

const Advicer = () => {
  const navigate = useNavigate();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const role = useSelector((state) => state.authReducer.role);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profileImg = localStorage.getItem("profileImg");
  const [certificate, setCertificate] = useState(null);
  const [certificatePrev, setCertificatePrev] = useState(null);
  const [petAlreadyCreated, setPetAlreadyCreated] = useState(null);
  const[states,setStates]= useState(0)

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
      data.append("certificate", certificate);

      if (!certificatePrev) {
        Swal.fire({
          title: "Error",
          text: "Debes Agregar su Tarjeta Profesional",
          icon: "error",
          confirmButtonText: "Perfecto",
        });
        throw new Error("sin documentos");
      }

      const response = await axios.post(
        "https://property-advice.herokuapp.com/api/adPets/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("creacion peticion", response);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Excelente, verificaremos tus documentos",
      });
      document.getElementById("certificate").value = "";
      setCertificatePrev(null);
      setPetAlreadyCreated(true);
      setStates((e)=>e+1)
    } catch (error) {}
  };

  return (
    <div className="AdvicerContainer">
      <div className="advicerFlexContainer">
        <div className="clientLogobox">
          <div className="clientLogoContainer">
            <div className="logoSticky">
              {reduxExpired ? (
                <></>
              ) : (
                <InfoClient name={name} email={email} profileImg={profileImg} />
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
                  setClick={() => navigate("/userClient")}
                  className={"buttonComp1 cardContainer"}
                  child={"Solicitar un estudio de titulos"}
                />
              )}
              <AdminBtn/>
            </div>
          </div>
        </div>
        <div className="advicerBox">
          {petAlreadyCreated ? (
            role === "advicer" ? (
              <div className="offersflex">
                <div className="whatWeOffer">Hola</div>
                <div className="offerText">Advicer</div>
              </div>
            ) : (
              <div className="offersflex">
                <div className="whatWeOffer">Pronto</div>
                <div className="offerText">Revisaremos tu documento</div>
              </div>
            )
          ) : (
            <div className="offersflex">
              <div className="whatWeOffer">¿Eres Abogado titulado?</div>
              <div className="offerText">
                En Property Advice podras ganar dinero adicional ¡alista tu
                tarjeta profesional!.
              </div>
            </div>
          )}

          <PetitionCreated
            petAlreadyCreated={petAlreadyCreated}
            setPetAlreadyCreated={setPetAlreadyCreated}
          />
          {reduxExpired ? (
            <div className="loginAndSign">
              <div className="loginAndSignText">
                ¡Conviertete en colaborador de Property Advice!
              </div>

              <div className="loginAndSignText">
                ¡Primero debes iniciar sesión o registrarte!
              </div>
              <AccountPopover />
            </div>
          ) : !petAlreadyCreated ? (
            <div className="infoContainer">
              <div className="formCreateStudy">
                <form onSubmit={handleSubmit} className="formStudy">
                  <h1>Tu tarjeta profesional debe estar en formato Pdf</h1>
                  <button className="inputDiv cardContainer" type="button">
                    <label htmlFor={"certificate"}>
                      Seleccionar tarjeta profesional
                    </label>
                    <input
                      type={"file"}
                      name={"certificate"}
                      className={"inputForm"}
                      id={"certificate"}
                      accept="image/.pdf"
                      onChange={(e) => {
                        handleChange(
                          e,
                          certificate,
                          setCertificate,
                          setCertificatePrev
                        );
                      }}
                    ></input>
                  </button>
                  <div>
                    {!!certificatePrev && (
                      <img
                        className="condImg"
                        src={certificatePrev}
                        alt="certificate"
                      ></img>
                    )}
                  </div>

                  <div className="loginAndSign">
                    <button type="submit" className="popoverBtn cardContainer">
                      Enviar documento
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : role === "advicer" ? (
            <ListAssignments states={states} setStates={setStates} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Advicer;
