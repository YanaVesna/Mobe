import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Prod1 from "../../assets/img/imageBuy1.jpg";
import Prod2 from "../../assets/img/imageBuy2.jpg";
import Prod3 from "../../assets/img/imageBuy3.jpg";
import Prod4 from "../../assets/img/imageBuy4.jpg";

import MyRating from "../MyRating/MyRating";
import Button from "../Button";

import IconsHeart from "../IconsHeart/IconsHeart";
import IconsWeight from "../IconsWeight/IconsWeight";
import "./style.scss";

function BuyWithUs() {
  return (
    <section className="buyWithUs">
      <div className="buyWithUs__container">
        <div className="buyWithUs__title">
          <Title text="Buy with us" />
        </div>
        <div className="buyWithUs__content">
          <div className="buyWithUs__card">
            <div className="buyWithUs__inner">
              <div className="buyWithUs__card-photo">
                <img src={Prod1} alt="" />
              </div>
              <div className="buyWithUs__card-content">
                <div className="buyWithUs__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="buyWithUs__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="buyWithUs__price">
                <div className="buyWithUs__price-inner">
                  <div className="buyWithUs__card-oldprice">$ 250.99</div>
                  <div className="buyWithUs__card-buyWithUsprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="buyWithUs__card">
            <div className="buyWithUs__inner">
              <div className="buyWithUs__card-photo">
                <img src={Prod2} alt="" />
              </div>
              <div className="buyWithUs__card-content">
                <div className="buyWithUs__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="buyWithUs__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="buyWithUs__price">
                <div className="buyWithUs__price-inner">
                  <div className="buyWithUs__card-oldprice">$ 250.99</div>
                  <div className="buyWithUs__card-buyWithUsprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="buyWithUs__card">
            <div className="buyWithUs__inner">
              <div className="buyWithUs__card-photo">
                <img src={Prod3} alt="" />
              </div>
              <div className="buyWithUs__card-content">
                <div className="buyWithUs__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="buyWithUs__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="buyWithUs__price">
                <div className="buyWithUs__price-inner">
                  <div className="buyWithUs__card-oldprice">$ 250.99</div>
                  <div className="buyWithUs__card-buyWithUsprice">$ 235.99</div>
                </div>
                <Button type="violet" title="Add to order" />
              </div>
              <IconsHeart />
              <IconsWeight />
            </div>
          </div>
          <div className="buyWithUs__card">
            <div className="buyWithUs__inner">
              <div className="buyWithUs__card-photo">
                <img src={Prod4} alt="" />
              </div>
              <div className="buyWithUs__card-content">
                <div className="buyWithUs__card-title">
                  Samsung Galaxy A24 6/128GB Black
                </div>
                <div className="buyWithUs__card rating">
                  <MyRating />
                  <div className="rating__revews">198 reviews</div>
                </div>
              </div>
              <div className="buyWithUs__price">
                <div className="buyWithUs__price-inner">
                  <div className="buyWithUs__card-oldprice">$ 250.99</div>
                  <div className="buyWithUs__card-buyWithUsprice">$ 235.99</div>
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
}

export default BuyWithUs;
