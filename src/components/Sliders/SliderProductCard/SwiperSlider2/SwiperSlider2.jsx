import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import silverVertical from "../silverVertical.js";
import silverBig from "../silverBig.js";
import blackVertical from "../blackVertical.js";
import blackBig from "../blackBig.js";
import purpleVertical from "../purpleVertical.js";
import purpleBig from "../purpleBig.js";

import "./style2.scss";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function SwiperSlider({ colorActive }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const colorSlides = () => {
    if (colorActive === 1) {
      return purpleVertical;
    } else if (colorActive === 2) {
      return blackVertical;
    } else {
      return silverVertical;
    }
  };

  const colorSlidesBig = () => {
    if (colorActive === 1) {
      return purpleBig;
    } else if (colorActive === 2) {
      return blackBig;
    } else {
      return silverBig;
    }
  };

  const slidesRender = colorSlides().map((ob, i) => {
    return (
      <SwiperSlide key={i}>
        <img className="slide-images2" src={ob.src} alt="slide" />
      </SwiperSlide>
    );
  });

  const slidesRenderBig = colorSlidesBig().map((ob, i) => {
    return (
      <SwiperSlide key={i}>
        <img className="slide-images2" src={ob.src} alt="slide" />
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="slide-box">
        {/* Slider big  */}

        <Swiper
          style={{
            "--swiper-navigation-color": "#28003e",
            "--swiper-pagination-color": "#28003e",
          }}
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper3"
        >
          {slidesRenderBig}
        </Swiper>
      </div>

      {/* Slider small gorizontal */}

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slidesRender}
      </Swiper>
    </>
  );
}
