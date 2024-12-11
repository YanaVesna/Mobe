import React from "react";

import style from "./style.scss";

const Subscribe = ({className}) => {
  return (
    <>
      <section className={`subscribe ${className}`}>
        <div className="subscribe__container">
          <form className="subscribe__form" action="/process">
            <label className="subscribe__label">
              Find out about new promotions first!
            </label>
            <div className="subscribe__inner">
              <input
                className="subscribe__input"
                type="text"
                placeholder="email@email.com"
              />
              <button className="subscribe__btn">Subscribe </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
