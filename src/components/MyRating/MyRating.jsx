import React from "react";

import Grey from "./images/grey.png";
import Yellow from "./images/yellow.png";

import Rating from "react-rating";

const MyRating = ({ rating }) => {
  return (
    <>
      <Rating
        placeholderRating={rating}
        emptySymbol={<img src={Grey} className="icon" alt="grey" />}
        placeholderSymbol={<img src={Yellow} className="icon" alt="yellow" />}
        fullSymbol={<img src={Yellow} className="icon" alt="sym" />}
      />
    </>
  );
};

export default MyRating;
