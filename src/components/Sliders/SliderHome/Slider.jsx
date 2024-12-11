import React, { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";

import slide_1 from "../../../assets/img/slider/banerBGbig2.jpg";
import slide_1s from "../../../assets/img/slider/baner_1.jpg";

import slide_2 from "../../../assets/img/slider/BanerMainBig2.jpg";
import slide_2s from "../../../assets/img/slider/BanerMain2s.png";

import slide_3 from "../../../assets/img/slider/BanerMainBig3.jpg";
import slide_3s from "../../../assets/img/slider/BanerMain3s.jpg";
import slide_1m from "../../../assets/img/slider/mobile1.png";
import slide_2m from "../../../assets/img/slider/Mobile2.jpg";
import slide_3m from "../../../assets/img/slider/Mobile3.jpg";
import slide_1t from "../../../assets/img/slider/Tablet1.jpg";
import slide_2t from "../../../assets/img/slider/Tablet2.jpg";
import slide_3t from "../../../assets/img/slider/Tablet3.jpg";
import {
  CatalogOpenedContext,
  DesktopContext,
  TabletContext,
  MobileContext,
} from "../../../App";

import "./style.scss";

register();

const Slider = () => {
  const swiperElRef = useRef(null);

  const { catalogOpened } = React.useContext(CatalogOpenedContext);
  const { desktop } = React.useContext(DesktopContext);
  const { tablet } = React.useContext(TabletContext);
  const { mobile } = React.useContext(MobileContext);

  const slidesD = [
    {
      src: catalogOpened ? slide_1s : slide_1,
      title: "IPhone 12",
    },
    {
      src: catalogOpened ? slide_2s : slide_2,
      title: "Samsung Galaxy 22",
    },
    {
      src: catalogOpened ? slide_3s : slide_3,
      title: "Samsung Galaxy 22",
    },
  ];

  const slidesT = [
    {
      src: slide_1t,
      title: "IPhone 12",
    },
    {
      src: slide_2t,
      title: "Samsung Galaxy 22",
    },
    {
      src: slide_3t,
      title: "Samsung Galaxy 22",
    },
  ];

  const slidesM = [
    {
      src: slide_1m,
      title: "IPhone 12",
    },
    {
      src: slide_2m,
      title: "Samsung Galaxy 22",
    },
    {
      src: slide_3m,
      title: "Samsung Galaxy 22",
    },
  ];

  const slides = () => {
    if (desktop) {
      return slidesD;
    } else if (tablet) {
      return slidesT;
    } else {
      return slidesM;
    }
  };

  const slidesRender = slides().map(({ src, title, oldPrice, newPrice }, i) => {
    return (
      <swiper-slide key={i}>
        <img src={src} alt={title} />
      </swiper-slide>
    );
  });

  return (
    <div className="swiper__container">
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
        autoplay="true"
        loop="true"
        style={
          catalogOpened && desktop
            ? { marginLeft: 290 }
            : { marginLeft: "auto" }
        }
      >
        {slidesRender}
      </swiper-container>
    </div>
  );
};

export default Slider;
