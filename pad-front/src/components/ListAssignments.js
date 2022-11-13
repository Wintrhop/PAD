import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/components/listAllStudies.scss";

const ListAssignments = () => {
  const token = localStorage.getItem("token");
  const [assignments, setAssignments] = useState(null);
  const [pendingsAssign, setPendingsAssign] = useState(null);
  const [items, setItems] = useState(null);
  const [itemsChanged, setItemsChanged] = useState(null);
  const [flag, setFlag] = useState(null);
  const [textSelector, SetTextSelector] = useState("");
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
      const createdAdvices = allAssignments.filter(
        (item) => item.advice !== undefined
      );

      setItems(pendingsAssignments);
      setAssignments(createdAdvices);
      setPendingsAssign(pendingsAssignments);

      if (textSelector === "") {
        SetTextSelector("Respuestas creadas");
      }
      if (flag === null) {
        setFlag(true);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getAssignments();
    update();
    // eslint-disable-next-line
  }, [assignments]);
  const update = () => {
    if (items && flag) {
      setItemsChanged(pendingsAssign);
    } else if (items && !flag) {
      setItemsChanged(assignments);
    }
  };
  const itemsChange = () => {
    if (items && flag) {
      setItemsChanged(assignments);
      SetTextSelector("Estudios pendientes");
      setFlag(false);
    } else {
      setItemsChanged(pendingsAssign);
      SetTextSelector("Respuestas creadas");
      setFlag(true);
    }
  };
  return (
    <div className="studiesBox">
      {items ? (
        <div className="formStudy">
          <div className="loginAndSign">
            <div className="studiesTitle">Tus Asignaciones</div>
            <button
              className="inputDiv cardContainer"
              onClick={() => itemsChange()}
            >
              {textSelector}
            </button>
          </div>

          <div className="cardMapContainer">
            {itemsChanged ? (
              itemsChanged.map((item) => {
                return (
                  <div className="mapCard" key={item._id}>
                    <Card item={item} />
                  </div>
                );
              })
            ) : items ? (
              items.map((item) => {
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

export default ListAssignments;
