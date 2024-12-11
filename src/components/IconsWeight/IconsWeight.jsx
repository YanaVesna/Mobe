import React from "react";

import { ReactComponent as Heart } from "./images/weight.svg";
import { ReactComponent as CompareIcon } from "./images/compared.svg"

import "./style.scss";

const IconsWeight = ({ onClick, className, isCompared }) => {
  return (
    <div className={`weight ${className}`} onClick={onClick}>
      <Heart />
      {isCompared && <CompareIcon className="check"/>}
    </div>
  );
};

export default IconsWeight;
