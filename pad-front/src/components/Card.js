import { Carousel } from "@mantine/carousel";
import React from "react";

const Card = ({ item }) => {
  const toDate = new Date(item.createdAt);
  const date = toDate.toLocaleDateString("es-CO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="cardContainer">
      <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators height={200}>
        <Carousel.Slide>
          <img src={item.tradLib} alt="tradicionLib"></img>
        </Carousel.Slide>
        <Carousel.Slide>
          <img src={item.mayorExtension} alt="mayorExtension"></img>
        </Carousel.Slide>
        <Carousel.Slide>
          <img src={item.escritura} alt="escritura"></img>
        </Carousel.Slide>
        <Carousel.Slide>
          <img src={item.regPropHorizontal} alt="regPropHorizontal"></img>
        </Carousel.Slide>
      </Carousel>
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
    </div>
  );
};

export default Card;
