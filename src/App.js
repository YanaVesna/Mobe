/* cd domains/Mobe/back-end  php artisan migrate:fresh --seed  */

/* mobe 
mobe.test.mobe.test@gmail.com   1
 mobe123456789 */
/* 111122*/
import React, { useEffect } from "react";
import "./scss/app.scss";

import Home from "./pages/Home.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/Signin.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Registration from "./pages/Registration.jsx";
import NotFound from "./pages/NotFound.jsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.jsx";
import ProductCard from "./pages/ProductCard/ProductCard.jsx";
import AccessoriesCard from "./pages/AccessoriesCard/AccessoriesCard.jsx";
import ComparePage from "./pages/ComparePage/ComparePage.jsx";
import WishList from "./pages/WishList/WishList.jsx";
import PersonalData from "./pages/PersonalData/PersonalData.jsx";
import OrderPage from "./components/OrderPage/OrderPage.jsx";

import ProductPage from "./pages/FilteredProducts/ProductList.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

export const CategoryContext = React.createContext();
export const RegistrationActiveContext = React.createContext();
export const SignInActiveContext = React.createContext();
export const ReviewsActiveContext = React.createContext();
export const isLoggedInContext = React.createContext();
export const userContext = React.createContext();
export const NameContext = React.createContext();
export const SurnameContext = React.createContext();
export const PhonenumberContext = React.createContext();
export const SearchContext = React.createContext();
export const ForgotPasswordActiveContext = React.createContext();
export const ResetPasswordActiveContext = React.createContext();
export const ShoppingCartActiveContext = React.createContext();
export const DesktopContext = React.createContext();
export const TabletContext = React.createContext();
export const MobileContext = React.createContext();
export const CatalogOpenedContext = React.createContext();
export const ProductsOpenedContext = React.createContext();
export const GetCatalogContext = React.createContext();
export const GetNummerStar = React.createContext();
export const GetTypeSort = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryValue, setCategoryValue] = React.useState("");
  const [registrationActive, setRegistrationActive] = React.useState(false);
  const [signInActive, setSignInActive] = React.useState(false);
  const [reviewsActive, setReviewsActive] = React.useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = React.useState(false);
  const [resetPasswordActive, setResetPasswordActive] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [name, setName] = React.useState({
    name: "",
  });
  const [surname, setSurname] = React.useState({
    surname: "",
  });
  const [phone, setPhone] = React.useState({
    phone: "",
  });

  const [shoppingCartActive, setShoppingCartActive] = React.useState(false);

  const [tablet, setTablet] = React.useState(
    window.innerWidth < 851 && window.innerWidth > 430 ? true : false
  );

  const [mobile, setMobile] = React.useState(
    window.innerWidth < 431 ? true : false
  );

  const [desktop, setDesktop] = React.useState(
    window.innerWidth > 850 ? true : false
  );

  const location = useLocation();

  const [catalogOpened, setCatalogOpened] = React.useState(false);

  React.useEffect(() => {
    const savedCatalogOpened = JSON.parse(
      localStorage.getItem("catalogOpened")
    );
    if (
      desktop &&
      location.pathname === "/" &&
      !catalogOpened &&
      savedCatalogOpened !== true
    ) {
      setCatalogOpened(true);
      localStorage.setItem("firstRender", JSON.stringify(true));
    }
  }, []);

  const [productsOpened, setProductsOpened] = React.useState(false);

  const [category, setCategory] = React.useState([]);

  const [nummerStar, setNummerStar] = React.useState(0);

  const [typeSort, setTypeSort] = React.useState("created_at");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    if (!mobile) {
      if (scrollPosition > 50) {
        setCatalogOpened(false);
        setProductsOpened(false);
      }
    } else {
      return;
    }
  });

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("newSession")) === null) {
      if (
        localStorage.getItem("user") !== null &&
        JSON.parse(localStorage.getItem("user")).rememberMe === true
      ) {
        setUser(JSON.parse(localStorage.getItem("user")));
        setIsLoggedIn(true);
      } else if (
        localStorage.getItem("user") !== null &&
        JSON.parse(localStorage.getItem("user")).rememberMe !== true
      ) {
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
      }
    } else {
      if (localStorage.getItem("user") !== null) {
        setUser(JSON.parse(localStorage.getItem("user")));
        setIsLoggedIn(true);
      }
    }
  }, []);

  window.addEventListener("resize", function () {
    if (window.innerWidth < 431) {
      return setMobile(true) || setTablet(false) || setDesktop(false);
    } else if (window.innerWidth < 851 && window.innerWidth > 430) {
      return setTablet(true) || setMobile(false) || setDesktop(false);
    } else {
      return setDesktop(true) || setMobile(false) || setTablet(false);
    }
  });

  return (
    <div className="App">
      <GetTypeSort.Provider value={{ typeSort, setTypeSort }}>
        <GetNummerStar.Provider value={{ nummerStar, setNummerStar }}>
          <ProductsOpenedContext.Provider
            value={{ productsOpened, setProductsOpened }}
          >
            <GetCatalogContext.Provider value={{ category, setCategory }}>
              <CatalogOpenedContext.Provider
                value={{ catalogOpened, setCatalogOpened }}
              >
                <MobileContext.Provider value={{ mobile, setMobile }}>
                  <TabletContext.Provider value={{ tablet, setTablet }}>
                    <DesktopContext.Provider value={{ desktop, setDesktop }}>
                      <ShoppingCartActiveContext.Provider
                        value={{ shoppingCartActive, setShoppingCartActive }}
                      >
                        <SearchContext.Provider
                          value={{ searchValue, setSearchValue }}
                        >
                          <PhonenumberContext.Provider
                            value={{ phone, setPhone }}
                          >
                            <SurnameContext.Provider
                              value={{ surname, setSurname }}
                            >
                              <NameContext.Provider value={{ name, setName }}>
                                <userContext.Provider value={{ user, setUser }}>
                                  <isLoggedInContext.Provider
                                    value={{ isLoggedIn, setIsLoggedIn }}
                                  >
                                    <RegistrationActiveContext.Provider
                                      value={{
                                        registrationActive,
                                        setRegistrationActive,
                                      }}
                                    >
                                      <SignInActiveContext.Provider
                                        value={{
                                          signInActive,
                                          setSignInActive,
                                        }}
                                      >
                                        <ReviewsActiveContext.Provider
                                          value={{
                                            reviewsActive,
                                            setReviewsActive,
                                          }}
                                        >
                                          <ForgotPasswordActiveContext.Provider
                                            value={{
                                              forgotPasswordActive,
                                              setForgotPasswordActive,
                                            }}
                                          >
                                            <ResetPasswordActiveContext.Provider
                                              value={{
                                                resetPasswordActive,
                                                setResetPasswordActive,
                                              }}
                                            >
                                              <Header />

                                              <Routes>
                                                <Route
                                                  path="/NotFound"
                                                  element={<NotFound />}
                                                />
                                                <Route
                                                  path="/login"
                                                  element={<LoginPage />}
                                                />
                                                <Route
                                                  path="/"
                                                  element={<Home />}
                                                />

                                                <Route
                                                  path="/*"
                                                  element={<Home />}
                                                />
                                                <Route
                                                  path="/compare"
                                                  element={<ComparePage />}
                                                />
                                                <Route
                                                  path="/wishList"
                                                  element={<WishList />}
                                                />
                                                <Route
                                                  path="/order-page"
                                                  element={<OrderPage />}
                                                />
                                                <Route
                                                  path="/personal-data"
                                                  element={<PersonalData />}
                                                />
                                                <Route
                                                  path="/product-card"
                                                  element={<ProductCard />}
                                                />

                                                <Route
                                                  path="/product-page"
                                                  element={
                                                    <ErrorBoundary>
                                                      <ProductPage />
                                                    </ErrorBoundary>
                                                  }
                                                />

                                                <Route
                                                  path="/product-page/:label/:page/:series"
                                                  element={<ProductPage />}
                                                />
                                                <Route
                                                  path={`/product-card/:itemDate`}
                                                  element={<ProductCard />}
                                                />
                                                <Route
                                                  path={`/accessories-card`}
                                                  element={<AccessoriesCard />}
                                                />
                                                <Route
                                                  path="/reset-password"
                                                  element={<ResetPassword />}
                                                />
                                              </Routes>

                                              <Footer />

                                              <div
                                                style={
                                                  signInActive === true
                                                    ? { display: "flex" }
                                                    : { display: "none" }
                                                }
                                                className="overlaySignIn"
                                              />
                                              <CategoryContext.Provider
                                                value={{
                                                  categoryValue,
                                                  setCategoryValue,
                                                }}
                                              >
                                                <div
                                                  style={
                                                    signInActive === true
                                                      ? { display: "flex" }
                                                      : { display: "none" }
                                                  }
                                                  className="overlaySignIn"
                                                >
                                                  <LoginPage />
                                                </div>
                                                <div
                                                  style={
                                                    registrationActive === true
                                                      ? {
                                                          display: "flex",
                                                          zIndex: "1500",
                                                        }
                                                      : { display: "none" }
                                                  }
                                                  className="overlayRegistration"
                                                >
                                                  <Registration />
                                                </div>
                                                <div
                                                  style={
                                                    forgotPasswordActive ===
                                                    true
                                                      ? {
                                                          display: "flex",
                                                          zIndex: "1500",
                                                        }
                                                      : { display: "none" }
                                                  }
                                                  className="overlayForgotPassword"
                                                >
                                                  <ForgotPassword />
                                                </div>
                                                <div
                                                  style={
                                                    shoppingCartActive === true
                                                      ? {
                                                          display: "flex",
                                                          zIndex: "1500",
                                                        }
                                                      : { display: "none" }
                                                  }
                                                  className="overlayShoppingCart"
                                                >
                                                  <ShoppingCart />
                                                </div>
                                              </CategoryContext.Provider>
                                            </ResetPasswordActiveContext.Provider>
                                          </ForgotPasswordActiveContext.Provider>
                                        </ReviewsActiveContext.Provider>
                                      </SignInActiveContext.Provider>
                                    </RegistrationActiveContext.Provider>
                                  </isLoggedInContext.Provider>
                                </userContext.Provider>
                              </NameContext.Provider>
                            </SurnameContext.Provider>
                          </PhonenumberContext.Provider>
                        </SearchContext.Provider>
                      </ShoppingCartActiveContext.Provider>
                    </DesktopContext.Provider>
                  </TabletContext.Provider>
                </MobileContext.Provider>
              </CatalogOpenedContext.Provider>
            </GetCatalogContext.Provider>
          </ProductsOpenedContext.Provider>
        </GetNummerStar.Provider>
      </GetTypeSort.Provider>
    </div>
  );
}

export default App;
