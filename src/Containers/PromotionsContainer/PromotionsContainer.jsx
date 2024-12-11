import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import Section from "../../components/Section/Section";
import Title from "../../components/Title/Title";
import Skeleton from "../../components/Skeleton/Skeleton.jsx";

const PromotionContainer = () => {
  const dispatch = useDispatch();

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const allProducts = useSelector((state) => state.products.products);

  const promotionProducts = allProducts
    .filter((product) => product.is_promotion)
    .slice(0, 4);

  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  return (
    <>
      <Title text="Promotions" />
      {loading ? (
        <div className="skeletons-container">{skeletons}</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Section data={promotionProducts} />
      )}
    </>
  );
};

export default PromotionContainer;
