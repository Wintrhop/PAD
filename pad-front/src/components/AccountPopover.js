import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import "../styles/components/accountPopover.scss";
import FormLogIn from "./FormLogIn";
import FormSignup from "./FormSignup";
import { useJwt } from "react-jwt";
import { useDispatch } from "react-redux";
import { changeisExpired, changeName, changeRole } from "../store/reducer/authReducer";

const AccountPopover = ({ setOpenedPop, hidden }) => {
  const dispatch= useDispatch();
  const [opened, setOpened] = useState(false);
  const [openedLog, setOpenedLog] = useState(false);

  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const [expired, setExpired] = useState(true);

  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("profileImg");
    dispatch(changeisExpired(true));
    dispatch(changeRole(""))
    dispatch(changeName(""))
    setOpenedPop(false);
  };
  useEffect(() => {
    setExpired(isExpired);
     // eslint-disable-next-line
  }, [expired]);
  return (
    <div className="accountPopover">
      {expired ? (
        <div>
          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title="Registrate"
            overflow="outside"
            withCloseButton={false}
            size="45%"
          >
            <FormSignup
              setOpened={setOpened}
              setOpenedPop={setOpenedPop}
              setExpired={setExpired}
            />
          </Modal>
          <button className={`popoverBtn ${hidden}`} onClick={() => setOpened(true)}>
            Registrarse
          </button>
          <Modal
            centered
            opened={openedLog}
            onClose={() => setOpenedLog(false)}
            title="Inicia Sesión"
            overflow="outside"
            withCloseButton={false}
            size="45%"
          >
            <FormLogIn
              setOpenedLog={setOpenedLog}
              setOpenedPop={setOpenedPop}
              setExpired={setExpired}
            />
          </Modal>
          <button className="popoverBtn" onClick={() => setOpenedLog(true)}>
            Inicia Sesión
          </button>
        </div>
      ) : (
        <button className="popoverBtn" onClick={() => closeSession()}>
          Cerrar Sesión
        </button>
      )}
    </div>
  );
};

export default AccountPopover;
