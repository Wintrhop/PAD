import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/components/listAllStudies.scss";

const ListallStudies = () => {
  const token = localStorage.getItem("token");
  const [studies, setStudies] = useState(null);
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
      setStudies(data.data.studies);
    } catch (err) {
      const err1 = err.response.data;
    }
  };

  useEffect(() => {
    getStudies();
    // eslint-disable-next-line
  }, [studies]);
  return (
    <div className="studiesBox">
      {studies ? (
        <div className="studiesContainer">
          <div className="studiesTitle">Tus Solicitudes</div>
          <div className="cardMapContainer">
            {studies.map((item) => {
              return (
                <div className="mapCard" key={item._id}>
                  <Card item={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
};

export default ListallStudies;
