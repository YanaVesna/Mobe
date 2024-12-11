import React from "react";

import Title from "../Title/Title";
import Button from "../Button";

import Edit from "./Image/edit.png";
import Phone from "./Image/phone.png";
import Map from "./Image/map.png";

import style from "./style.scss";
import PageLink from "../PageLink/PageLink";

const OrderPage = () => {
  return (
    <>
      <div className="order__container">
        <PageLink text="Order" />
        <div className="order__wrraper">
          <div className="order__conatiner-inner">
            <Title className="order__name" text="Placing an order" />
            <div className="order__form">
              <div className="order__form details">
                <div className="details__title">Your contact details</div>
                <form className="details__form">
                  <div className="details__form-inner">
                    <div className="details__form-surname">
                      <label for="">Surname</label>
                      <input type="text" />
                    </div>
                    <div className="details__form-name">
                      <label for="">Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="details__form-inner">
                    <div className="details__form-phone">
                      <label for="">Mobile phone</label>
                      <input type="text" />
                    </div>
                    <div className="details__form-email">
                      <label for="">Email</label>
                      <input type="text" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="order product">
              <div className="product__title">
                <h3>Order</h3>
                <img src={Edit} alt="" />
              </div>
              <div className="product__item">
                <a href="/" className="product__inner">
                  <img src={Phone} alt="" />
                  <div className="product__name">
                    Smartphone Apple iPhone 12 128Gb White
                  </div>
                </a>
                <div className="product__price">
                  <div className="variable">
                    <div className="product__price-old">$ 754</div>
                    <div className="product__price-new">$ 734 х 1 unit</div>
                  </div>
                  <div className="product__price-actual">$ 734</div>
                </div>
              </div>
            </div>
            <div className="delivery">
              <h3 className="delivery__title">Delivery</h3>
              <form className="delivery__form" action="">
                <div className="delivery__form-inner">
                  <div className="delivery__form radio">
                    <div className="radio__inner">
                      <input
                        id="pickupNovaPost"
                        type="radio"
                        value="Pickup from Nova Post"
                        name="pickupMethod"
                      />
                      <label for="pickupNovaPost">Pickup from Nova Post</label>
                    </div>
                    <label>Free</label>
                  </div>
                  <div className="delivery__form-select">
                    <select name="towns" id="">
                      <option value="Kyiv">Kyiv</option>
                      <option value="Kyiv">Kyiv</option>
                      <option value="Kyiv">Kyiv</option>
                    </select>
                    <select name="adress" id="">
                      <option value="Kyiv">Department No. 4</option>
                      <option value="Kyiv">Department No. 4</option>
                      <option value="Kyiv">Department No. 4</option>
                    </select>
                    <a href="#">
                      <div className="delivery__form-btn" href="#">
                        <p>Select on the map</p>
                        <img src={Map} alt="" />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="delivery__ukrposht">
                  <input
                    id="paymentReceipt"
                    type="radio"
                    value="Pickup from Ukrpost"
                    name="pickupMethod"
                  />
                  <label for="paymentReceipt">Pickup from Ukrpost</label>
                </div>
              </form>
            </div>
            <div className="payment">
              <h3 className="payment__title">Payment</h3>
              <div className="payment__inner">
                <input
                  type="checkbox"
                  id="paymentUponReceipt"
                  name="paymentMethod"
                />
                <label htmlFor="paymentUponReceipt">Payment upon receipt</label>
              </div>
            </div>
          </div>
          <div className="order__total">
            <div className="total__title">Total</div>
            <div className="total__block-price">
              <p>1 product</p>
              <p>$ 734</p>
            </div>
            <div className="total__block-delivery">
              <p>Shipping cost</p>
              <p>According to carrier tariffs</p>
            </div>
            <div className="total__block-pay">
              <p>To pay</p>
              <p>$ 734</p>
            </div>
            <Button className="order-btn" title="Confirm the order" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
