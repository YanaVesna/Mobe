import React from "react";

import Image from "./Image/2.png"

import style from "./style.scss"

const Btn = () => {
    return (
        <>
        <button className="custom-btn">
         <img src={Image} alt="" />
        </button>
        
        </>
        
    );
};
export default Btn;