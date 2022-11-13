import axios from "axios";
import React, { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import InfoClient from "./InfoClient";
import PetUser from "./PetUser";

const AdminListPetitions = () => {
  const role = useSelector((state) => state.authReducer.role);
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const [pets, setPets] = useState(null);
  const [pendingsPets, setPendingsPets] = useState(null);
  const [approvedPets, setApprovedPets] = useState(null);

  const profileImg = localStorage.getItem("profileImg");
  const getPets = async () => {
    try {
      const { data } = await axios.get(
        "https://property-advice.herokuapp.com/api/adPets/adm",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allPets = data.data;
      const pendings = allPets.filter((item) => item.user.approved !== true);
      const approved = allPets.filter((item) => item.user.approved === true);
      setPets(allPets);
      setPendingsPets(pendings);
      setApprovedPets(approved);
    } catch (err) {}
  };
  useEffect(() => {
    getPets();
  }, [pets]);
  return (
    <div className="adminListContainer">
      <div className="adminListFlex">
        <div className="pendings">
        {reduxExpired?<></>:<div>Pendientes</div>}
          {!reduxExpired && pets ?
            pendingsPets.map((item) => {
              return (
                <div className="" key={item._id}>
                  <PetUser item={item.user} profileImg={profileImg} />
                </div>
              );
            }):<></>}
        </div>

        <div className="approved">
        {reduxExpired?<></>:<div>Aprovadas</div>}

          
          {!reduxExpired && pets?
            pendingsPets.map((item) => {
              return (
                <div className="" key={item._id}>
                  <PetUser item={item.user} profileImg={profileImg} />
                </div>
              );
            }):<></>}
            
        </div>
      </div>
    </div>
  );
};

export default AdminListPetitions;
