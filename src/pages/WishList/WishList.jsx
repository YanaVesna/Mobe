import React, { useEffect, useState } from "react";
import MyRating from "../../components/MyRating/MyRating";
import IconsHeart from "../../components/IconsHeart/IconsHeart";
import { fetchProducts } from "../../actions/productActions";
import { ReactComponent as Close } from "../ComparePage/images/close.svg";
import { ReactComponent as Left } from "./Images/left.svg";
import Title from "../../components/Title/Title";
import Image from "./Images/1.png";
import AdminLink from "../../components/AdminLink/AdminLink";
import Chat from "../../components/Chat/Chat";
import Subscribe from "../../components/Subscribe/Subscribe";
import HotPriceContainer from "../../Containers/HotPrice/HotPriceContainer";
import Btn from "../../components/Btn/Btn";
import MoreBtn from "../../components/IconMore/IconMore";
import { removeLikedProduct } from "../../redux/slices/wishlistSlice";
import Button from "../../components/Button";
import Catalog from "../../components/Catalog/Catalog.jsx";
import { CatalogOpenedContext } from "../../App.js";
import ErrorBoundary from "../../components/ErrorBoundary";

import { useDispatch, useSelector } from "react-redux";

import "./style.scss";

const WishList = () => {
  const { catalogOpened } = React.useContext(CatalogOpenedContext);

  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );
  console.log("likedProducts", likedProducts);
  const handleRemoveButtonClick = (productId) => {
    dispatch(removeLikedProduct(productId));
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isContentHidden, setIsContentHidden] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTitleClick = () => {
    setIsContentHidden(!isContentHidden);
  };

  return (
    <div className="wish-list__section">
      <div className="wish-list__container">
        {catalogOpened && (
          <ErrorBoundary>
            <Catalog />
          </ErrorBoundary>
        )}
        <div className={`wish-list__admin ${isContentHidden ? "visible" : ""}`}>
          <h2>Hello, USER</h2>
          <div className="wish-list__admin_inner">
            <AdminLink />
          </div>
        </div>
        <div
          className={`wish-list__content ${isContentHidden ? "hidden" : ""}`}
        >
          <div onClick={handleTitleClick} className="wish-list__title">
            <div className="title-inner">
              <Left />
              <Title text="Wish list" />
            </div>
          </div>
          <div className="wish-list__box">
            {likedProducts.length > 0 ? (
              likedProducts.map((product) => (
                <div className="wish-list__card" key={product.id}>
                  <MoreBtn />
                  <div className="wish-list__close">
                    <button
                      className="wish-list__clear-btn"
                      onClick={() => handleRemoveButtonClick(product.id)}
                    >
                      <Close />
                    </button>
                  </div>

                  <div className="wish-list__inner">
                    <div className="wish-list__card-photo">
                      <img src={Image} alt="" />
                    </div>

                    <div className="wish-flex">
                      <div className="wish-list__card-content">
                        <div className="wish-list__card-title">
                          {product.name}
                        </div>
                        <div className="wish-list__card rating">
                          <MyRating />
                          <div className="rating__revews">198 відгуків</div>
                        </div>
                      </div>
                      <div className="wish-list__price">
                        <div className="wish-list__price-inner">
                          <div className="wish-list__card-oldprice">
                            250.99$
                          </div>
                          <div className="wish-list__card-newprice">
                            {product.price}$
                          </div>
                        </div>
                        {windowWidth >= 490 ? (
                          <Button type="violet" title="Add to cart" />
                        ) : (
                          <Btn />
                        )}
                      </div>
                    </div>
                    <IconsHeart
                      className={`heart-wish ${product.like ? "selected" : ""}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="wish-list__absence">Відсутні товари</div>
            )}
          </div>
        </div>
      </div>
      <HotPriceContainer className="wish-hotprice" />
      <Chat className="wish-chat" />
      <Subscribe className="wish__sub" />
    </div>
  );
};

export default WishList;
