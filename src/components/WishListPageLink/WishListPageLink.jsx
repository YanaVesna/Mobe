import React from "react";
import { useSelector } from "react-redux";
import IconsHeart from "../IconsHeart/IconsHeart";

import "./style.scss";

const WishListPageLink = ({ className }) => {

  const likedProducts = useSelector(
    (state) => state.likedProducts.likedProducts
  );


  const wishlistItemCount = likedProducts.length;

  return (
    <a href="/wishList">
      <IconsHeart className={className} />

      {wishlistItemCount > 0 && (
        <span className="wish__link">{wishlistItemCount}</span>
      )}
    </a>
  );
};

export default WishListPageLink;
