import React from "react";
import "./slider.scss";
import { Carousel } from "antd";
import { sliderItems } from "../../../constants/slideItem";
function SliderCarousel() {
  return (
    <div className="sliderCarousel">
      <Carousel autoplay>
        {sliderItems.map((item, index) => {
          return (
            <div className="sliderItem" key={item.id}>
              <p>
                <img src={`${item.img}`} alt="" />
              </p>
              <p className="sliderTile">{item.title}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default SliderCarousel;
