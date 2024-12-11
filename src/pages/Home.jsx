import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Slider from "../components/Sliders/SliderHome/Slider.jsx";
import LogosBlock from "../components/LogosBlock/LogosBlock.jsx";
import { CatalogOpenedContext } from "../App.js";
import MainContainer from "../Containers/MainContainer/MainContainer.jsx";
import Subscribe from "../components/Subscribe/Subscribe.jsx";
import Catalog from "../components/Catalog/Catalog.jsx";
import Chat from "../components/Chat/Chat";

const Home = () => {
  const { catalogOpened } = React.useContext(CatalogOpenedContext);

  return (
    <div className="home">
      <div className="home__container">
        {catalogOpened && (
          <ErrorBoundary>
            <Catalog />
          </ErrorBoundary>
        )}
      </div>
      <Slider />
      <LogosBlock />
      <Chat className="chat-home" />
      <MainContainer />
      <Subscribe />
    </div>
  );
};

export default Home;
