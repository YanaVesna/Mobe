import React from "react";
import GoBack from "../components/GoBack";

const CartIsEmpty = () => {
  return (
    <div className="empty">
      <div className="empty__text">
        <h2>Your shopping cart is empty!</h2>
      </div>
    </div>
  );
};

export default CartIsEmpty;
