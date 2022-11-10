import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "@mantine/core";
import Card from "./Card";


const ListallStudies = () => {
    const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const token = localStorage.getItem("token");
  const [studies, setStudies]= useState(null);
  const getStudies = async()=>{
    try {
        const { data } = await axios.get(
          'https://property-advice.herokuapp.com/api/studies',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setStudies(data.data.studies)
      } catch (err) {
        console.log(err.response.data)
      }
    };
    
    

  useEffect(() => {
    getStudies();
    // eslint-disable-next-line
  }, [studies]);
  return (
    <div className="studiesContainer">
        {studies?
            studies.map((item)=>{
                return(
                    <div className="mapCard" key={item._id}>
                        <Card item={item}/>
                    </div>
                )
            })

            
        :<span/>}
    </div>
  )
}

export default ListallStudies