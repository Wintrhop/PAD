import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/components/listAllStudies.scss";

const ListallStudies = () => {
  const token = localStorage.getItem("token");
  const [studies, setStudies] = useState(null);
  const [studiesChanged, setStudiesChanged] = useState(null);
  const [pendingStudies, setPendinStudies] = useState(null);
  const [studiesWithAdvice, setStudiesWithAdvice] = useState(null);
  const [textSelector, SetTextSelector] = useState("");
  const [flag, setFlag] = useState(null);

  const getStudies = async () => {
    try {
      const { data } = await axios.get(
        "https://property-advice.herokuapp.com/api/studies",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allStudies = data.data.studies;
      const pendings = allStudies.filter((item) => item.advice === undefined);
      const withAdvice = allStudies.filter((item) => item.advice !== undefined);
      setStudies(allStudies);
      setPendinStudies(pendings);
      setStudiesWithAdvice(withAdvice);
      if (textSelector === "") {
        SetTextSelector("Estudios con respuesta");
      }
      if (flag === null) {
        setFlag(true);
      }

    } catch (err) {
      const err1 = err.response.data;
    }
  };

  useEffect(() => {
    getStudies();
    update();
    // eslint-disable-next-line
  }, [studies]);
  const update = () => {
    if (flag !== null) {
      if (studies && flag) {
        setStudiesChanged(pendingStudies);
      } else if (studies && !flag) {
        setStudiesChanged(studiesWithAdvice);
      }
    }
  };
  const itemsChange = () => {
    if (studies && flag) {
      setStudiesChanged(pendingStudies);
      SetTextSelector("Estudios Pendientes");
      setFlag(false);
    } else {
      setStudiesChanged(studiesWithAdvice);
      SetTextSelector("Estudios con respuesta");
      setFlag(true);
    }
  };
  return (
    <div className="studiesBox">
      {studies ? (
        <div className="studiesContainer">
          <div className="loginAndSign">
            <div className="studiesTitle">Tus solicitudes</div>
            <button
              className="inputDiv cardContainer"
              onClick={() => itemsChange()}
            >
              {textSelector}
            </button>
          </div>
          <div className="cardMapContainer">
            {studiesChanged ? (
              studiesChanged.map((item) => {
                return (
                  <div className="mapCard" key={item._id}>
                    <Card item={item} />
                  </div>
                );
              })
            ) : studies ? (
              studies.map((item) => {
                return (
                  <div className="mapCard" key={item._id}>
                    <Card item={item} />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

export default ListallStudies;
