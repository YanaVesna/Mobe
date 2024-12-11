import React from "react";

import { ReactComponent as Heart } from "./images/heart.svg";

import "./style.scss";

const IconsHeart = ({ onClick, className, selected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={`heart ${className} ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      <Heart />
    </div>
  );
};

export default IconsHeart;
