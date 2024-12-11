import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";
//
import Section from "../../components/Section/Section";
import Title from "../../components/Title/Title";

const HotPriceContainer = ({ className }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://mobe.publicvm.com:81/api/products"
        );

        if (Array.isArray(response.data)) {
          const slicedData = response.data.slice(10, 14);
          setData(slicedData);
        } else {
          console.log("Дані не є масивом.");
        }
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className={`hotprice__container ${className}`}>
        <Title text="HOT price" />
        {!data.length ? <div>Loading</div> : <Section data={data} />}
      </div>
    </>
  );
};

export default HotPriceContainer;
