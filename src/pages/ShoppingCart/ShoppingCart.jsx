import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartActiveContext } from "../../App.js";
import Button from "../../components/Button.jsx";
import SliderCart from "../../components/Sliders/SliderCart/SliderCart.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartIsEmpty from "../CartIsEmpty.jsx";
import "./style.scss";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  const { items, totalPrice } = useSelector((state) => state.cartAdd);
  const { setShoppingCartActive } = React.useContext(ShoppingCartActiveContext);

  const wrapRef = useRef(null);

  const handClick = (event) => {
    if (wrapRef.current && !wrapRef.current.contains(event.target))
      setShoppingCartActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handClick);
    return () => {
      document.removeEventListener("mousedown", handClick);
    };
  }, []);

  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(totalPrice);
      localStorage.setItem("totalPrice", json);
    }
    isMounted.current = true;
  }, [totalPrice]);

  return (
    <div className="shoppingcart__container">
      <div className="shoppingcart__window" ref={wrapRef}>
        <div className="shoppingcart__krestik">
          <a href="close">
            <svg
              onClick={() => {
                setShoppingCartActive(false);
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_258_7121)">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_258_7121">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <div className="shoppingcart__box">
          {items.length > 0 ? (
            <>
              <div className="shoppingcart__cart">
                <h4>Shopping cart</h4>

                {items.map((item) => (
                  <CartItems item={item} key={item.id} {...item} />
                ))}

                <div className="shoppingcart__down">
                  <Button type="white" title="Continue shopping" />
                  <div className="shoppingcart__down-summ">
                    <h5>$ {parseFloat((totalPrice * 0.9).toFixed(2))}</h5>
                    <Button type="violet" title="Complete the order" />
                  </div>
                </div>
              </div>
              <div className="shoppingcart__cheaper">
                <h5>Together it's cheaper</h5>
                <SliderCart />
              </div>
            </>
          ) : (
            <CartIsEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
