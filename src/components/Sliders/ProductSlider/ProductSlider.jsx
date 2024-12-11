// ProductSlider.jsx
import React from "react";
import { DesktopContext, MobileContext } from "../../../App.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../../ProductCard/ProductCard";

import "./style.scss";

const ProductSlider = ({ data, onAddToCart, sliderSettings }) => {
  const { desktop } = React.useContext(DesktopContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: desktop ? 3 : 2,
    slidesToScroll: 2,
    ...sliderSettings,
  };

  const filteredCard = false;

  return (
    <Slider {...settings}>
      {data.map((item, index) => (
        <div key={index}>
          <ProductCard
            item={item}
            onAddToCart={onAddToCart}
            filteredCard={filteredCard}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
