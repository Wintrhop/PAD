import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/components/listAllStudies.scss";

const ListAssignments = () => {
  const token = localStorage.getItem("token");
  const [assignments, setAssignments] = useState(null);
  const[pendingsAssign, setPendingsAssign]= useState(null);
  const getAssignments = async () => {
    try {
      const { data } = await axios.get(
        "https://property-advice.herokuapp.com/api/studies/advicer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allAssignments = data.data.studiesAssignment;
      const pendingsAssignments = allAssignments.filter(
        (item) => item.advice === undefined
      );

      setAssignments(allAssignments);
      setPendingsAssign(pendingsAssignments);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getAssignments();
    // eslint-disable-next-line
  }, [assignments]);
  return (
    <div className="studiesBox">
      {pendingsAssign ? (
        <div className="studiesContainer">
          <div className="studiesTitle">Tus Asignaciones</div>
          <div className="cardMapContainer">
            {pendingsAssign.map((item) => {
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

export default ListAssignments;
