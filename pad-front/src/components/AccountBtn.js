import hamburger from "../styles/imgs/hamburger.svg";
import AccountSvg from "../styles/imgs/Account.png";
import "../styles/components/accountBtn.scss";
import { Popover } from "@mantine/core";
import AccountPopover from "./AccountPopover";
import { useState } from "react";
const AccountBtn = () => {
  const [openedPop, setOpenedPop] = useState(false);
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={openedPop}
      onChange={setOpenedPop}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <button
          className="accountButton"
          onClick={() => setOpenedPop((o) => !o)}
        >
          <img src={hamburger} alt="Menu Icon Png White@seekpng.com" />
          <img src={AccountSvg} alt="Account" />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <AccountPopover setOpenedPop={setOpenedPop}/>
      </Popover.Dropdown>
    </Popover>
  );
};

export default AccountBtn;
