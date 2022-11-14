import { Modal } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import "../styles/components/petUser.scss"
import ModalPet from "./ModalPet";

const PetUser = (props) => {

  const user = props.item;
  const approved = user.approved;
  const token = localStorage.getItem("token");
  const id = props.id;
  const [openedPet, setOpenedPet]= useState(false)
  
  const handleClick = async ()=>{
    try {
      const data = new FormData();
      const response = await axios.post(
        `https://property-advice.herokuapp.com/api/adPets/adm/${id}`,data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      props.setStates((e)=> e+1)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className="infoClientFlex" onClick={()=>setOpenedPet(true)}>
      <Modal
              opened={openedPet}
              onClose={() => setOpenedPet(false)}
              overflow="outside"
              withCloseButton={false}
              fullScreen
            >
              <ModalPet profileImg1={props.profileImg} petition={props.petition} user={user} setOpenedPet={setOpenedPet} setClick={handleClick} approved={approved}  />
            </Modal>
        <div className="profileImgContainer">
          <img
            className="profileImg"
            src={props.profileImg}
            alt="profile img"
          ></img>
        </div>
        <div className="infoClient">
          <div className="nameClient">{user.name}</div>
          <div className="emailClient">{user.email}</div>
        </div>
      </div>
      {!approved&&<button className="approvalBtn" onClick={handleClick}>Aprobar</button>}
      
    </div>
  );
};

export default PetUser;
