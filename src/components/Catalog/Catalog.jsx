import React, { useRef, useState, useEffect } from "react";
import useOutsideClick from "../../utils/useOutsideClick.jsx";
import styles from "./MenuNav.module.scss";
import cn from "classnames";
import IconClose from "../IconsClose/IconClose.jsx";
import IconOpen from "../IconsClose/IconOpen.jsx";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  MobileContext,
  CatalogOpenedContext,
  GetCatalogContext,
  ProductsOpenedContext,
} from "../../App.js";
import {
  setLabel,
  setPage,
  setSeries,
  setSearch,
} from "../../redux/slices/filterSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const { mobile } = React.useContext(MobileContext);
  const [menuCatalogMobileOpened, setMenuCatalogMobileOpened] = React.useState(
    mobile ? false : true
  );
  const { category, setCategory } = React.useContext(GetCatalogContext);

  const { catalogOpened, setCatalogOpened } =
    React.useContext(CatalogOpenedContext);
  const [menuData, setMenuData] = useState([]);
  const { productsOpened, setProductsOpened } = React.useContext(
    ProductsOpenedContext
  );

  const navigate = useNavigate();
  const uniqueSeries = [];

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (catalogOpened === true) {
      setMenuData(products);
      const transformedData = transformData(products);
      setCategory(transformedData);
    }
  }, [catalogOpened, products, setCategory]);

  const transformData = (data) => {
    const transformedData = [];

    data.forEach((item) => {
      const categoryIndex = transformedData.findIndex(
        (cat) => cat.label === item.category.name
      );

      if (categoryIndex === -1) {
        transformedData.push({
          label: item.category.name,
          submenu: item.name ? [{ label: item.name }] : null,
          category_id: item.category_id,
        });
      } else {
        if (item.name) {
          transformedData[categoryIndex].submenu = [
            ...(transformedData[categoryIndex].submenu || []),
            { label: item.name },
          ];
        }
      }
    });

    return transformedData;
  };

  const catalogList = category;

  const MenuItem = ({ item }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const handleSubMenuToggle = () => {
      setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
      <li>
        <div onClick={handleSubMenuToggle}>{item.label}</div>
        {isSubMenuOpen && item.submenu && <SubMenu items={item.submenu} />}
      </li>
    );
  };

  const SubMenu = ({ items }) => {
    return (
      <ul
        style={
          menuCatalogMobileOpened ? { display: "flex" } : { display: "none" }
        }
      >
        {items.map((subItem, index) => (
          <MenuItem key={index} item={subItem} />
        ))}
      </ul>
    );
  };

  const boxRef = React.createRef();

  const handleMouseEnter = () => {
    setProductsOpened(true);
  };

  const handleMouseLeave = () => {
    setProductsOpened(true);
  };

  const a = (x) => {
    return 200 + x * 42 + x * 6;
  };

  const wrapRef = useRef(null);

  const getCloseOpen = () => {
    setCatalogOpened((prevState) => !prevState);
  };

  useOutsideClick(wrapRef, getCloseOpen);

  const getFilterPage = (label, page, series) => {
    dispatch(setLabel([label]));
    dispatch(setPage(page));
    dispatch(setSeries(series.length === 0 ? series : [series]));
    dispatch(setSearch(""));
    setCatalogOpened(false);
    navigate(`/product-page`);
  };

  return (
    <>
      {category && catalogOpened && (
        <nav className={styles.menu} role="navigation">
          <div
            ref={mobile ? null : wrapRef}
            className={cn(styles.cover, {
              [styles.coverShow]: catalogOpened,
            })}
          />
          <div
            ref={mobile ? null : wrapRef}
            className={cn(styles.mobileMenuBox, {
              [styles.mobileMenuBoxShow]: catalogOpened,
            })}
          >
            <div
              onClick={() =>
                setMenuCatalogMobileOpened(!menuCatalogMobileOpened)
              }
              className={styles.mobileMenuTitle}
              style={mobile ? { display: "flex" } : { display: "none" }}
            >
              <p>Catalog of goods</p>
              {!menuCatalogMobileOpened ? <IconClose /> : <IconOpen />}
            </div>
            <ul
              style={
                menuCatalogMobileOpened
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              {catalogList.map((obj, i) => (
                <li
                  ref={boxRef}
                  key={i}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                >
                  <div className={styles.li_box}>
                    <a
                      href="##"
                      onClick={(e) => {
                        e.preventDefault();
                        getFilterPage(obj.label, "sortBrand", []);
                      }}
                    >{`${obj.label} phones`}</a>
                    {mobile ? (
                      <svg
                        onClick={() => setProductsOpened(true)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#FDFDFD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setProductsOpened(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#FDFDFD"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <ul
                    style={
                      mobile
                        ? productsOpened
                          ? {
                              visibility: "visible",
                              top: a(obj.category_id),
                              height: 336,
                            }
                          : { visibility: "hidden" }
                        : { width: 300 }
                    }
                  >
                    {menuData
                      .filter((cat) => cat.category_id === obj.category_id)
                      .map((object, i) => {
                        if (!uniqueSeries.includes(object.series)) {
                          uniqueSeries.push(object.series);
                          return (
                            <li key={i}>
                              <a
                                href="##"
                                onClick={(e) => {
                                  e.preventDefault();
                                  getFilterPage(
                                    obj.label,
                                    "sortSeries",
                                    object.series
                                  );
                                }}
                              >
                                {object.series}
                              </a>
                            </li>
                          );
                        }
                        return null; // Если серия уже отображена, возвращаем null
                      })}
                    <div
                      onClick={() => getFilterPage(obj.label, "sortBrand", "")}
                      className={styles.cat_log}
                    >
                      <span>View all</span>
                    </div>
                  </ul>
                </li>
              ))}
            </ul>
            <div
              className={styles.mobileMenuFooter}
              style={mobile ? { display: "flex" } : { display: "none" }}
            >
              <a href="##">Contacts</a>
              <a href="##">Delivery and payment</a>
              <a href="##">Returns and exchanges</a>
              <a href="##">Privacy Policy</a>
              <a href="##">Security Policy</a>
              <a href="##">Terms of use</a>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Catalog;
