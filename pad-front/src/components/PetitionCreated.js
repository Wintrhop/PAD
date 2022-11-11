import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRole } from "../store/reducer/authReducer";

const PetitionCreated = ({ setPetAlreadyCreated, petAlreadyCreated }) => {
  const token = localStorage.getItem("token");
  const dispatch= useDispatch();
  const reduxExpired = useSelector((state) => state.authReducer.isExpired);
  const peticionCreated = async () => {
    try {
      const { data } = await axios.get(
        "https://property-advice.herokuapp.com/api/adPets/userPet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPetAlreadyCreated(data.data.advicerPetition);
      dispatch(changeRole(data.data.role));
      
    } catch (err) {
      console.log(err.response.data);
      setPetAlreadyCreated(null);
    }
  };
  
  useEffect(() => {
    if (!reduxExpired) {
      peticionCreated();
    }
    
  }, [petAlreadyCreated, reduxExpired]);
  
  return <></>;
};

export default PetitionCreated;
