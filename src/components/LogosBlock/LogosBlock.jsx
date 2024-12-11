import React from "react";

import "../../scss/components/_logosBlock.scss";
import { useNavigate } from "react-router-dom";

import apple from "../../assets/img/logos/Apple.svg";
import samsung from "../../assets/img/logos/Samsung.svg";
import mi from "../../assets/img/logos/xiaomi.svg";
import motorola from "../../assets/img/logos/motorola.svg";
import nokia from "../../assets/img/logos/nokia.svg";

import appleMobile from "../../assets/img/logos/AppleMobile.svg";
import samsungMobile from "../../assets/img/logos/SamsungMobile.svg";
import miMobile from "../../assets/img/logos/xiaomiMobile.svg";
import motorolaMobile from "../../assets/img/logos/motorolaMobile.svg";
import nokiaMobile from "../../assets/img/logos/nokiaMobile.svg";

import { MobileContext } from "../../App";

const logosItem = [
  {
    src: apple,
    title: "Apple",
  },
  {
    src: samsung,
    title: "Samsung",
  },
  {
    src: mi,
    title: "Xiaomi",
  },
  {
    src: motorola,
    title: "Motorola",
  },
  {
    src: nokia,
    title: "Nokia",
  },
];

const logosItemMobile = [
  {
    src: appleMobile,
    title: "Apple",
  },
  {
    src: samsungMobile,
    title: "Samsung",
  },
  {
    src: miMobile,
    title: "Xiaomi",
  },
  {
    src: motorolaMobile,
    title: "Motorola",
  },
  {
    src: nokiaMobile,
    title: "Nokia",
  },
];

const LogosBlock = () => {
  const { mobile } = React.useContext(MobileContext);
  const navigate = useNavigate();

  const logos = () => {
    if (mobile) {
      return logosItemMobile;
    } else {
      return logosItem;
    }
  };

  const getFilterPage = (label, page, series) => {
    navigate(`/product-page/${label}/${page}/${series}`);
  };

  const logosRender = logos().map(({ src, title }, i) => {
    return (
      <li key={i}>
        <a href="##">
          <img
            onClick={() => getFilterPage(title, "sortBrand")}
            src={src}
            alt={title}
          />
        </a>
      </li>
    );
  });

  return (
    <div className="swiper__container">
      <div className="logos__block">
        <ul>{logosRender}</ul>
      </div>
    </div>
  );
};

export default LogosBlock;
