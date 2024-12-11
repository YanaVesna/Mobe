import React, { useRef, useState, useEffect } from "react";
import MyRating from "../../components/MyRating/MyRating.jsx";
import getSort from "../../utils/getSort.jsx";

import Button from "../../components/Button.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  userContext,
  DesktopContext,
  MobileContext,
  CatalogOpenedContext,
  ReviewsActiveContext,
  GetNummerStar,
  GetTypeSort,
} from "../../App.js";
import { useSelector, useDispatch } from "react-redux";
import Catalog from "../../components/Catalog/Catalog.jsx";
import ErrorBoundary from "../../components/ErrorBoundary";
import PromotionContainer from "../../Containers/PromotionsContainer/PromotionsContainer.jsx";
import BuyWithUs from "../../components/BuyWithUs/index.jsx";
import SwiperSlider1 from "../../components/Sliders/SliderProductCard/SwiperSlider1/SwiperSlider1.jsx";
import SwiperSlider2 from "../../components/Sliders/SliderProductCard/SwiperSlider2/SwiperSlider2.jsx";
import "./style.scss";
import ProductCardBox from "../../components/ProductCardBox";
import IconTick from "../../components/IconTick/";
import Subscribe from "../../components/Subscribe/Subscribe.jsx";
import { addItem } from "../../redux/slices/cartAdd";
import Image from "./image.jpg";
import IconsHeart from "../../components/IconsHeart/IconsHeart";
import IconsWeight from "../../components/IconsWeight/IconsWeight";
import {
  addLikedProduct,
  removeLikedProduct,
} from "../../redux/slices/wishlistSlice";
import {
  addComparedProduct,
  removeComparedProduct,
} from "../../redux/slices/compareSlice";
import Reviews from "../../components/Reviews/Reviews.jsx";

import { setCharacteristics } from "../../redux/slices/cardSlice.js";
import axios from "../../utils/axios.js";
import SliderReviews from "../../components/Sliders/SliderReviews/SliderReviews.jsx";
import MenuStep from "../../components/MenuStep/MenuStep.jsx";

import Sort from "../../components/Sort";

