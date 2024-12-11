import React from "react";
import fotoDesktop from "./image.jpg";
import fotoTablet from "../../assets/img/imageTab.jpg";
import fotoMobile from "../../assets/img/imageMob.jpg";
import Button from "../Button.jsx";
import "./style.scss";
import { DesktopContext, MobileContext } from "../../App.js";
import IconsHeart from "../IconsHeart/IconsHeart";
import IconsWeight from "../IconsWeight/IconsWeight";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartAdd";
import {
  addLikedProduct,
  removeLikedProduct,
} from "../../redux/slices/wishlistSlice";
import {
  addComparedProduct,
  removeComparedProduct,
} from "../../redux/slices/compareSlice";

function ProductsCart({ id, name, active }) {
  const dispatch = useDispatch();

  const { desktop } = React.useContext(DesktopContext);
  const { mobile } = React.useContext(MobileContext);

  const characteristic = useSelector(
    (state) => state.cardReducer.characteristics
  );

  const analog = useSelector((state) => state.cardReducer.analog);

  const getNameProduct = () => {
    if (active === 1) {
      return `${characteristic.name} ${
        characteristic.built_in_memory === undefined ||
        characteristic.built_in_memory === null
          ? ""
          : characteristic.built_in_memory
      } ${
        characteristic.color === undefined || characteristic.color === null
          ? ""
          : characteristic.color
      }`;
    } else {
      return `${analog.name} ${
        analog.built_in_memory === undefined || analog.built_in_memory === null
          ? ""
          : analog.built_in_memory
      } ${
        analog.color === undefined || analog.color === null ? "" : analog.color
      }`;
    }
  };

  const getPriceProduct = () => {
    if (active === 1) {
      return `${
        characteristic.price === undefined || characteristic.price === null
          ? ""
          : characteristic.price
      }`;
    } else {
      return `${
        analog.price === undefined || analog.price === null ? "" : analog.price
      }`;
    }
  };

  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  const items = () => {
    if (active === 1) {
      return characteristic;
    } else {
      return analog;
    }
  };

  const item = items();

  const isWishlisted =
    item && likedProducts.some((product) => product === item);

  const handleUnlike = () => {
    dispatch(removeLikedProduct(item.id));
  };

  const handleLike = () => {
    dispatch(addLikedProduct(item));
  };

  const comparedProducts = useSelector(
    (state) => state.comparedProducts.comparedProducts
  );

  const isCompareProducts =
    item && comparedProducts.some((product) => product === item);

  const handleCompare = () => {
    dispatch(addComparedProduct(item));
  };
  const handleUnCompare = () => {
    dispatch(removeComparedProduct(item.id));
  };

  const addIntoCart = () => {
    const itemCart = {
      id: item.id,
      title: item.name,
      price: item.price,
      img: fotoDesktop,
    };
    dispatch(addItem(itemCart));
  };

  return (
    <>
      {desktop ? (
        <div className="productscart">
          <div className="productscart__b">
            <div className="productscart__korb">
              <img src={fotoDesktop} alt="img" />
              <div className="productscart__svg">
                <IconsHeart
                  className={`heart-product ${isWishlisted ? "selected" : ""}`}
                  onClick={isWishlisted ? handleUnlike : handleLike}
                />

                <IconsWeight
                  onClick={isCompareProducts ? handleUnCompare : handleCompare}
                  className="weght-product"
                />
              </div>
            </div>
            <div className="productscart__rating-box">
              <div className="productscart__title-box">
                <p>{getNameProduct()}</p>
                <div className="productscart__rating">
                  <div className="productscart__rating-stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFE500"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFE500"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFE500"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFE500"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                    >
                      <path
                        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                        fill="#FFE500"
                      />
                    </svg>
                  </div>
                  <span>132 reviews</span>
                </div>
              </div>
              <div className="productscart__price">
                <p>$ {getPriceProduct()}</p>
                <Button
                  type="violet"
                  title="Add to order"
                  onClick={addIntoCart}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="productscart__Tablet">
          <div className="productscart__image_title">
            <img src={mobile ? fotoMobile : fotoTablet} alt="img" />
            {!mobile ? <p>{getNameProduct()}</p> : ""}
          </div>

          <div className="productscart__price">
            <p>$ {getPriceProduct()}</p>
            <Button type="violet" title="Add to order" onClick={addIntoCart} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsCart;
