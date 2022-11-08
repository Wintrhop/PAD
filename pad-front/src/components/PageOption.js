import { useNavigate } from "react-router-dom";
import "../styles/components/pageOption.scss"


const PageOption = (props) => {

  const navigate = useNavigate();
  return (
    <button className="pageOption" onClick={()=>navigate(props.redir)}>{props.child}
    </button>
  )
}

export default PageOption