// Import the necessary dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CatalogOpenedContext } from "../../App.js";
import ErrorBoundary from "../../components/ErrorBoundary";
import { fetchProducts } from "../../actions/productActions";
import MyRating from "../../components/MyRating/MyRating";
import Button from "../../components/Button";
import IconsHeart from "../../components/IconsHeart/IconsHeart";
import IconsWeight from "../../components/IconsWeight/IconsWeight";
import Title from "../../components/Title/Title";
import { ReactComponent as Close } from "./images/close.svg";
import Image from "./images/1.jpg";
import HotPriceContainer from "../../Containers/HotPrice/HotPriceContainer";
import "./style.scss";
import PageLink from "../../components/PageLink/PageLink";
import { removeComparedProduct } from "../../redux/slices/compareSlice";
import Btn from "../../components/Btn/Btn";
import Catalog from "../../components/Catalog/Catalog.jsx";

const ComparePage = () => {
  const { catalogOpened } = React.useContext(CatalogOpenedContext);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const comparedProducts = useSelector(
    (state) => state.comparedProducts.comparedProducts
  );
  console.log(comparedProducts);
  const handleRemoveButtonClick = (productId) => {
    dispatch(removeComparedProduct(productId));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const excludedCharacteristics = [
    "category_id",
    "is_new",
    "is_popular",
    "created_at",
    "category",
    "name",
    "image",
    "is_promotion",
    "is_hot_price",
    "like",
    "id",
    "price",
    "updated_at",
  ];
  const characteristics =
    comparedProducts.length > 0
      ? Object.keys(comparedProducts[0]).filter(
          (characteristic) => !excludedCharacteristics.includes(characteristic)
        )
      : [];
  const hasDifferences = (characteristic, products) => {
    const values = products.map((product) => product[characteristic]);
    return new Set(values).size > 1;
  };
  return (
    <div className="compare__section">
      <div className="compare__container">
        {catalogOpened && (
          <ErrorBoundary>
            <Catalog />
          </ErrorBoundary>
        )}
        <PageLink text="Comparable goods" />
        <div className="compare__title">
          <Title text="Comparable goods" />
        </div>
        <div className="compare__content">
          {comparedProducts.map((product) => (
            <div className="compare__card" key={product.id}>
              <div className="compare__close">
                <button
                  className="compare__clear-btn"
                  onClick={() => handleRemoveButtonClick(product.id)}
                >
                  <Close />
                </button>
              </div>
              <div className="compare__inner">
                <div className="compare__card-photo">
                  <img src={Image} alt="" />
                </div>
                <div className="compare__card-content">
                  <div className="compare__card-title">{product.name}</div>
                  <div className="compare__card rating">
                    <MyRating />
                    <div className="rating__revews">198 відгуків</div>
                  </div>
                </div>
                <div className="compare__price">
                  <div className="compare__price-inner">
                    <div className="compare__card-oldprice">$ 250.99</div>
                    <div className="compare__card-newprice">
                      {product.price}$
                    </div>
                  </div>
                  {window.innerWidth < 550 ? (
                    <Btn type="violet" title="Add to cart" />
                  ) : (
                    <Button type="violet" title="Add to cart" />
                  )}
                </div>
                <IconsHeart className="compare-heart" />
                <IconsWeight className="compare-weight" isCompared={true} />
              </div>
            </div>
          ))}
          {comparedProducts.length === 0 && (
            <div className="compare__absence">
              Немає товарів для порівняння.
            </div>
          )}
        </div>
        {comparedProducts.length > 0 && ( // Only render if there are items in comparison
          <div className="comparison">
            <div className="thead">
              <div
                onClick={() => setActiveTab("All")}
                className={activeTab === "All" ? "active" : "none"}
              >
                All characteristics
              </div>
              <div
                onClick={() => setActiveTab("Differences")}
                className={activeTab === "Differences" ? "active" : "none"}
              >
                Differences
              </div>
            </div>
            <div className="wrap-inner">
              {characteristics.map((characteristic) => (
                <div className="wrap-flex" key={characteristic}>
                  {comparedProducts.map((product, index) => (
                    <React.Fragment key={product.id}>
                      {index === 0 && (
                        <div className="wrap-text char">{characteristic}</div>
                      )}
                      {(activeTab === "All" ||
                        hasDifferences(characteristic, comparedProducts)) && (
                        <div className="wrap__content" key={product.id}>
                          {String(product[characteristic])}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        <HotPriceContainer />
      </div>
    </div>
  );
};

export default ComparePage;
