import { Carousel } from "@mantine/carousel";
import React from "react";
import "../styles/components/card.scss"

const  CardPrev = ({ item }) => {
    return (
        <div className="cardContainer" >
          <Carousel sx={{ maxWidth: 320 }} mx="auto" withIndicators height={200}>
            <Carousel.Slide>
            <button className="cardBtn" >
              <img  className="cardImg" src={item.tradLib} alt="tradicionLib"></img> </button>
            </Carousel.Slide>
            <Carousel.Slide>
            <button className="cardBtn" >
              <img className="cardImg" src={item.mayorExt} alt="mayorExtension"></img></button>
            </Carousel.Slide>
            <Carousel.Slide>
            <button className="cardBtn" >
              <img className="cardImg" src={item.escritura} alt="escritura"></img></button>
            </Carousel.Slide>
            <Carousel.Slide>
            <button className="cardBtn" >
              <img className="cardImg" src={item.regPropHo} alt="regPropHorizontal"></img></button>
            </Carousel.Slide>
          </Carousel>
          
        </div>
      )
}

export default  CardPrev