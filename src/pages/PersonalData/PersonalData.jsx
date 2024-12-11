import React, { useEffect, useState } from "react";

import AdminLink from "../../components/AdminLink/AdminLink";
import Title from "../../components/Title/Title";
import HotPriceContainer from "../../Containers/HotPrice/HotPriceContainer";

import "./style.scss";

import Edit from "./Images/edit.svg";
import Left from "./Images/left.svg";
import Subscribe from "../../components/Subscribe/Subscribe";

const PersonalData = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 666);

  const [isAdminVisible, setIsAdminVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 666);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAdminBlock = () => {
    setIsAdminVisible(!isAdminVisible);
  };
  return (
    <>
      <section className="personal">
        <div className="personal__container">
          <div
            className={`personal__admin ${
              isSmallScreen && isAdminVisible ? "hidden" : ""
            }`}
          >
            <div className="personal__user">Hello, Antonina!</div>
            <AdminLink />
          </div>
          <div
            className={`personal__inner ${
              isSmallScreen && !isAdminVisible ? "hidden" : ""
            }`}
          >
            <div onClick={toggleAdminBlock} className="personal__title">
            <div className="personal__title-inner">
                <img className="personal__left" src={Left} alt="" />
                <Title text="Personal data" />
            </div>
              <div className="personal__icon">
                <img src={Edit} alt="" />
              </div>
            </div>
            <div className="personal__content">
              <div className="personal__data">
                <div className="personal__data-item">
                  <p className="personal__data-const">Name</p>
                  <p>Antonina</p>
                </div>
                <div className="personal__data-item">
                  <p className="personal__data-const">Surname</p>
                  <p>Synelnyk</p>
                </div>
                <div className="personal__data-item">
                  <p className="personal__data-const">Phone</p>
                  <p>+380 63 629 73 28</p>
                </div>
                <div className="personal__data-item">
                  <p className="personal__data-const">Email</p>
                  <p>antonina_luk@ukr.net</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HotPriceContainer className="hotprice-personal" />
        <Subscribe customClass="personal__subscribe" />
      </section>
    </>
  );
};

export default PersonalData;