function ProductCard() {
  const { state } = useLocation();

  const itemID = state && state.product;

  const wrapRef = useRef(null);

  const { reviewsActive, setReviewsActive } =
    React.useContext(ReviewsActiveContext);

  const handClick = (event) => {
    if (wrapRef.current && !wrapRef.current.contains(event.target))
      setReviewsActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handClick);
    return () => {
      document.removeEventListener("mousedown", handClick);
    };
  }, []);
  const dispatch = useDispatch();

  const { user, setUser } = React.useContext(userContext);

  const { nummerStar, setNummerStar } = React.useContext(GetNummerStar);

  const { typeSort } = React.useContext(GetTypeSort);

  const characteristic = useSelector(
    (state) => state.cardReducer.characteristics
  );

  const analogCard = useSelector((state) => state.cardReducer.analog);
  const ratingStars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const reviewsSending = (e) => {
    e.preventDefault();

    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    axios
      .post(
        `/products/${
          activeAnalog === characteristic.name
            ? characteristic.id
            : analogCard.id
        }/reviews`,
        {
          rate: nummerStar,
          content: e.target[0].value,
          advantages: e.target[1].value,
          disadvantages: e.target[2].value,
          product_id:
            activeAnalog === characteristic.name ? characteristic : analogCard,
        },
        {
          // це потрібно додавати до кожного запиту який потребує авторизованого юзера
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        setReviews({
          ...res.reviews,
        });
        console.log(res.data, "555");
        setReviewsActive(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const [isProductCardVisible, setIsProductCardVisible] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const promotionContainer = document.getElementById(
      "yourPromotionContainerID"
    );

    if (promotionContainer) {
      const promotionContainerRect = promotionContainer.getBoundingClientRect();

      if (scrollPosition >= promotionContainerRect.top) {
        setIsProductCardVisible(false);
      } else {
        setIsProductCardVisible(true);
      }
    }
  };

  useEffect(() => {
    window.scrollYPrev = window.scrollY;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const addIntoCart = () => {
    const itemCart = {
      title: activeAnalog,
      price:
        activeAnalog === analogCard.name
          ? analogCard.price
          : characteristic.price,
      id: activeAnalog === analogCard.name ? analogCard.id : characteristic.id,
      img: Image,
    };
    dispatch(addItem(itemCart));
  };

  const { catalogOpened } = React.useContext(CatalogOpenedContext);
  const { desktop } = React.useContext(DesktopContext);
  const { mobile } = React.useContext(MobileContext);

  const categoryProduct = useSelector((state) => state.cardReducer.category);

  const [about, setAbout] = React.useState(true);
  const [characteristic2, setCharacteristic2] = React.useState(false);
  const [reviews, setReviews] = React.useState(false);
  const [colorActive, setColorActive] = React.useState(1);
  const [activeAnalog, setActiveAnalog] = React.useState(characteristic.name);
  const [activeMemory, setActiveMemory] = React.useState(
    characteristic.built_in_memory
  );

  const products = useSelector((state) => state.products.products);

  const [isMemory32, setIsMemory32] = useState([]);
  const [isMemory64, setIsMemory64] = useState([]);
  const [isMemory128, setIsMemory128] = useState([]);
  const [isMemory256, setIsMemory256] = useState([]);
  const [isMemory512, setIsMemory512] = useState([]);
  const [isMemory1tb, setIsMemory1tb] = useState([]);

  const isClick = React.useRef(false);

  useEffect(() => {
    if (!isClick.current) {
      setActiveAnalog(characteristic.name);
      setActiveMemory(characteristic.built_in_memory);
    } else {
      return;
    }
  }, [characteristic]);

  useEffect(() => {
    getReviews();
    const getSeries = () => {
      if (activeAnalog === characteristic.name) {
        return characteristic.series;
      } else {
        return analogCard.series;
      }
    };
    const filterProducts = products.filter(
      (prod) => prod.series === getSeries()
    );

    setIsMemory32(filterProducts.filter((i) => i.built_in_memory === "32GB"));
    setIsMemory64(filterProducts.filter((i) => i.built_in_memory === "64GB"));
    setIsMemory128(filterProducts.filter((i) => i.built_in_memory === "128GB"));
    setIsMemory256(filterProducts.filter((i) => i.built_in_memory === "256GB"));
    setIsMemory512(filterProducts.filter((i) => i.built_in_memory === "512GB"));
    setIsMemory1tb(filterProducts.filter((i) => i.built_in_memory === "1TB"));
  }, [
    products,
    activeAnalog,
    analogCard.series,
    characteristic.name,
    characteristic.series,
  ]);

  function onClickAbout() {
    setAbout(true);
    setCharacteristic2(false);
    setReviews(false);
  }

  function onClickChangeCharacteristics() {
    setAbout(false);
    setCharacteristic2(true);
    setReviews(false);
  }
  const [reviewsProduct, setReviewsProduct] = React.useState([]);

  function onClickChangeReviews() {
    setAbout(false);
    setCharacteristic2(false);
    setReviews(true);
    getReviews();
  }

  const getReviews = () => {
    axios
      .get(`/reviews`)
      .then((response) => {
        const analog = () => {
          if (activeAnalog === characteristic.name) {
            return characteristic;
          } else {
            return analogCard;
          }
        };

        const rewProd = response.data.filter(
          (prod) => prod.product_id === analog().id
        );

        setReviewsProduct(rewProd);
      })
      .catch((error) => {
        return;
      });
  };

  const title = () => {
    if (activeAnalog === analogCard.name) {
      return `${
        analogCard.name === null || analogCard.name === undefined
          ? ""
          : analogCard.name
      } `;
    } else {
      return `${
        characteristic.name === null || characteristic.name === undefined
          ? ""
          : characteristic.name
      }`;
    }
  };

  const titleProduct = () => {
    return (
      <>
        {!mobile ? (
          <h5 style={!desktop ? { marginBottom: 40 } : { display: "none" }}>
            {title()}
          </h5>
        ) : (
          <h6 className="h6">{title()}</h6>
        )}
      </>
    );
  };

  const titleProduct2 = () => {
    return (
      <>
        <h5 style={desktop ? { display: "flex" } : { display: "none" }}>
          {title()}
        </h5>
      </>
    );
  };

  function getCharacteristic(a) {
    return activeAnalog === analogCard.name
      ? analogCard[a]
        ? analogCard[a]
        : "-"
      : characteristic[a]
      ? characteristic[a]
      : "-";
  }

  const getActive1 = () => {
    setActiveAnalog(characteristic.name);
    setActiveMemory(characteristic.built_in_memory);
  };

  const getActive2 = () => {
    isClick.current = true;
    setActiveAnalog(analogCard.name);
    setActiveMemory(analogCard.built_in_memory);
  };

  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );

  const items = () => {
    if (activeAnalog === characteristic.name) {
      return characteristic;
    } else {
      return analogCard;
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

  const changeAnalogActive = (memory) => {
    const getSeries = () => {
      if (activeAnalog === characteristic.name) {
        return characteristic.series;
      } else {
        return analogCard.series;
      }
    };

    const filterProducts = products.filter(
      (prod) => prod.series === getSeries() && prod.built_in_memory === memory
    );

    if (
      filterProducts[0] &&
      filterProducts[0].id !== analogCard.id &&
      filterProducts[0].id !== characteristic.id
    ) {
      dispatch(setCharacteristics(filterProducts[0]));
      const jsonCharacteristic = JSON.stringify(filterProducts[0]);
      localStorage.setItem("characteristic", jsonCharacteristic);
    } else {
      if (filterProducts[0].id === analogCard.id) {
        setActiveAnalog(analogCard.name);
        setActiveMemory(analogCard.built_in_memory);
      } else {
        setActiveAnalog(characteristic.name);
        setActiveMemory(characteristic.built_in_memory);
      }
    }
  };

  useEffect(() => {
    setActiveAnalog(characteristic.name);
    setActiveMemory(characteristic.built_in_memory);
  }, [characteristic, dispatch]);

  const getProduct = (memory) => {
    changeAnalogActive(memory);
  };

  const formattedData = reviewsProduct.map((item) => ({
    ...item,
    rate: parseFloat(item.rate) || 0,
  }));

  const totalRate = formattedData.reduce((sum, item) => sum + item.rate, 0);

  const averageRate = totalRate / reviewsProduct.length;

  // Округляем среднее значение до целого
  const roundedAverageRate = Math.round(averageRate);

  const [sortReviews, setSortReviews] = React.useState(
    getSort(reviewsProduct, typeSort)
  );

  useEffect(() => {
    setSortReviews(getSort(reviewsProduct, typeSort));
  }, [typeSort, reviewsProduct]);

  return (
    <>
      <div className="home__container">
        {catalogOpened && (
          <ErrorBoundary>
            <Catalog />
          </ErrorBoundary>
        )}
      </div>
      <div className="productCard">
        <div className="productCard__container">
          <MenuStep label={categoryProduct} name={characteristic.name} />
          <div className="productCard__menu">
            <a
              onClick={onClickAbout}
              className={about ? "unterline" : ""}
              href="##"
            >
              About
            </a>
            <a
              onClick={onClickChangeCharacteristics}
              className={characteristic2 ? "unterline" : ""}
              href="##"
            >
              Characteristics
            </a>
            <a
              onClick={() => onClickChangeReviews()}
              className={reviews ? "unterline" : ""}
              href="##"
            >
              Reviews
            </a>
          </div>
          {about ? titleProduct() : ""}
          <div
            style={about ? { display: "flex" } : { display: "none" }}
            className="productCard__cardBox"
          >
            <div className="productCard__card1">
              {!mobile ? (
                <SwiperSlider1 colorActive={colorActive} />
              ) : (
                <SwiperSlider2 colorActive={colorActive} />
              )}
            </div>
            <div className="productCard__cardPart3">
              {about ? titleProduct2() : ""}
              <div className="productCard__cardBlock1">
                <div className="productCard__cardBlock11">
                  <p>
                    Color: <span>{characteristic.color}</span>
                  </p>
                  <div
                    style={!desktop ? { display: "flex" } : { display: "none" }}
                    className="productCard__cardBlockLeft"
                  >
                    <div className="productCard__PCbox">
                      <IconsHeart
                        className={`heart-productPC ${
                          isWishlisted ? "selected" : ""
                        }`}
                        onClick={isWishlisted ? handleUnlike : handleLike}
                      />
                      <p>Favorite</p>
                    </div>
                    <div className="productCard__PCbox">
                      <IconsWeight
                        onClick={
                          isCompareProducts ? handleUnCompare : handleCompare
                        }
                        className="weght-productPC"
                      />
                      <p>Compare</p>
                    </div>
                  </div>
                </div>
                <div className="productCard__colors">
                  <div
                    onClick={() => setColorActive(1)}
                    className="productCard__color1"
                  >
                    {colorActive === 1 ? <IconTick /> : ""}
                  </div>
                  <div
                    onClick={() => setColorActive(2)}
                    className="productCard__color2"
                  >
                    {colorActive === 2 ? <IconTick /> : ""}
                  </div>
                  <div
                    onClick={() => setColorActive(3)}
                    className="productCard__color3"
                  >
                    {colorActive === 3 ? <IconTick /> : ""}
                  </div>
                </div>

                <p>
                  Series:
                  <span>
                    {activeAnalog === analogCard.name
                      ? analogCard.series
                      : characteristic.series}
                  </span>
                </p>
                <div className="productCard__buttons">
                  <button
                    onClick={getActive1}
                    className={
                      activeAnalog === characteristic.name
                        ? "active"
                        : "unactive"
                    }
                  >
                    {characteristic.name}
                  </button>
                  <button
                    onClick={getActive2}
                    className={
                      activeAnalog === analogCard.name ? "active" : "unactive"
                    }
                  >
                    {analogCard.name}
                  </button>
                </div>
                <p>
                  Internal memory:{" "}
                  <span>
                    {activeAnalog === analogCard.name
                      ? analogCard.built_in_memory
                      : characteristic.built_in_memory}
                  </span>
                </p>
                <div className="productCard__buttons">
                  <button
                    onClick={() => getProduct("32GB")}
                    className={activeMemory === "32GB" ? "active" : "unactive"}
                    style={
                      isMemory32.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory32.length === 0}
                  >
                    32 GB
                  </button>
                  <button
                    onClick={() => getProduct("64GB")}
                    className={activeMemory === "64GB" ? "active" : "unactive"}
                    style={
                      isMemory64.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory64.length === 0}
                  >
                    64 GB
                  </button>
                  <button
                    onClick={() => getProduct("128GB")}
                    className={activeMemory === "128GB" ? "active" : "unactive"}
                    style={
                      isMemory128.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory128.length === 0}
                  >
                    128 GB
                  </button>
                  <button
                    onClick={() => getProduct("256GB")}
                    className={activeMemory === "256GB" ? "active" : "unactive"}
                    style={
                      isMemory256.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory256.length === 0}
                  >
                    256 GB
                  </button>
                  <button
                    onClick={() => getProduct("512GB")}
                    className={activeMemory === "512GB" ? "active" : "unactive"}
                    style={
                      isMemory512.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory512.length === 0}
                  >
                    512 GB
                  </button>
                  <button
                    onClick={() => getProduct("1TB")}
                    className={activeMemory === "1TB" ? "active" : "unactive"}
                    style={
                      isMemory1tb.length === 0
                        ? { textDecoration: "line-through" }
                        : null
                    }
                    disabled={isMemory1tb.length === 0}
                  >
                    1 TB
                  </button>
                </div>
              </div>

              <div className="productCard__cardBlock2">
                <div
                  style={desktop ? { display: "flex" } : { display: "none" }}
                  className="productCard__cardBlockLeft"
                >
                  <div className="productCard__cardBlockLeft-tip">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                        stroke="#28003E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Favorite</p>
                  </div>
                  <div className="productCard__cardBlockLeft-tip">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.4195 1.95312V9.54544M2.21387 12.389L22.3183 6.7874"
                        stroke="#28003E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2.38672 17.9712L6.30018 11.3721L10.3863 17.9712H2.38672Z"
                        stroke="#28003E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.36719 18.0098C2.50147 19.3398 3.48751 22 6.35738 22C9.22725 22 10.1302 19.3398 10.3859 18.0098"
                        stroke="#28003E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.8174 14.5186L18.7308 7.91943L22.8169 14.5186H14.8174Z"
                        stroke="#28003E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.7988 14.5566C14.9331 15.8867 15.9192 18.5468 18.789 18.5468C21.6589 18.5468 22.5618 15.8867 22.8176 14.5566"
                        stroke="#28003E"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Compare</p>
                  </div>
                </div>
                <div className="productCard__cardBlockRight">
                  <div className="productCard__cardBlockPart1">
                    <p>
                      $
                      {activeAnalog === analogCard.name
                        ? analogCard.price
                        : characteristic.price}
                    </p>
                    <h4>
                      $
                      {activeAnalog === analogCard.name
                        ? analogCard.price
                        : characteristic.price - 100}
                    </h4>
                    <div className="productCard__cardBlockEconomy">
                      <p>Economy:</p>
                      <p>- $ 100</p>
                    </div>
                  </div>
                  <div className="productCard__cardBlockPart2">
                    <Button type="violet" title="Buy" onClick={addIntoCart} />
                    <Button type="black" title="Credit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productCard__titleBox">
            {characteristic2 || reviews ? title() : ""}
            <div className="productCard__rating-box">
              <div className="productCard__rating">
                <MyRating rating={roundedAverageRate} />
                {/*  <svg
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
                </svg> */}
              </div>
              <span>{reviewsProduct.length} reviews</span>
            </div>
          </div>
          <div
            style={characteristic2 ? { display: "flex" } : { display: "none" }}
            className={
              characteristic2 || reviews
                ? "productCard__cardBox2"
                : "productCard__cardBox"
            }
          >
            {characteristic2 && desktop
              ? isProductCardVisible && (
                  <div
                    id="yourProductCardID"
                    className="productCard__absoluteDesktop"
                  >
                    <div className="productCard__container">
                      <ProductCardBox
                        active={activeAnalog === characteristic.name ? 1 : 2}
                      />
                    </div>
                  </div>
                )
              : ""}

            <table className="table1" border="1">
              <tbody>
                <tr>
                  <th className="part1"></th>
                  <th className="part2"></th>
                </tr>
                <tr>
                  <td>
                    <span>Display diagonal</span>
                  </td>
                  <td>{getCharacteristic("display_diagonal")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Display resolution</span>
                  </td>
                  <td>{getCharacteristic("display_resolution")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Matrix type</span>
                  </td>
                  <td>{getCharacteristic("matrix_type")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Screen refresh rate</span>
                  </td>
                  <td>{getCharacteristic("screen_refresh_rate")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Screen material</span>
                  </td>
                  <td>{getCharacteristic("screen_material")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Communication standard</span>
                  </td>
                  <td>{getCharacteristic("communication_standard")}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span>SIM card dimensions</span>
                  </td>
                  <td>{getCharacteristic("sim_card_dimensions")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Built-in memory</span>
                  </td>
                  <td>{getCharacteristic("built_in_memory")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Operating System</span>
                  </td>
                  <td>{getCharacteristic("operating_system")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Front camera</span>
                  </td>
                  <td>{getCharacteristic("front_camera")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Features of the front camera</span>
                  </td>
                  <td>{getCharacteristic("features_of_the_front_camera")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Placement of the front camera</span>
                  </td>
                  <td>{getCharacteristic("placement_of_the_front_camera")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Type of frontal flash</span>
                  </td>
                  <td>{getCharacteristic("type_of_frontal_flash")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Front camera video recording</span>
                  </td>
                  <td>{getCharacteristic("front_camera_video_recording")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Additionally</span>
                  </td>
                  <td>{getCharacteristic("additionally")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Name of the processor</span>
                  </td>
                  <td>{getCharacteristic("name_of_the_processor")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Number of cores</span>
                  </td>
                  <td>{getCharacteristic("number_of_cores")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Apple series</span>
                  </td>
                  <td>Apple series</td>
                </tr>
                <tr>
                  <td>
                    <span>Main camera</span>
                  </td>
                  <td>{getCharacteristic("main_camera")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Features of the main camera</span>
                  </td>
                  <td>{getCharacteristic("features_of_the_main_camera")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Number of main cameras</span>
                  </td>
                  <td>{getCharacteristic("number_of_main_cameras")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Record video of the main camera</span>
                  </td>
                  <td>
                    {getCharacteristic("record_video_of_the_main_camera")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Additional information on the camera</span>
                  </td>
                  <td>
                    {getCharacteristic("additional_information_on_the_camera")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Video recording</span>
                  </td>
                  <td>{getCharacteristic("video_recording")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Stabilization method</span>
                  </td>
                  <td>{getCharacteristic("stabilization_method")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Body material</span>
                  </td>
                  <td>{getCharacteristic("body_material")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Connectors</span>
                  </td>
                  <td>{getCharacteristic("connectors")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Navigation</span>
                  </td>
                  <td>{getCharacteristic("navigation")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Weight, g</span>
                  </td>
                  <td>{getCharacteristic("weight_g")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Dimensions</span>
                  </td>
                  <td>{getCharacteristic("dimensions")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Security</span>
                  </td>
                  <td>{getCharacteristic("security")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Degree of dust/moisture protection</span>
                  </td>
                  <td>
                    {getCharacteristic("degree_of_dust_moisture_protection")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Sensors</span>
                  </td>
                  <td>{getCharacteristic("sensors")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Supply set</span>
                  </td>
                  <td>{getCharacteristic("supply_set")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Wireless technologies</span>
                  </td>
                  <td>{getCharacteristic("wireless_technologies")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Equipment</span>
                  </td>
                  <td>{getCharacteristic("equipment")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Form factor</span>
                  </td>
                  <td>{getCharacteristic("form_factor")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Features of the case</span>
                  </td>
                  <td>{getCharacteristic("features_of_the_case")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Color</span>
                  </td>
                  <td>{getCharacteristic("color")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Brand registration country</span>
                  </td>
                  <td>{getCharacteristic("brand_registration_country")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Warranty</span>
                  </td>
                  <td>{getCharacteristic("warranty")}</td>
                </tr>
                <tr>
                  <td>
                    <span>Country-producer of the product</span>
                  </td>
                  <td>
                    {getCharacteristic("country_producer_of_the_product")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={reviews ? { display: "flex" } : { display: "none" }}
            className="productCard__sort-box"
          >
            <button
              className="button__feedback"
              onClick={() => setReviewsActive(true)}
            >
              To leave feedback
            </button>
            <Sort />
          </div>
          <div
            style={reviews ? { display: "flex" } : { display: "none" }}
            className="productCard__cardBox3"
          >
            {reviews && desktop
              ? isProductCardVisible && (
                  <div
                    id="yourProductCardID"
                    className="productCard__absoluteDesktop"
                  >
                    <div className="productCard__container">
                      <ProductCardBox
                        active={activeAnalog === characteristic.name ? 1 : 2}
                      />
                    </div>
                  </div>
                )
              : ""}

            <div
              style={
                reviewsActive === true
                  ? { display: "flex" }
                  : { display: "none" }
              }
              className="overlayReviews"
            >
              <form
                onSubmit={reviewsSending}
                ref={wrapRef}
                className="reviews-window"
              >
                <div className="signin-box">
                  <Link to="/product-card/:id">
                    <svg
                      onClick={() => {
                        setReviewsActive(false);
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
                  </Link>
                </div>
                <h2>Leave a review</h2>
                <div className="boxStars__feedback-stars">
                  <p>Rate this product</p>
                  <div className="boxStars__feedback">
                    {ratingStars.map((obj, i) => (
                      <svg
                        onClick={() => setNummerStar(obj.id)}
                        key={obj.id}
                        {...obj}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 16 15"
                        fill="none"
                      >
                        <path
                          d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                          fill={nummerStar >= obj.id ? "#FFE500" : "#E3E3E3"}
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <textarea
                  className="input__feedback"
                  placeholder="Your review"
                  type="text"
                />
                <input
                  className="advantages__feedback"
                  placeholder="Advantages"
                  type="text"
                />
                <input
                  className="advantages__feedback"
                  placeholder="Disadvantages"
                  type="text"
                />
                <button className="button__feedback2">Add a review</button>
              </form>
            </div>
            {reviewsProduct.length > 0 ? (
              <>
                {sortReviews.map((item) => (
                  <Reviews item={item} key={item.id} {...item} />
                ))}
              </>
            ) : (
              ""
            )}
          </div>
          <div id="yourPromotionContainerID">
            <PromotionContainer />
          </div>
          <BuyWithUs />
          {about || characteristic ? (
            <div className="slide-boxCard">
              <div className="slide-boxCard__title">
                <h2>Reviews</h2>
                <p>All reviews</p>
              </div>
              <SliderReviews reviewsProduct={reviewsProduct} />
            </div>
          ) : (
            ""
          )}

          <Subscribe />
        </div>
      </div>

      {(characteristic2 || reviews) && !desktop
        ? isProductCardVisible && (
            <div
              id="yourProductCardID"
              className="productCard__absoluteMobileTablet"
            >
              <ProductCardBox />
            </div>
          )
        : ""}
    </>
  );
}

export default ProductCard;
