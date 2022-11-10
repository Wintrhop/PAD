import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import React from "react";

const Card = ({ item }) => {
    const theme = useMantineTheme();
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
      <div><span>{item.createdAt}</span></div>
      {item.advice && <div><span>{item.advice}</span></div>}
    </div>
  );
};

export default Card;
