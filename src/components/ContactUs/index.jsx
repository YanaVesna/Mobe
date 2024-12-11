import React, { useRef } from "react";
import arrowDown from "./Images/arrowDown.svg";
import arrowTop from "./Images/arrowTop.svg";
import viber from "./Images/viber.svg";
import useOutsideClick from "../../utils/useOutsideClick.jsx";

function ContactUs() {
  const [openContacts, setOpenContacts] = React.useState(false);

  const wrapRef = useRef(null);

  const closeContacts = () => {
    setOpenContacts(false);
  };

  useOutsideClick(wrapRef, closeContacts);

  return (
    <div className="box__contacts">
      <div
        className="header__contactus"
        ref={wrapRef}
        onClick={() => setOpenContacts(!openContacts)}
      >
        <span>Contact us</span>
        {!openContacts ? (
          <img src={arrowDown} alt="arrow down" />
        ) : (
          <img src={arrowTop} alt="arrow top" />
        )}
      </div>
      <div
        style={openContacts ? { display: "flex" } : { display: "none" }}
        className="header__contacts"
      >
        <div className="header__contacts-chat">
          <div className="header__contacts-round1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3.5 9C3.35833 9 3.23958 8.95208 3.14375 8.85625C3.04792 8.76042 3 8.64167 3 8.5V7.5H9.5V3H10.5C10.6417 3 10.7604 3.04792 10.8562 3.14375C10.9521 3.23958 11 3.35833 11 3.5V11L9 9H3.5ZM1 8.5V1.5C1 1.35833 1.04792 1.23958 1.14375 1.14375C1.23958 1.04792 1.35833 1 1.5 1H8C8.14167 1 8.26042 1.04792 8.35625 1.14375C8.45208 1.23958 8.5 1.35833 8.5 1.5V6C8.5 6.14167 8.45208 6.26042 8.35625 6.35625C8.26042 6.45208 8.14167 6.5 8 6.5H3L1 8.5ZM7.5 5.5V2H2V5.5H7.5Z"
                fill="#FDFDFD"
              />
            </svg>
          </div>
          <p>Chat on the site </p>
        </div>
        <div className="header__contacts-viber">
          <div className="header__contacts-round2">
            <img src={viber} alt="viber" />
          </div>
          <p>Viber</p>
        </div>
        <div className="header__contacts-telegram">
          <div className="telegram_rund">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                fill="url(#paint0_linear_1895_6613)"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.43201 11.8734C8.93026 10.3493 11.263 9.34452 12.4301 8.85905C15.7627 7.47294 16.4551 7.23216 16.9065 7.22421C17.0058 7.22246 17.2277 7.24706 17.3715 7.36372C17.4929 7.46223 17.5263 7.5953 17.5423 7.6887C17.5583 7.78209 17.5782 7.99485 17.5623 8.1611C17.3817 10.0586 16.6003 14.6633 16.2028 16.7885C16.0346 17.6877 15.7034 17.9892 15.3827 18.0188C14.6858 18.0829 14.1567 17.5582 13.4817 17.1158C12.4256 16.4235 11.8289 15.9925 10.8037 15.3169C9.61896 14.5362 10.387 14.107 11.0622 13.4058C11.2389 13.2222 14.3093 10.4295 14.3687 10.1761C14.3762 10.1444 14.3831 10.0263 14.3129 9.96397C14.2427 9.9016 14.1392 9.92293 14.0644 9.93989C13.9585 9.96393 12.2713 11.0791 9.00276 13.2855C8.52385 13.6143 8.09007 13.7745 7.70141 13.7662C7.27295 13.7569 6.44876 13.5239 5.83606 13.3247C5.08456 13.0804 4.48728 12.9513 4.53929 12.5364C4.56638 12.3203 4.86395 12.0993 5.43201 11.8734Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1895_6613"
                  x1="12"
                  y1="0"
                  x2="12"
                  y2="23.822"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2AABEE" />
                  <stop offset="1" stopColor="#229ED9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p>Telegram</p>
        </div>
        <div className="header__contacts-phone">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_1048_11844)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0C18.623 0 24 5.37703 24 12C24 18.623 18.623 24 12 24C5.37703 24 0 18.623 0 12C0 5.37703 5.37703 0 12 0ZM15.7832 13.2886C15.5931 13.1935 14.6584 12.7337 14.4841 12.6703C14.3099 12.6069 14.1832 12.5752 14.0564 12.7654C13.9297 12.9557 13.5653 13.3838 13.4544 13.5106C13.3435 13.6374 13.2326 13.6534 13.0425 13.5582C12.8524 13.4631 12.2398 13.2624 11.5137 12.6149C10.9485 12.111 10.5669 11.4885 10.456 11.2983C10.3452 11.108 10.4442 11.0052 10.5394 10.9104C10.6249 10.8253 10.7295 10.6884 10.8246 10.5774C10.9196 10.4664 10.9513 10.3872 11.0147 10.2604C11.0781 10.1335 11.0464 10.0225 10.9988 9.92737C10.9513 9.83227 10.5711 8.89678 10.4127 8.51625C10.2584 8.14566 10.1017 8.19581 9.98494 8.19C9.87417 8.18447 9.74733 8.1833 9.62058 8.1833C9.49383 8.1833 9.28791 8.23088 9.11358 8.42114C8.93934 8.61141 8.44823 9.0712 8.44823 10.0066C8.44823 10.9421 9.12947 11.8458 9.22453 11.9727C9.31959 12.0996 10.5651 14.0192 12.4722 14.8425C12.9258 15.0382 13.2799 15.1552 13.556 15.2428C14.0115 15.3874 14.4259 15.367 14.7535 15.3181C15.1187 15.2635 15.8783 14.8583 16.0367 14.4144C16.1951 13.9704 16.1951 13.5899 16.1476 13.5106C16.1001 13.4314 15.9733 13.3838 15.7832 13.2886Z"
                fill="#28003E"
              />
            </g>
            <defs>
              <clipPath id="clip0_1048_11844">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p>0 800 00 00 00</p>
        </div>
        <div className="header__contacts-spans">
          <span>Mon - Fri: 09:00 - 20:00</span>
          <span>Sat: 09:00 - 18:00</span>
          <span>Sun: 09:00 - 18:00</span>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
