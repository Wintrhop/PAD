import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AccountPopover from "../components/AccountPopover";
import ButtonComp from "../components/ButtonComp";
import InfoClient from "../components/InfoClient";
import StudyRender from "../components/StudyRender";
import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";

const Study = () => {
  const navigate = useNavigate();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const role = useSelector((state) => state.authReducer.role);
  
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profileImg = localStorage.getItem("profileImg");
  const [advice, setAdvice] = useState(null);
  const [advicePrev, setAdvicePrev] = useState(null);
  const [adviceExist, setAdviceExist] = useState(null);
 

  const [item, setItem] = useState(null);
  const params = useParams();
  const token = localStorage.getItem("token");

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
      data.append("advice", advice);

      if (!advicePrev) {
        Swal.fire({
          title: "Error",
          text: "Debes Agregar la respuesta",
          icon: "error",
          confirmButtonText: "Perfecto",
        });
        throw new Error("sin documentos");
      }

      const response = await axios.post(
        `https://property-advice.herokuapp.com/api/advices/${params.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("creacion advice", response);
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Respuesta Enviada",
      });
      document.getElementById("advice").value = "";
      setAdvicePrev(null);
    } catch (error) {}
  };
  const getItem = async () => {
    if(token)
    try {
        setItem(null);
        setAdviceExist(null)
      const { data } = await axios.get(
        `https://property-advice.herokuapp.com/api/studies/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const data1 = data.data;
      setItem(data1);
      if (data1.advice === undefined) {
        setAdviceExist(false);
      } else {
        setAdviceExist(true);
      }
    } catch (err) {
      
      const err1 =  err.response.status;
      
      if(err1 === 400){
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "Error",
            title: "Usuario Invalido",
          });
          navigate("/userClient")
      }
      
      
    }
  };
  useEffect(() => {
    
    getItem();
    // eslint-disable-next-line
  }, [reduxExpired]);
  
  return (
    <div className="studyContainer">
      <div className="AdvicerContainer">
        <div className="advicerFlexContainer">
          <div className="clientLogobox">
            <div className="clientLogoContainer">
              <div className="logoSticky">
                {reduxExpired ? (
                  <></>
                ) : (
                  <InfoClient
                    name={name}
                    email={email}
                    profileImg={profileImg}
                  />
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
                    child={"volver"}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="advicerBox">
            {reduxExpired ? (
              <div>
                <div className="offersflex">
                  <div className="whatWeOffer">Inicia sesión</div>
                  <div className="offerText">Para continuar</div>
                </div>
                <div className="loginAndSign">
                  <AccountPopover hidden={"hidden"} />
                </div>
              </div>
            ) : role === "advicer" ? (
              <div className="offersflex">
                <div className="whatWeOffer">Hola</div>
                <div className="offerText">Advicer</div>
              </div>
            ) : (
              <div className="offersflex">
                <div className="whatWeOffer">Hola</div>
                <div className="offerText"></div>
              </div>
            )}
            {!reduxExpired && item ? (
              <StudyRender item={item} role1={role} />
            ) : (
              <></>
            )}

            {reduxExpired ? (
              <></>
            ) : role !== "client" && !adviceExist ? (
              <div className="infoContainer">
                <div className="formCreateStudy">
                  <form onSubmit={handleSubmit} className="formStudy">
                    <h1>El advice a esta Solicitud debe ser Formato Pdf</h1>
                    <button className="inputDiv cardContainer" type="button">
                      <label htmlFor={"advice"}>Seleccionar Advice</label>
                      <input
                        type={"file"}
                        name={"advice"}
                        className={"inputForm"}
                        id={"advice"}
                        accept="image/.pdf"
                        onChange={(e) => {
                          handleChange(e, advice, setAdvice, setAdvicePrev);
                        }}
                      ></input>
                    </button>
                    {!!advicePrev && (
                      <img
                        className="condImg"
                        src={advicePrev}
                        alt="advice"
                      ></img>
                    )}
                    <div className="loginAndSign">
                      <button
                        type="submit"
                        className="popoverBtn cardContainer"
                      >
                        Enviar documento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
