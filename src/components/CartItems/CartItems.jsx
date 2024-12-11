import React, { useRef, useEffect } from "react";
import { MobileContext } from "../../App.js";
import { useDispatch, useSelector } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartAdd.js";
import useOutsideClick from "../../utils/useOutsideClick.jsx";

import {
  addLikedProduct,
  removeLikedProduct,
} from "../../redux/slices/wishlistSlice.js";
import IconsHeart from "../IconsHeart/IconsHeart.jsx";
import iconDelete from "./Images/iconDelete.svg";
import OpenPoints from "../OpenPoints/OpenPoints.jsx";

const CartItems = ({ item }) => {
  const { mobile } = React.useContext(MobileContext);
  const [openMenuDelete, setOpenMenuDelete] = React.useState(false);
  const dispatch = useDispatch();

  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  const isWishlisted =
    item && likedProducts.some((product) => product.id === item.id);

  const handleLike = () => {
    dispatch(addLikedProduct(item));
  };

  const handleUnlike = () => {
    dispatch(removeLikedProduct(item.id));
  };

  const onClickPlus = () => {
    if (item.count >= 0) {
      setActiveMinusCount(true);
    }
    dispatch(addItem(item));
  };

  const [activeMinusCount, setActiveMinusCount] = React.useState(true);

  useEffect(() => {
    if (item.count === 1) {
      setActiveMinusCount(false);
    } else {
      setActiveMinusCount(true);
    }
  }, [item.count, dispatch, item.id]);

  const onClickMinus = () => {
    if (activeMinusCount === true) {
      dispatch(minusItem(item));
    }
  };

  const onClickDelete = () => {
    if (item.buytogether === undefined) {
      if (window.confirm("Are you sure you want to delete it?")) {
        dispatch(removeItem(item));
      }
    } else {
      if (
        window.confirm("Are you sure you want to remove the accessory kit?")
      ) {
        dispatch(removeItem(item));
      }
    }
  };

  const wrapRef = useRef(null);

  const closeContacts = () => {
    setOpenMenuDelete(false);
  };

  useOutsideClick(wrapRef, closeContacts);

  return (
    <div className="shoppingcart__up">
      <div className="shoppingcart__up__box">
        <div className="shoppingcart__img">
          <img src={mobile ? item.img : item.img} alt="img" />
        </div>
        <div className="shoppingcart__add">
          <label>{item.title}</label>
          <div className="shoppingcart__plusminus">
            {activeMinusCount ? (
              <svg
                onClick={onClickMinus}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M5 13V11H19V13H5Z" fill="#28003E" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M5 13V11H19V13H5Z" fill="#747474" />
              </svg>
            )}
            <div className="shoppingcart__number">{item.count}</div>
            <svg
              onClick={onClickPlus}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                fill="#28003E"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="shoppingcart__summDelete">
        <div
          className="shoppingcart__delete"
          style={
            openMenuDelete === false ? { display: "none" } : { display: "flex" }
          }
          ref={wrapRef}
        >
          <div
            className="delete-box1"
            onClick={isWishlisted ? handleUnlike : handleLike}
          >
            <IconsHeart
              className={`heart-card ${isWishlisted ? "selected" : ""}`}
            />
            <p>Add to favourite</p>
          </div>
          <div className="delete-box2" onClick={onClickDelete}>
            <img src={iconDelete} alt="to delete" />
            <p>Delete</p>
          </div>
        </div>
        <div
          style={
            openMenuDelete === true ? { display: "none" } : { display: "flex" }
          }
          onClick={() => setOpenMenuDelete(true)}
        >
          <OpenPoints />
        </div>
        <div className="shoppingcart__summs">
          <div className="shoppingcart__summ1">{item.count * item.price}</div>
          <div className="shoppingcart__summ2">
            {(item.count * item.price * 0.9).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
