import AccountBtn from "./AccountBtn";
import LogoButton from "./LogoButton";
import PageOption from "./PageOption";
import "../styles/components/navBar.scss";
import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeisExpired } from "../store/reducer/authReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const { isExpired } = useJwt(token);
  const [expired, setExpired] = useState(true);
  
  useEffect(() => {
    setExpired(isExpired);
    dispatch(changeisExpired(expired))
  });


  return (
    <div className="navBarBlock">
      <div className="navBarFlex">
        <div className="navBarflex1">
          <LogoButton />
          <PageOption redir={"/"} child={"Home"} />
          <PageOption redir={"/about"} child={"About"} />
        </div>
        <div className="navBarflex1">
          {reduxExpired ? null : (
            <>
              <span className="nameWelcome">{`Hola ${name}`}</span>
            </>
          )}
          <AccountBtn />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
