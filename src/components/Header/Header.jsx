import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  SignInActiveContext,
  userContext,
  isLoggedInContext,
  SearchContext,
  ShoppingCartActiveContext,
  DesktopContext,
  TabletContext,
  MobileContext,
  CatalogOpenedContext,
} from "../../App.js";
import ComparePageLink from "../ComparePageLink/ComparePageLink.jsx";
import ContactUs from "../ContactUs";
import "./style.scss";
import WishListPageLink from "../WishListPageLink/WishListPageLink.jsx";
import Search from "../Search/Search.jsx";

function Header() {
  const location = useLocation(); //location.pathname
  const { items } = useSelector((state) => state.cartAdd);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const isSearch = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);
  const search = searchValue ? `&search=${searchValue}` : "";

  const { setSignInActive } = React.useContext(SignInActiveContext);

  const { setUser } = React.useContext(userContext);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(isLoggedInContext);

  const { setShoppingCartActive } = React.useContext(ShoppingCartActiveContext);
  const { desktop } = React.useContext(DesktopContext);
  const { tablet } = React.useContext(TabletContext);
  const { mobile } = React.useContext(MobileContext);
  const { catalogOpened, setCatalogOpened } =
    React.useContext(CatalogOpenedContext);

  const logOutUser = () => {
    setUser({
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      rememberMe: false,
    });
    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };

  const onClickSignin = () => {
    setSignInActive(true);
  };

  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }
    isMounted.current = true;
  }, [items]);

  const wrapRef4 = useRef(null);
  const handClick4 = (event) => {
    if (wrapRef4.current && wrapRef4.current.contains(event.target))
      setCatalogOpened((prevState) => !prevState);
  };

  const wrapRef = useRef(null);
  const handClick = (event) => {
    if (wrapRef.current && wrapRef.current.contains(event.target))
      setCatalogOpened((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handClick4 || handClick);
    return () => {
      document.removeEventListener("mousedown", handClick4 || handClick);
    };
  }, []);

  return (
    <div className="header">
      <div className="header__light">
        <div className="header__container">
          <div className="header__light2">
            {catalogOpened ? (
              <svg
                onClick={() => setCatalogOpened(false)}
                style={mobile ? { display: "flex" } : { display: "none" }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M0.999756 17L16.9996 1.00013"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.9998 17L0.999888 1.00013"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                onClick={() => setCatalogOpened(true)}
                style={mobile ? { display: "flex" } : { display: "none" }}
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="18"
                viewBox="0 0 26 18"
                fill="none"
              >
                <path
                  d="M25 9H0.999999"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 1H0.999999"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 17H0.999999"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <Link to="/">
              <Logo />
            </Link>
            <div style={mobile ? { display: "none" } : { display: "flex" }}>
              <ContactUs />
            </div>

            <div
              style={mobile ? { display: "flex" } : { display: "none" }}
              className="header__svg-box"
            >
              <svg
                onClick={onClickSignin}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="#28003E"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <svg
                onClick={() => {
                  setShoppingCartActive(true);
                }}
                style={mobile ? { display: "flex" } : { display: "none" }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z"
                  stroke="#28003E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="header__count2">{totalCount}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="header__dark"
        style={
          catalogOpened && mobile ? { display: "none" } : { display: "block" }
        }
      >
        <div className="header__container">
          <div className="header__buttons">
            <div className="header__boxbuttons">
              <div
                style={mobile ? { display: "none" } : { display: "flex" }}
                className="header__catalog"
                ref={wrapRef4}
              >
                <p>Catalog of goods</p>
                {!catalogOpened ? (
                  <svg
                    ref={wrapRef}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
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
                    ref={wrapRef}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="#FDFDFD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <Search />
              {isLoggedIn ? (
                <button className="header__signin" onClick={logOutUser}>
                  Sign out
                </button>
              ) : desktop ? (
                <button className="header__signin" onClick={onClickSignin}>
                  Sign in
                </button>
              ) : (
                ""
              )}
            </div>
            <div
              style={mobile ? { display: "none" } : { display: "flex" }}
              className="header__icons"
            >
              <WishListPageLink className="relative" />
              <ComparePageLink className="relative" />

              {tablet ? (
                <svg
                  onClick={onClickSignin}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#FDFDFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                ""
              )}

              <div
                onClick={() => {
                  setShoppingCartActive(true);
                }}
                className="header__wagen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 20.4477 19.4477 20 20 20C20.5523 20 21 20.4477 21 21Z"
                    stroke="#FDFDFD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="header__count">{totalCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={
          catalogOpened && mobile ? { display: "flex" } : { display: "none" }
        }
        className="header__mobile"
      >
        <div className="header__mobile-box">
          <ContactUs />

          <div className="header__mobile-icons">
            <WishListPageLink className="mobile" />
            <ComparePageLink className="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
