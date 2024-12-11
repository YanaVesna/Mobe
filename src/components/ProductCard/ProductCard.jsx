import React, { useRef } from "react";
import MyRating from "../MyRating/MyRating";
import Button from "../Button";
import IconsHeart from "../IconsHeart/IconsHeart";
import IconsWeight from "../IconsWeight/IconsWeight";
import addtoShopping from "./Images/iconShopping.svg";
import { ReactComponent as Close } from "./Images/X.svg";
import { ReactComponent as Alert } from "./Images/alert.svg";
import navigateToProductCard from "../../utils/navigateToProductCard.jsx";
import { useLocation } from "react-router-dom";
import { MobileContext } from "../../App.js";
import OpenPoints from "../OpenPoints/OpenPoints.jsx";
import useOutsideClick from "../../utils/useOutsideClick.jsx";

import {
  addLikedProduct,
  removeLikedProduct,
} from "../../redux/slices/wishlistSlice";

import { useDispatch, useSelector } from "react-redux";

import { addItem } from "../../redux/slices/cartAdd";

import Image from "./Images/image.jpg";
import ImageMobile from "./Images/blackDesktop.jpg";
import "./style.scss";
import { useNavigate } from "react-router-dom";

import {
  addComparedProduct,
  removeComparedProduct,
} from "../../redux/slices/compareSlice";
import { hidePopup } from "../../redux/slices/compareSlice";

const ProductCard = ({ item, filteredCard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenuDelete, setOpenMenuDelete] = React.useState(false);

  const { mobile } = React.useContext(MobileContext);

  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );
  const comparedProducts = useSelector(
    (state) => state.comparedProducts.comparedProducts
  );
  const showPopup = useSelector((state) => state.comparedProducts.showPopup);
  const handleHidePopup = () => {
    dispatch(hidePopup());
  };
  const isCompareProducts =
    item && comparedProducts.some((product) => product === item);

  const handleCompare = () => {
    dispatch(addComparedProduct(item));
  };
  const handleUnCompare = () => {
    dispatch(removeComparedProduct(item.id));
  };

  const isWishlisted =
    item && likedProducts.some((product) => product === item);

  const handleLike = () => {
    dispatch(addLikedProduct(item));
  };

  const handleUnlike = () => {
    dispatch(removeLikedProduct(item.id));
  };

  const addIntoCart = () => {
    const itemCart = {
      id: item.id,
      title: item.name,
      price: item.price,
      img: Image,
    };
    dispatch(addItem(itemCart));
  };

  const products = useSelector((state) => state.products.products);

  const navigateCard = (item) => {
    navigateToProductCard(dispatch, navigate, item, products);
  };

  console.log(location.pathname === "/product-page" && mobile && filteredCard);

  const wrapRef = useRef(null);
  const closeContacts = () => {
    setOpenMenuDelete(false);
  };
  useOutsideClick(wrapRef, closeContacts);

  return (
    <div className="section__card">
      {location.pathname === "/product-page" && mobile && filteredCard ? (
        <div className="section__innerMobile">
          <div
            onClick={() => navigateCard({ ...item })}
            className="section__card-photoMobile"
          >
            <img src={ImageMobile} alt="" />
          </div>
          <div
            className="shoppingcart__delete"
            style={
              openMenuDelete === false
                ? { display: "none" }
                : { display: "flex" }
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
            <div
              className="delete-box1"
              onClick={isWishlisted ? handleUnlike : handleLike}
            >
              <IconsWeight
                onClick={isCompareProducts ? handleUnCompare : handleCompare}
                /* className="weght-product" */
                isCompared={isCompareProducts}
              />
              <p>Add to comparison</p>
            </div>
          </div>
          <div className="section__description-box">
            {" "}
            <div className="section__card-content-box">
              <div
                className="section__points-box"
                style={
                  openMenuDelete === true
                    ? { display: "none" }
                    : { display: "flex" }
                }
                onClick={() => setOpenMenuDelete(true)}
              >
                <OpenPoints />
              </div>
              <div className="section__card-contentMobile">
                <div className="section__card-titleMobile">{item.name}</div>

                <div className="section__card-rating">
                  <MyRating />
                  <div className="rating__revewsMobile">198 reviews</div>
                </div>
              </div>
            </div>
            <div className="section__price">
              <div className="promotion__price-inner">
                <div
                  className={
                    item.is_promotion === 1 ? "section__card-oldprice" : ""
                  }
                >
                  $ {item.price}
                </div>
                <div
                  className="section__card-newprice"
                  style={
                    item.is_promotion === 1
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  $ {parseFloat((item.price * 0.95).toFixed(0))}
                </div>
              </div>
              <div
                className="section__buttonAddToShopping"
                onClick={addIntoCart}
              >
                <img src={addtoShopping} alt="add to shopping" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="section__inner">
          <div
            onClick={() => navigateCard({ ...item })}
            className="section__card-photo"
          >
            <img src={Image} alt="" />
          </div>
          <div className="section__card-content-box">
            <div className="section__card-content">
              <div className="section__card-title">{item.name}</div>

              <div className="section__card rating">
                <MyRating />
                <div className="rating__revews">198 reviews</div>
              </div>
            </div>
          </div>
          <div className="section__price">
            <div className="promotion__price-inner">
              <div
                className={
                  item.is_promotion === 1 ? "section__card-oldprice" : ""
                }
              >
                $ {item.price}
              </div>
              <div
                className="section__card-newprice"
                style={
                  item.is_promotion === 1
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                $ {parseFloat((item.price * 0.95).toFixed(0))}
              </div>
            </div>
            <Button type="violet" title={"Add to Cart"} onClick={addIntoCart} />
          </div>
          <IconsHeart
            className={`heart-product ${isWishlisted ? "selected" : ""}`}
            onClick={isWishlisted ? handleUnlike : handleLike}
          />

          <IconsWeight
            onClick={isCompareProducts ? handleUnCompare : handleCompare}
            className="weght-product"
            isCompared={isCompareProducts}
          />
        </div>
      )}

      {showPopup && (
        <div className="popup__compare">
          <button className="popup-btn" onClick={handleHidePopup}>
            <Close />
          </button>
          <div className="popup__content">
            <Alert />
            <p>Only two products can be added to the comparison list</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
