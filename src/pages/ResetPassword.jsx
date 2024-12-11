import React, { useRef, useEffect } from "react";
import { ResetPasswordActiveContext } from "../App";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Signin.module.scss";
import useInput from "../components/Validation";
import axios from "../utils/axios.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  const wrapRef = useRef(null);

  const { resetPasswordActive, setResetPasswordActive } = React.useContext(
    ResetPasswordActiveContext
  );

  const [eye1, setEye1] = React.useState(true);
  const [eye2, setEye2] = React.useState(true);
  const [searchParams] = useSearchParams();

  const onClickResetPassword = (e) => {
    e.preventDefault();
    const data = {
      password: e.target[0].value,
      password_confirmation: e.target[1].value,
      token: searchParams.get("token"),
      email: searchParams.get("email"),
    };
    axios
      .post("/reset-password", data)
      .then((res) => {
        console.log(res);
        setResetPasswordActive(false);
      })
      .catch((error) => {
        console.log("Error response:", error.response.data);
      });
  };

  const passwordValid = useInput("", {
    isEmpty: true,
    minLength: 8,
  });

  const passwordValid2 = useInput("", {
    isEmpty: true,
    minLength: 8,
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
      setResetPasswordActive(false);
  };

  useEffect(() => {
    if (!resetPasswordActive) {
      goBack();
    }
    document.addEventListener("mousedown", handClick);
    return () => {
      document.removeEventListener("mousedown", handClick);
    };
  }, [resetPasswordActive]);

  return (
    <div
      style={
        resetPasswordActive === true
          ? { display: "flex", "z-index": "1500" }
          : { display: "none" }
      }
      className="overlayResetPassword"
    >
      <form
        onSubmit={onClickResetPassword}
        className="resetpassword-window"
        ref={wrapRef}
      >
        <div className="resetpassword-box">
          <Link to="/">
            <svg
              onClick={() => setResetPasswordActive(false)}
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
        <div className="resetpassword-field">
          <h1>Reset password</h1>
          <p>Enter your new password below</p>
          <div className="resetpassword-input">
            <label>New password</label>
            <div className="resetpassword-eye">
              <input
                value={passwordValid.value}
                onChange={(e) => passwordValid.onChange(e)}
                onBlur={(e) => passwordValid.onBlur(e)}
                type={eye1 ? "password" : "text"}
                autoComplete="on"
                placeholder="your password"
                className={redColor(passwordValid, 8)}
              ></input>
              {isEmpty(passwordValid)}
              {isLendth(passwordValid, 8)}
              <span
                onClick={() => setEye1((prev) => !prev)}
                className={
                  passwordValid.isDirty &&
                  (passwordValid.isEmpty ||
                    (passwordValid.value.length < 8 &&
                      passwordValid.value.length !== 0))
                    ? "resetpassword-form-eye-error"
                    : "resetpassword-form-eye"
                }
              >
                {eye1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06L17.94 17.94Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <div className="resetpassword-input">
            <label>New password (confirmation)</label>
            <div className="resetpassword-eye">
              <input
                value={passwordValid2.value}
                onChange={(e) => passwordValid2.onChange(e)}
                onBlur={(e) => passwordValid2.onBlur(e)}
                type={eye2 ? "password" : "text"}
                autoComplete="on"
                placeholder="confirm your password"
                className={redColor(passwordValid2, 8)}
              ></input>
              {isEmpty(passwordValid2)}
              {isLendth(passwordValid2, 8)}
              <span
                onClick={() => setEye2((prev) => !prev)}
                className={
                  passwordValid2.isDirty &&
                  (passwordValid2.isEmpty ||
                    (passwordValid2.value.length < 8 &&
                      passwordValid2.value.length !== 0))
                    ? "resetpassword-form-eye-error"
                    : "resetpassword-form-eye"
                }
              >
                {eye2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06L17.94 17.94Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#28003E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
          </div>
          <button className="resetpassword-button">Reset password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
