import { Carousel } from "@mantine/carousel";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/card.scss"

const Card = ({ item }) => {
  
  const navigate = useNavigate();
    const toDate = new Date(item.createdAt);
    const date = toDate.toLocaleDateString("es-CO", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return (
      <div className="cardContainer" >
        <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators height={200}>
          <Carousel.Slide>
          <button className="cardBtn" onClick={()=>navigate(`/study/${item._id}`)}>
            <img  className="cardImg" src={item.tradLib} alt="tradicionLib"></img> </button>
          </Carousel.Slide>
          <Carousel.Slide>
          <button className="cardBtn" onClick={()=>navigate(`/study/${item._id}`)}>
            <img className="cardImg" src={item.mayorExtension} alt="mayorExtension"></img></button>
          </Carousel.Slide>
          <Carousel.Slide>
          <button className="cardBtn" onClick={()=>navigate(`/study/${item._id}`)}>
            <img className="cardImg" src={item.escritura} alt="escritura"></img></button>
          </Carousel.Slide>
          <Carousel.Slide>
          <button className="cardBtn" onClick={()=>navigate(`/study/${item._id}`)}>
            <img className="cardImg" src={item.regPropHorizontal} alt="regPropHorizontal"></img></button>
          </Carousel.Slide>
        </Carousel>
        <button className="cardBtn" onClick={()=>navigate(`/study/${item._id}`)}>
        <div>
          <span>{`Creado el ${date}`}</span>
        </div>
        {item.advice ? (
          <div>
            <span>{item.advice}</span>
          </div>
        ) : (
          <span>pendiente</span>
        )}  
        </button>
        
      </div>)
};

export default Card;
