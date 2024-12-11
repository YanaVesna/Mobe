import React from "react";

import Login from "./Images/login.svg";

import "./style.scss";

const AdminExit = () => {
  return (
   
      <a className="admin-exit" href="/">
        <img src={Login} alt="Exit" />
        <p>Go out</p>
      </a>
   
  );
};

export default AdminExit;
