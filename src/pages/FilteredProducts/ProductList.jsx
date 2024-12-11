import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { connect } from "react-redux";
import {
  CatalogOpenedContext,
  SearchContext,
  MobileContext,
} from "../../App.js";

import ProductCard from "../../components/ProductCard/ProductCard";
import debounce from "lodash.debounce";
import Cross from "./Image/iconCross.svg";
import iconCheckOpen from "./Image/iconCheckOpen.svg";
import Open from "./Image/iconOpen.svg";
import Close from "./Image/iconClose.svg";
import MenuStep from "../../components/MenuStep/MenuStep.jsx";
import ErrorBoundary from "../../components/ErrorBoundary";
import Catalog from "../../components/Catalog/Catalog.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import PromotionContainer from "../../Containers/PromotionsContainer/PromotionsContainer.jsx";
import Skeleton from "../../components/Skeleton/Skeleton.jsx";

import "./style.scss";
import Subscribe from "../../components/Subscribe/Subscribe.jsx";

import { setLabel, setSeries, setSearch } from "../../redux/slices/filterSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const label = useSelector((state) => state.filter.label);
  const series = useSelector((state) => state.filter.series);
  const search = useSelector((state) => state.filter.search);
  const { mobile } = React.useContext(MobileContext);

  const [currentPage, setCurrentPage] = React.useState(1);

  const products = useSelector((state) => state.products.products);

  const { setSearchValue } = React.useContext(SearchContext);

  const { catalogOpened } = React.useContext(CatalogOpenedContext);

  const [showSeriesCheckboxes, setShowSeriesCheckboxes] = useState(true);
  const [showBrandsCheckboxes, setShowBrandsCheckboxes] = useState(true);
  const [showPrices, setShowPrices] = useState(true);
  const [showMemoriesCheckboxes, setShowMemoriesCheckboxes] = useState(true);
  const [showDiagonalesCheckboxes, setShowDiagonalesCheckboxes] =
    useState(true);
  const [showRefreshRateCheckboxes, setShowRefreshRateCheckboxes] =
    useState(true);
  const [showScreenResolutionsCheckboxes, setShowScreenResolutionsCheckboxes] =
    useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [allSeries, setAllSeries] = useState([]);
  const [allMemories, setAllMemories] = useState([]);
  const [allDiagonales, setAllDiagonales] = useState([]);
  const [allRefreshRates, setAllRefreshRates] = useState([]);
  const [allScreenResolutions, setAllScreenResolutions] = useState([]);
  const [filterIsOpened, setFilterIsOpened] = useState(mobile ? false : true);

  console.log(mobile, "mobile?", filterIsOpened, "filterIsOpened");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const allSerie = Array.from(
      new Set(products.map((product) => product.series))
    );

    const filterSeriesNull = allSerie.filter((ser) => ser !== null);
    setAllSeries(filterSeriesNull);
  }, [products]);

  useEffect(() => {
    const allMemory = Array.from(
      new Set(products.map((product) => product.built_in_memory))
    );
    const filterSeriesNull = allMemory.filter((mem) => mem !== null);
    setAllMemories(filterSeriesNull);
  }, [products]);

  useEffect(() => {
    const allDiagonal = Array.from(
      new Set(products.map((product) => product.display_diagonal))
    );

    const filterSeriesNull = allDiagonal.filter((diag) => diag !== null);
    setAllDiagonales(filterSeriesNull);
  }, [products]);

  useEffect(() => {
    const allRefreshRate = Array.from(
      new Set(products.map((product) => product.screen_refresh_rate))
    );

    const filterRefreshRateNull = allRefreshRate.filter(
      (rate) => rate !== null
    );
    setAllRefreshRates(filterRefreshRateNull);
  }, [products]);

  useEffect(() => {
    const allScreenResolution = Array.from(
      new Set(products.map((product) => product.display_resolution))
    );

    const filterScreenResolutionNull = allScreenResolution.filter(
      (rate) => rate !== null
    );
    setAllScreenResolutions(filterScreenResolutionNull);
  }, [products]);

  const [selectedBrands, setSelectedBrands] = useState(label);

  const [selectedModels, setSelectedModels] = useState(series);

  const [selectedMemories, setSelectedMemories] = useState([]);
  const [selectedDiagonales, setSelectedDiagonales] = useState([]);

  const [selectedRefreshRates, setSelectedRefreshRates] = useState([]);

  const [selectedScreenResolutions, setSelectedScreenResolutions] = useState(
    []
  );

  const [sortOption, setSortOption] = useState("newest");

  const handleBrandChange = (brand) => {
    const selectedBrandsFilter = selectedBrands.filter((brand) => brand !== "");

    const updatedBrands = selectedBrandsFilter.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrandsFilter, brand];

    const filterProducts = Array.from(
      new Set(
        products.filter(
          (product) =>
            updatedBrands.length === 0 ||
            updatedBrands.includes(product.category.name)
        )
      )
    );

    const brandSeries = filterProducts
      .map((product) => product.series)
      .filter((series) => series !== null);

    const uniqueSeries = Array.from(new Set(brandSeries));

    const brandMemories = filterProducts
      .map((product) => product.built_in_memory)
      .filter((mem) => mem !== null);

    const uniqueMemories = Array.from(new Set(brandMemories));

    const brandDiagonales = filterProducts
      .map((product) => product.display_diagonal)
      .filter((diag) => diag !== null);

    const brandRefreshRates = filterProducts
      .map((product) => product.screen_refresh_rate)
      .filter((rate) => rate !== null);

    const brandScreenResolutions = filterProducts
      .map((product) => product.display_resolution)
      .filter((resolution) => resolution !== null);

    const uniqueDiagonales = Array.from(new Set(brandDiagonales));

    const uniqueRefreshRates = Array.from(new Set(brandRefreshRates));

    setAllSeries(uniqueSeries);
    setAllMemories(uniqueMemories);
    setAllDiagonales(uniqueDiagonales);
    setAllRefreshRates(uniqueRefreshRates);
    setSelectedBrands(updatedBrands);

    setSelectedModels(
      selectedModels.filter((model) => brandSeries.includes(model))
    );

    setSelectedMemories(
      selectedMemories.filter((memory) => brandMemories.includes(memory))
    );

    setSelectedDiagonales(
      selectedDiagonales.filter((diagonal) =>
        brandDiagonales.includes(diagonal)
      )
    );

    setSelectedRefreshRates(
      selectedRefreshRates.filter((rate) => brandRefreshRates.includes(rate))
    );

    setSelectedScreenResolutions(
      selectedScreenResolutions.filter((resolution) =>
        brandScreenResolutions.includes(resolution)
      )
    );

    dispatch(setLabel(updatedBrands));
    if (productsToShow1.length > productsPerPage) {
      setCurrentPage(1);
    }
  };

  const handleCheckboxChange = (type, value) => {
    let selectedArray, setSelectedArray;

    switch (type) {
      case "model":
        selectedArray = selectedModels;
        setSelectedArray = setSelectedModels;
        break;
      case "memory":
        selectedArray = selectedMemories;
        setSelectedArray = setSelectedMemories;
        break;
      case "diagonal":
        selectedArray = selectedDiagonales;
        setSelectedArray = setSelectedDiagonales;
        break;
      case "refresh_rates":
        selectedArray = selectedRefreshRates;
        setSelectedArray = setSelectedRefreshRates;
        break;
      case "screen_resolutiones":
        selectedArray = selectedScreenResolutions;
        setSelectedArray = setSelectedScreenResolutions;
        break;

      default:
        return;
    }

    if (selectedArray.includes(value)) {
      setSelectedArray(
        selectedArray.filter((selectedValue) => selectedValue !== value)
      );
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const countProductsInFilter = (filterType, value) => {
    return products.filter((product) => {
      switch (filterType) {
        case "brand":
          return product.category.name === value && isInPriceRange(product);
        case "model":
          return product.series === value && isInPriceRange(product);
        case "memory":
          return product.built_in_memory === value && isInPriceRange(product);
        case "diagonal":
          return product.display_diagonal === value && isInPriceRange(product);
        case "refresh_rates":
          return (
            product.screen_refresh_rate === value && isInPriceRange(product)
          );
        case "screen_resolutiones":
          return (
            product.display_resolution === value && isInPriceRange(product)
          );

        default:
          return false;
      }
    }).length;
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setMinPrice(str);
    }, 20),
    []
  );

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    updateSearchValue(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const isInPriceRange = (product) => {
    const isInRange =
      (minPrice === "" || parseFloat(product.price) >= parseFloat(minPrice)) &&
      (maxPrice === "" || parseFloat(product.price) <= parseFloat(maxPrice));
    return isInRange;
  };

  useEffect(() => {
    setSelectedModels(series);
    setSelectedBrands(label);
  }, [series, label]);

  const filteredProducts = products.filter((product) => {
    const isInSelectedBrands =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.category.name);

    const isInSelectedModels =
      selectedModels.length === 0 || selectedModels.includes(product.series);

    const isInSelectedMemories =
      selectedMemories.length === 0 ||
      selectedMemories.includes(product.built_in_memory);

    const isInSelectedDiagonales =
      selectedDiagonales.length === 0 ||
      selectedDiagonales.includes(product.display_diagonal);

    const isInSelectedRefreshRate =
      selectedRefreshRates.length === 0 ||
      selectedRefreshRates.includes(product.screen_refresh_rate);
    const isInSelectedScreenResolution =
      selectedScreenResolutions.length === 0 ||
      selectedScreenResolutions.includes(product.display_resolution);

    return (
      isInSelectedBrands &&
      isInSelectedModels &&
      isInSelectedMemories &&
      isInSelectedDiagonales &&
      isInSelectedRefreshRate &&
      isInSelectedScreenResolution &&
      isInPriceRange(product)
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === "lowToHigh") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === "highToLow") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    return 0;
  });

  const innerOpenClose = (toShow, setToShow) => {
    return (
      <button onClick={() => setToShow(!toShow)}>
        {!toShow ? (
          <img src={Open} alt="open" />
        ) : (
          <img src={Close} alt="close" />
        )}
      </button>
    );
  };

  const getCancel = () => {
    dispatch(setLabel([]));
    dispatch(setSeries([]));
    dispatch(setSearch(""));
    setSearchValue("");
    setMinPrice("");
    setMaxPrice("");
  };

  //Пагинация
  const productsPerPage = mobile ? 4 : 21;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const productsToShow1 = sortedProducts.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase())
  );
  const productsToShow = productsToShow1.slice(startIndex, endIndex);

  const totalProducts = productsToShow1.length;
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  //конец пагинации

  const loading = useSelector((state) => state.products.loading);

  const error = useSelector((state) => state.products.error);

  const skeletons = [...new Array(productsPerPage)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const sortBox = () => {
    return (
      <div className="sort">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="newest">Newest first</option>
          <option value="lowToHigh">Price-low to hight</option>
          <option value="highToLow">Price-hight to low</option>
          <option value="highToLow">Most popular</option>
        </select>
      </div>
    );
  };

  const filteredCard = true;

  return (
    <div className="filter__container">
      {catalogOpened && (
        <ErrorBoundary>
          <Catalog />
        </ErrorBoundary>
      )}
      {mobile ? "" : <MenuStep />}
      <div
        className="filter__openContainer"
        style={mobile ? { display: "flex" } : { display: "none" }}
      >
        {sortBox()}
        <div className="filter__open">
          <img
            onClick={() => setFilterIsOpened(!filterIsOpened)}
            src={iconCheckOpen}
            alt="cross"
            style={filterIsOpened ? { display: "none" } : { display: "flex" }}
          />
          <img
            onClick={() => setFilterIsOpened(!filterIsOpened)}
            src={Cross}
            alt="cross"
            style={!filterIsOpened ? { display: "none" } : { display: "flex" }}
          />
        </div>
      </div>
      <div
        className="filter__isOpened"
        /*  style={!filterIsOpened ? { display: "flex" } : { display: "none" }} */
      >
        <div className="filter__choice">
          <div className="filter__choice-box">
            <div className="selected-products-box">
              <div className="selected-products">
                {totalProducts} products are selected
              </div>
              <div className="selected-cancel" onClick={() => getCancel()}>
                Cancel
              </div>{" "}
            </div>
            <div className="selected-brandbox">
              {selectedBrands && selectedBrands.length !== 0 && (
                <div
                  className="selected-brands"
                  style={
                    selectedBrands && selectedBrands.length !== 0
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  {selectedBrands &&
                    selectedBrands.length !== 0 &&
                    selectedBrands.map((brand) => (
                      <div key={brand} className="selected-brand">
                        {brand}
                        <img
                          onClick={() => handleBrandChange(brand)}
                          src={Cross}
                          alt="cross"
                        />
                      </div>
                    ))}
                </div>
              )}

              {selectedModels.length !== 0 &&
                selectedModels.map((series, index) => (
                  <div
                    key={`model_${index}`}
                    className="selected-brand"
                    style={
                      selectedModels !== 0
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    {series}
                    <img
                      /* onClick={() => handleModelChange(series)} */
                      onClick={() => handleCheckboxChange("model", series)}
                      src={Cross}
                      alt="cross"
                    />
                  </div>
                ))}
            </div>
          </div>
          {mobile ? "" : sortBox()}
        </div>
        <div className="filter__inner">
          <div
            className="filter"
            style={!filterIsOpened ? { display: "none" } : { display: "flex" }}
          >
            <div className="inner-box">
              <div className="all-inner">
                <h2>Brand</h2>
                {innerOpenClose(showBrandsCheckboxes, setShowBrandsCheckboxes)}
              </div>
              {showBrandsCheckboxes &&
                Array.from(
                  new Set(products.map((product) => product.category.name))
                ).map((brand, index) => (
                  <label className="filter__box" key={index}>
                    <input
                      type="checkbox"
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="checkbox-custom"
                    />
                    {brand} ({countProductsInFilter("brand", brand)})
                  </label>
                ))}
            </div>
            <div className="inner-box">
              <div className="all-inner">
                <h2>Series</h2>
                {innerOpenClose(showSeriesCheckboxes, setShowSeriesCheckboxes)}
              </div>
              {showSeriesCheckboxes && (
                <div className="models">
                  {allSeries.map((model, index) => (
                    <label className="filter__box" key={index}>
                      <input
                        type="checkbox"
                        value={model}
                        checked={selectedModels.includes(model)}
                        onChange={() => handleCheckboxChange("model", model)}
                      />
                      {model} ({countProductsInFilter("model", model)})
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="price">
              <div className="all-inner">
                <h2>Price, $</h2>
                {innerOpenClose(showPrices, setShowPrices)}
              </div>
              {showPrices && (
                <div className="price-block">
                  <label>
                    <p>$&nbsp;</p>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      inputMode="none"
                    />
                  </label>
                  <p>-</p>
                  <label>
                    <p>$&nbsp;</p>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      inputMode="none"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="inner-box">
              <div className="all-inner">
                <h2>Internal storage</h2>
                {innerOpenClose(
                  showMemoriesCheckboxes,
                  setShowMemoriesCheckboxes
                )}
              </div>
              {showMemoriesCheckboxes && (
                <div className="memories">
                  {allMemories.map((memory, index) => (
                    <label className="filter__box" key={index}>
                      <input
                        type="checkbox"
                        value={memory}
                        checked={selectedMemories.includes(memory)}
                        onChange={() => handleCheckboxChange("memory", memory)}
                      />
                      {memory} ({countProductsInFilter("memory", memory)})
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="inner-box">
              <div className="all-inner">
                <h2>Display size</h2>
                {innerOpenClose(
                  showDiagonalesCheckboxes,
                  setShowDiagonalesCheckboxes
                )}
              </div>
              {showDiagonalesCheckboxes && (
                <div className="diagonals">
                  {allDiagonales.map((diagonal, index) => (
                    <label className="filter__box" key={index}>
                      <input
                        type="checkbox"
                        value={diagonal}
                        checked={selectedDiagonales.includes(diagonal)}
                        onChange={() =>
                          handleCheckboxChange("diagonal", diagonal)
                        }
                      />
                      {diagonal} ({countProductsInFilter("diagonal", diagonal)})
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="inner-box">
              <div className="all-inner">
                <h2>Refresh rate</h2>
                {innerOpenClose(
                  showRefreshRateCheckboxes,
                  setShowRefreshRateCheckboxes
                )}
              </div>
              {showRefreshRateCheckboxes && (
                <div className="refresh_rates">
                  {allRefreshRates.map((rate, index) => (
                    <label className="filter__box" key={index}>
                      <input
                        type="checkbox"
                        value={rate}
                        checked={selectedRefreshRates.includes(rate)}
                        onChange={() =>
                          handleCheckboxChange("refresh_rates", rate)
                        }
                      />
                      {rate} ({countProductsInFilter("refresh_rates", rate)})
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className="inner-box">
              <div className="all-inner">
                <h2>Screen resolution</h2>
                {innerOpenClose(
                  showScreenResolutionsCheckboxes,
                  setShowScreenResolutionsCheckboxes
                )}
              </div>
              {showScreenResolutionsCheckboxes && (
                <div className="screen-resolution">
                  {allScreenResolutions.map((resolution, index) => (
                    <label className="filter__box" key={index}>
                      <input
                        type="checkbox"
                        value={resolution}
                        checked={selectedScreenResolutions.includes(resolution)}
                        onChange={() =>
                          handleCheckboxChange(
                            "screen_resolutiones",
                            resolution
                          )
                        }
                      />
                      {resolution} (
                      {countProductsInFilter("screen_resolutiones", resolution)}
                      )
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            className="products-list-box"
            style={
              filterIsOpened && mobile
                ? { display: "none" }
                : { display: "flex" }
            }
          >
            <div className="products-list">
              {loading ? (
                skeletons
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                productsToShow.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    filteredCard={filteredCard}
                  />
                ))
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onChangePage={(number) => setCurrentPage(number)}
            />
          </div>
        </div>
      </div>

      <PromotionContainer />
      <Subscribe />
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps)(ProductList);
