import { useRef } from "react";
import { register } from "swiper/element/bundle";
import { useSelector, useDispatch } from "react-redux";

import srcPlus from "../../../assets/img/stacker.png";
import slides from "../../../assets/cartSlides.json";
import "./style.scss";
import Button from "../../Button.jsx";
import { addItem } from "../../../redux/slices/cartAdd";

register();

const Slider = () => {
  const dispatch = useDispatch();

  const swiperElRef = useRef(null);

  const { items } = useSelector((state) => state.cartAdd);

  const filterItems = items.filter((ob) => ob.buytogether === undefined);

  let resultArray = filterItems.map((obj1, i) => {
    let matchingObj = slides.find((obj2, a) => obj1.id === obj2.id);

    if (matchingObj) {
      return {
        id1: obj1.id,
        title: obj1.title,
        price: obj1.price,
        img: obj1.img,
        id2: `${obj1.id}"acsessuare"`,
        title2: matchingObj.titlePlus,
        price2: matchingObj.pricePlus,
        img2: srcPlus,
      };
    } else {
      let matchingObj2 = slides.find((obj2, a) => obj2.id === 1);

      return {
        id1: obj1.id,
        title: obj1.title,
        price: obj1.price,
        img: obj1.img,
        id2: `${obj1.id}"acsessuare"`,
        title2: matchingObj2.titlePlus,
        price2: matchingObj2.pricePlus,
        img2: srcPlus,
      };
    }
  });

  const addIntoCart = (obj) => {
    addIntoCart1(obj);
    addIntoCart2(obj);
  };

  const addIntoCart1 = (obj) => {
    const itemCart = {
      id: obj.id1,
      title: obj.title,
      price: obj.price,
      img: obj.img,
      count: 1,
      buytogether: obj.id1,
    };

    dispatch(addItem(itemCart));
  };

  const addIntoCart2 = (obj) => {
    const itemCart2 = {
      id: obj.id2,
      title: obj.title2,
      price: obj.price2,
      img: srcPlus,
      count: 1,
      buytogether: obj.id1,
    };

    dispatch(addItem(itemCart2));
  };

  const slidesRender = resultArray.map((obj, i) => {
    return (
      <swiper-slide key={i}>
        <div className="swiper__box">
          <div className="slide__box1">
            <img src={obj.img} alt="img" />
            <div className="slide__title">
              <p>{obj.title}</p>

              <span>$ {(obj.price * 0.9).toFixed(2)}</span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="#28003E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="slide__box2">
            <img src={srcPlus} alt="img" />
            <div className="slide__title">
              <p>{obj.title2}</p>
              <span>$ {obj.price2}</span>
            </div>
          </div>
        </div>
        <div className="shoppingcart__down-summ2">
          <h5>$ {(obj.price * 0.9 + obj.price2).toFixed(2)}</h5>
          <Button
            onClick={() => addIntoCart(obj)}
            type="violet"
            title="Add to order"
          />
        </div>
      </swiper-slide>
    );
  });

  return (
    <>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
        autoplay="false"
        loop="true"
        class="slider1"
      >
        {slidesRender}
      </swiper-container>
    </>
  );
};

export default Slider;
