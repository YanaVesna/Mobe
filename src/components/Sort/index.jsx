import React from "react";
import { GetTypeSort } from "../../App.js";
import "./style.scss";

function Sort() {
  const [openSort, setOpenSort] = React.useState(false);

  const { setTypeSort } = React.useContext(GetTypeSort);

  return (
    <div className="productCard__sort">
      <div className="productCard__contactus">
        <span>Newest first</span>
        {!openSort ? (
          <svg
            onClick={() => setOpenSort(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#28003E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setOpenSort(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 15L12 9L6 15"
              stroke="#28003E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div
        style={openSort ? { display: "flex" } : { display: "none" }}
        className="productCard__contacts"
      >
        <div
          onClick={() => setTypeSort("created_at")}
          className="productCard__Newest"
        >
          <p>Newest first</p>
        </div>
        <div
          onClick={() => setTypeSort("rate")}
          className="productCard__Newest"
        >
          <p>The most useful</p>
        </div>
        <div
          onClick={() => setTypeSort("rate")}
          className="productCard__Newest"
        >
          <p>By recommendation</p>
        </div>
      </div>
    </div>
  );
}

export default Sort;
