import React from "react";

import Title from "../Title/Title";
import Prod from "./images/prod.jpg";

import MyRating from "../MyRating/MyRating";
import Button from "../Button";

import IconsHeart from "../IconsHeart/IconsHeart";
import IconsWeight from "../IconsWeight/IconsWeight";

import style from "./style.scss";

const Popular = () => {
  return (
    <section className="popular">
      <div className="popular__container">
        <div className="popular__title">
          <Title text="Popular" />
        </div>
        <div className="popular__content">
          <div className="popular__card">
            <div className="popular__inner">
              <div className="popular__card-photo">
                <img src={Prod} alt="" />
              </div>
              <div className="popular__card-content">
                <div className="popular__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="popular__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="popular__price">
                <div className="popular__price-inner">
                  <div className="popular__card-oldprice">$ 250.99</div>
                  <div className="popular__card-popularprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="popular__card">
            <div className="popular__inner">
              <div className="popular__card-photo">
                <img src={Prod} alt="" />
              </div>
              <div className="popular__card-content">
                <div className="popular__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="popular__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="popular__price">
                <div className="popular__price-inner">
                  <div className="popular__card-oldprice">$ 250.99</div>
                  <div className="popular__card-popularprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="popular__card">
            <div className="popular__inner">
              <div className="popular__card-photo">
                <img src={Prod} alt="" />
              </div>
              <div className="popular__card-content">
                <div className="popular__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="popular__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="popular__price">
                <div className="popular__price-inner">
                  <div className="popular__card-oldprice">$ 250.99</div>
                  <div className="popular__card-popularprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="popular__card">
            <div className="popular__inner">
              <div className="popular__card-photo">
                <img src={Prod} alt="" />
              </div>
              <div className="popular__card-content">
                <div className="popular__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="popular__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="popular__price">
                <div className="popular__price-inner">
                  <div className="popular__card-oldprice">$ 250.99</div>
                  <div className="popular__card-popularprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
