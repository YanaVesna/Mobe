import React from "react";
import "./style.scss";

import User from "./Images/user.svg";
import Order from "./Images/order.svg";
import Icon from "./Images/Icon.svg";
import AdminExit from "../AdminExit/AdminExit";

const AdminLink = () => {
  return (
    <>
      <div className="admin-panel">
        <a className="admin-link" href="/personal-data">
          <img src={User} alt="" />
          <p>Personal data</p>
        </a>
        <a className="admin-link" href="#">
          <img src={Order} alt="" />
          <p>My orders</p>
        </a>
        <a className="admin-link" href="/wishlist">
          <img src={Icon} alt="" />
          <p>Wish list</p>
        </a>
      </div>
      <AdminExit />
    </>
  );
};

export default AdminLink;
