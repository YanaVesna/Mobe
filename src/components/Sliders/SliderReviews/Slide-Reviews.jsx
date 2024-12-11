import React from "react";
import "./style.scss";
import MyRating from "../../MyRating/MyRating.jsx";

const Reviews = ({ item }) => {
  return (
    <div className="reviewsSlide">
      <div className="reviewsSlide__title">
        <span>{`${item.user.name} ${item.user.surname}`}</span>
        <MyRating rating={item.rate} />
      </div>
      <p>{item.content}</p>
    </div>
  );
};

export default Reviews;
