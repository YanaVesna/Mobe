import React, { useRef, useEffect } from "react";
import { ForgotPasswordActiveContext } from "../App";
import { Link } from "react-router-dom";
import axios from "../utils/axios.js";
import styles from "./Signin.module.scss";
import useInput from "../components/Validation";

const ForgotPassword = () => {
  const wrapRef = useRef(null);

  const { setForgotPasswordActive } = React.useContext(
    ForgotPasswordActiveContext
  );

  const forgotPassword = (e) => {
    e.preventDefault();

    const data = {
      email: e.target[0].value,
    };

    axios
      .post("/forgot-password", data)
      .then((res) => {
        console.log(11, res);
      })
      .catch((err) => {
        console.log(22, err);
      });
  };

  const emailValid = useInput("", {
    isEmpty: true,
    minLength: 2,
    falseSymbols: true,
  });

  const redColor = (e, x) =>
    e.isDirty &&
    (e.isEmpty ||
      e.falseSymbols ||
      (e.value.length < x && e.value.length !== 0))
      ? "input__error"
      : "input__box";

  const isEmpty = (e) =>
    e.isDirty &&
    e.isEmpty && <div className={styles.error}>The field is not filled</div>;

  const isLendth = (e, x) =>
    e.isDirty &&
    e.value.length < x &&
    e.value.length !== 0 && (
      <div className={styles.error}>Invalid field length</div>
    );

  const handClick = (event) => {
    if (wrapRef.current && !wrapRef.current.contains(event.target))
      setForgotPasswordActive(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handClick);
    return () => {
      document.removeEventListener("mousedown", handClick);
    };
  }, []);

  return (
    <form
      onSubmit={forgotPassword}
      className="forgotPassword-window"
      ref={wrapRef}
    >
      <div className="forgotPassword-box">
        <Link to="/">
          <svg
            onClick={() => setForgotPasswordActive(false)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_258_7121)">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#28003E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_258_7121">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>
      <div className="forgotPassword-field">
        <h1>Forgot password</h1>
        <p>
          Please enter your email address. You will receive a link to create a
          new password via email
        </p>
        <div className="forgotPassword-input">
          <label>Email address</label>
          <input
            value={emailValid.value}
            onChange={(e) => emailValid.onChange(e)}
            onBlur={(e) => emailValid.onBlur(e)}
            type="email"
            placeholder="example@email.com"
            className={redColor(emailValid, 2)}
          ></input>
          {isEmpty(emailValid)}
          {isLendth(emailValid, 2)}
          {emailValid.isDirty && emailValid.falseSymbols && (
            <div className={styles.error}>The field is not valid</div>
          )}
        </div>
        <button className="forgotPassword-button">Get new password</button>
      </div>
    </form>
  );
};

export default ForgotPassword;
