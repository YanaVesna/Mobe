import React from "react";

import Right from "./Images/right.png";

import style from "./style.scss"

const PageLink = ({text}) => {
	return (
    <div className="link__page">
      <a href="/">Main</a>
      <img src={Right} alt="" />
      <a href="">{text}</a>
    </div>
  );
};

export default PageLink;