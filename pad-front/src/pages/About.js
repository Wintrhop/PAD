import "../styles/pages/about.scss";
import profileImg from "../styles/imgs/aboutImg.jpeg"
const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutContainer --blue"></div>

      <div className="aboutProfileContainer">
        <div className="aboutProfile">
          <img
            className="aboutProfileImg"
            alt="cargando"
            src={profileImg}
          ></img>
        </div>
        <div className="profileData">
          <div className="profileName">Jhon Vasquez</div>
          <div className="profileDescription">
            Dispuesto a salir de la zona de comfort y con gran curiosidad,
            Abogado y Musico autodidacta.
          </div>
          <div className="profileEmail"> jhonv.v1@gmail.com</div>
          <div className="profileGithub">
            <a href="https://github.com/Wintrhop">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
