import React from "react";
import "../styles/components/modalPet.scss";
import InfoClient from "./InfoClient";
import LogoButton from "./LogoButton";

const ModalPet = ({
  setOpenedPet,
  setClick,
  approved,
  user,
  petition,
  profileImg1,
}) => {
  const userCreated = new Date(user.createdAt);
  const userCreatedDate = userCreated.toLocaleDateString("es-CO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const petitionCreated = new Date(petition.createdAt);
  const petitionCreatedDate = petitionCreated.toLocaleDateString("es-CO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  let approvedDate;
  let advicesCreated;
  let studiesCreated;
  if (petition.approvedBy !== undefined) {
    const dateAproved = new Date(petition.updatedAt);
    approvedDate = dateAproved.toLocaleDateString("es-CO", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (user.advices.length !== 0) {
    advicesCreated = user.advices.length;
  }
  if (user.studies.length !== 0) {
    studiesCreated = user.studies.length;
  }
  console.log('advices',user.advices)
  return (
    <div className="modalPetContainer">
      <div className="headerSections">
        <div className="rentSection">
          <button
            className="descriptionBtn"
            onClick={() => setOpenedPet(false)}
          >
            <svg
              className="descSvg"
              viewBox="0 0 18 18"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
            </svg>
          </button>
        </div>
        <LogoButton />
      </div>
      <div className="offersflex">
                <div className="whatWeOffer">Rol:</div>
                <div className="offerText">{user.role}</div>
              </div>

      <div className="dateContainer1" >
        <div className="infoClientModal">
          <InfoClient
            profileImg={profileImg1}
            name={user.name}
            email={user.email}
          />
        </div>

        <div className="date1">{`Usuario creado el ${userCreatedDate}`}</div>
      </div>
      <div className="modalTarjeta">Tarjeta Profesional</div>
      <img
        className="studyImgRend"
        src={petition.certificate}
        alt="certificate"
      ></img>
      <div className="datesFlex">
        <div className="petsDatesContainer">
          <div className="petDate">{`Peticion creada el ${petitionCreatedDate}`}</div>
          {approvedDate && (
            <>
              <div className="petDate">{`Peticion aprobada el ${approvedDate}`}</div>
            </>
          )}
        </div>
        <div className="petsDatesContainer">
          {studiesCreated && (
            <div className="petDate">{`Estudios Solicitados: ${studiesCreated}`}</div>
          )}
          {advicesCreated && (
            <>
              <div className="petDate">{`Advices Creados: ${advicesCreated}`}</div>
            </>
          )}
        </div>
      </div>

      {!approved && (
        <button className="approvalBtn" onClick={setClick}>
          Aprobar
        </button>
      )}
    </div>
  );
};

export default ModalPet;
