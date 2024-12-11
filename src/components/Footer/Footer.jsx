import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo.jsx";
import IconFacebook from "../IconsFooter/IconFacebook.jsx";
import IconInstagram from "../IconsFooter/IconInstagram.jsx";
import IconTwitter from "../IconsFooter/IconTwitter.jsx";
import IconTelegram from "../IconsFooter/IconTelegram.jsx";

import "./style.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__box">
        <div className="footer__container">
          <div className="footer-menu">
            <div className="logo-footer">
              <Link to="/" className="logo-link">
                <Logo />
              </Link>
            </div>
            <div className="footer-box">
              <div className="footer-box1">
                <div className="footer-inter1">
                  <h4 className="clients">To clients</h4>
                  <ul className="item">
                    <li className="text">Catalog of goods</li>
                    <li className="text">Delivery and payment</li>
                    <li className="text">Contacts</li>
                  </ul>
                </div>
                <div className="footer-inter2">
                  <h4 className="clients">Information</h4>
                  <ul className="item">
                    <li className="text">Returns and exchanges</li>
                    <li className="text">Privacy Policy</li>
                    <li className="text">Security Policy</li>
                    <li className="text">Terms of use</li>
                  </ul>
                </div>
              </div>
              <div className="footer-box2">
                <div className="footer-inter1">
                  <h4 className="clients">Work schedule of the call center</h4>
                  <ul className="item">
                    <li className="text">Mon - Fri: 09:00 - 20:00</li>
                    <li className="text">Sut: 09:00 - 18:00</li>
                    <li className="text">San: 09:00 - 18:00</li>
                  </ul>
                </div>
                <div className="footer-inter2">
                  <h4 className="clients">Contacts</h4>
                  <ul className="item">
                    <li className="text">0 800 00 00 00</li>
                    <li className="text">Free in Ukraine</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-contenticons">
          <div className="footer-icons">
            <ul className="icons">
              <li className="icons-li">
                <a href="##">
                  <IconFacebook />
                </a>
              </li>
              <li>
                <a href="##">
                  <IconInstagram />
                </a>
              </li>
              <li>
                <a href="##">
                  <IconTwitter />
                </a>
              </li>
              <li>
                <a href="##">
                  <IconTelegram />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-txt">© 2023 Mobe. All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
