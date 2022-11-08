import AccountBtn from "./AccountBtn";
import LogoButton from "./LogoButton";
import PageOption from "./PageOption";
import "../styles/components/navBar.scss";

const NavBar = () => {
  return (
    <div className="navBarBlock">
      <div className="navBarFlex">
        <div className="navBarflex1">
          <LogoButton />
          <PageOption redir={"/"} child={"Home"} />
          <PageOption redir={"/about"} child={"About"} />
        </div>
        <div className="navBarflex1">
          <AccountBtn />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
