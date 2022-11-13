import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import ButtonComp from "./ButtonComp"


const AdminBtn = () => {
    const navigate = useNavigate();
    const role = useSelector((state) => state.authReducer.role);
  return (
    <>{role === "admin" ? (
        <ButtonComp
          setClick={() => navigate("/admin")}
          className={"buttonComp1 cardContainer"}
          child={"Modo administrador"}
        /> 
      ) : (
        <></>
      )}
    </>
    
  )
}

export default AdminBtn