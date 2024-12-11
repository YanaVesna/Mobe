import React from "react";

const Button = ({ title, type, className, onClick }) => {
  return (
    <button
      type={type}
      className={`auto-button ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
