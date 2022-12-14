
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminBtn from "../components/AdminBtn";
import ButtonComp from "../components/ButtonComp";
import LogoButton from "../components/LogoButton";
import "../styles/pages/home.scss";

const Home = () => {
  const navigate = useNavigate()

  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  return (
    <div className="homeContainer">
      <div className="homeHeaderFlex">
        <div className="homeHeaderSlogan">
          <div className="sloganText">
            <h1>
              ¡No pares de soñar!, te ayudamos con el estudio de la propiedad.
            </h1>
          </div>
          <div className="sloganAditionalText">
            <h2>
              Con Property Advice no te tienes que preocupar por el estudio de
              titulos de tu casa soñada.
            </h2>
          </div>
          <div className="logoHome">
            <LogoButton />
          </div>
        </div>
        <div className="homeImgContainer">
          <img
            className="homeImg"
            src={
              "https://cdn.homedit.com/wp-content/uploads/2019/07/Chappell-Smith-The-Raleigh-Architecture-Co.jpg"
            }
            alt="Home Img"
          ></img>
          <span className="homeImgSpan">Nuestros profesionales te esperan</span>
        </div>
      </div>
      <div className="offersflex">
        <div className="whatWeOffer">¿Qué ofrecemos?</div>
        <div className="offerText">
          En Property Advice podrás solicitar el estudio de un titulo acreditado por un profesional, o
          convertirte en Advicer colaborador y ganar dinero adicional.
        </div>
      </div>
      <div className="homeButtons">
        <ButtonComp setClick ={()=> navigate("/userClient")} className={"buttonComp"} child={"Solicita un estudio de titulos"} />
        <ButtonComp setClick ={()=> navigate("/advicer")} className={"buttonComp"} child={"Conviértete en colaborador"} />
        
      </div>
      <div>
      {reduxExpired?<></>:<AdminBtn/>}  
      </div>
      
    </div>
  );
};

export default Home;
