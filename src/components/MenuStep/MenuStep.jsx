import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Arrow from "./Image/iconArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSeries } from "../../redux/slices/filterSlice";

import "./style.scss";

const MenuStep = () => {
  const dispatch = useDispatch();

  const label = useSelector((state) => state.filter.label);
  const page = useSelector((state) => state.filter.page);
  const series = useSelector((state) => state.filter.series);
  const search = useSelector((state) => state.filter.search);

  const getFilterPage = () => {
    dispatch(setSeries([]));
  };

  return (
    <>
      <div className="menuStep__titlemenu">
        <Link to="/">Main</Link>
        <img src={Arrow} alt="cross" />
        {search ? (
          <a href="##">{`search results for the query '${search}'`}</a>
        ) : (
          <div
            className="menuStep__Lablemenu"
            style={
              search === ""
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <a
              href="##"
              onClick={(e) => {
                e.preventDefault();
                getFilterPage();
              }}
            >
              {label.map((ob) => ob).join(", ")}
            </a>
            {page === "product-page" ? (
              ""
            ) : (
              <>
                <img
                  style={
                    series.length === 0
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                  src={Arrow}
                  alt="cross"
                />
                <a href="##">
                  {series === "undefined"
                    ? ""
                    : series.map((ob) => ob).join(", ")}
                </a>
              </>
            )}
          </div>
        )}
      </div>
      <h1 className="filter__titleSeries">
        {series.length === 0
          ? label.map((ob) => ob).join(", ")
          : series.map((ob) => ob).join(", ")}
      </h1>
    </>
  );
};
export default MenuStep;
