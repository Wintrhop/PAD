import { useNavigate } from "react-router-dom"
import "../styles/components/logoButton.scss"
import logoPad from "../styles/imgs/PadLogo.png"

const LogoButton = () => {
  const navigate = useNavigate();
  return (
    <button className="logoButton">
        <img src={logoPad} alt="logo" onClick={()=>navigate(-1)}></img>
    </button>
  )
}

export default LogoButton