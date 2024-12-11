import React from "react";

import { ReactComponent as MoreAs } from "./Image/more.svg";

import style from "./style.scss";

const MoreBtn = () => {
    return (
        <>
         <div className="more-btn"><MoreAs/></div>
        </>
    );
};

export default MoreBtn;