import React from "react";

import style from "./style.scss"

const Title = ({ text, className }) => {
    return (
        <h3 className={`title ${className}`}>{text}</h3>
    ) 
}

export default Title;
