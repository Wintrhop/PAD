import axios from "axios";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CardPrev from "../components/ CardPrev";
import AccountPopover from "../components/AccountPopover";
import ButtonComp from "../components/ButtonComp";
import InfoClient from "../components/InfoClient";

import LogoRadius from "../styles/imgs/PadwithBorderLogo.png";

const ConfirmationPay = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data"));
  const dataPrev = JSON.parse(localStorage.getItem("studyPrev"));
  const name = localStorage.getItem("name");
  const email= localStorage.getItem("email")
  const profileImg = localStorage.getItem("profileImg");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const [expired, setExpired] = useState(true);
  console.log('studio antes del click',data)
  console.log('confirmation')

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
      
      const res = await axios.post(
        `${process.env.REACT_APP_PADBACK}/api/studies`,
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

      console.log('studio despues del axios', data)
        localStorage.removeItem('studySolicitation')
        console.log('res', res.data.data)
        navigate(`/clientUser`)
    } catch (err) {
      alert("Something went wrong, please review your information");
      console.log(err.toJSON());
    }
  };

  useEffect(() => {
    setExpired(isExpired);
  }, [expired]);
  return (
    <>
    
    <div className="studyContainer">
      <div className="AdvicerContainer">
        <div className="advicerFlexContainer">
          <div className="clientLogobox">
            <div className="clientLogoContainer">
              <div className="logoSticky">
                {expired ? (
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
                
              </div>
            </div>
          </div>
          <div className="advicerBox">
            {expired ? (
              <div>
                <div className="offersflex">
                  <div className="whatWeOffer">Inicia sesión</div>
                  <div className="offerText">Para continuar</div>
                </div>
                <div className="loginAndSign">
                  <AccountPopover hidden={"hidden"} />
                </div>
              </div>
            ) : 
            <>
              <div className="offersflex">
                <div className="whatWeOffer">Hola</div>
                <div className="offerText">confirma y paga</div>
              </div>
              <CardPrev item={dataPrev}/>
              <ButtonComp setClick={handleSubmit}/>
              </>
            }
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ConfirmationPay;
