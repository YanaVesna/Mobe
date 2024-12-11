import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Chats } from "./Image/chat.svg";

import "./style.scss";

const Chat = ({ onClick, className, selected }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link to="/order-page">
      <div className="chat__container">
        <div className="chat__cont">
          <div
            className={`chat ${className} ${selected ? "selected" : ""}`}
            onClick={handleClick}
          >
            <Chats />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Chat;
