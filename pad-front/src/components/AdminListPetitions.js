import axios from "axios";
import React, { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useSelector } from "react-redux";
import InfoClient from "./InfoClient";
import PetUser from "./PetUser";
import "../styles/components/adminListFlex.scss";

const AdminListPetitions = () => {
  const role = useSelector((state) => state.authReducer.role);
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const [pets, setPets] = useState(null);
  const [pendingsPets, setPendingsPets] = useState(null);
  const [approvedPets, setApprovedPets] = useState(null);
  const [states, setStates] = useState(0);
  const [titles,setTitles]= useState(0)

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
      const pendings = allPets.filter((item) => item.user.approved === false);
      const approved = allPets.filter((item) => item.user.approved === true);

      setPets((pets) => allPets);
      setPendingsPets((pendingsPets) => pendings);
      setApprovedPets((approvedPets) => approved);
    } catch (err) {}
  };
  useEffect(() => {
    getPets();
  }, [states]);

  return (
    <div className="adminListContainer">
      <div className="adminListFlex">
        <div className="petslist pendings">
          {reduxExpired ? (
            <></>
          ) : pendingsPets ? (
            <div className="adminTitle">Pendientes</div>
          ) : (
            <></>
          )}
          {!reduxExpired && pets ? (
            pendingsPets.map((item) => {
              return (
                <div className="petCard cardContainer" key={item._id}>
                  <PetUser
                    setStates={setStates}
                    item={item.user}
                    petition={item}
                    id={item._id}
                    profileImg={profileImg}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>

        <div className="petslist approved">
          {reduxExpired ? (
            <></>
          ) : !approvedPets? (
            <></>
          ) : (
            <div className="adminTitle">Aprobadas</div>
          )}

          {!reduxExpired && approvedPets ? (
            approvedPets.map((item) => {
              return (
                <div className="petCard cardContainer" key={item._id}>
                  <PetUser
                    setStates={setStates}
                    item={item.user}
                    petition={item}
                    id={item._id}
                    profileImg={profileImg}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminListPetitions;
