import React from "react";
import { useSelector } from "react-redux";
import IconsWeight from "../IconsWeight/IconsWeight";
import "./style.scss";

const ComparePageLink = ({ className }) => {
  const comparedProductsCount = useSelector(
    (state) => state.comparedProducts.comparedProducts.length
  );
  /* console.log("comparedProductsCount", comparedProductsCount); */
  return (
    <div>
      <a href="/compare">
        <IconsWeight className={className} />
        {comparedProductsCount > 0 && (
          <span className="compare__link">{comparedProductsCount}</span>
        )}
      </a>
    </div>
  );
};

export default ComparePageLink;
