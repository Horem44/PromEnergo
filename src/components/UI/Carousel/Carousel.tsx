import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import classes from "./Carousel.module.css";

import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpeg";


const items = [
    <div className={classes.carousel_container}>
      <img className={classes.carousel_img} src={img1} alt='img'/>
    </div>,
    <div className={classes.carousel_container}>
        <img className={classes.carousel_img} src={img2} alt='img'/>
    </div>,
    <div className={classes.carousel_container}>
        <img className={classes.carousel_img} src={img3} alt='img'/>
    </div>
]

const Carousel = () => (
  <AliceCarousel
    autoPlay={true}
    autoPlayInterval={5000}
    autoPlayStrategy="none"
    infinite
    mouseTracking
    items={items}
  />
);

export default Carousel;
