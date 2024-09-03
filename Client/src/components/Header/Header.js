import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import header from './header.css';
import logo2 from '../../assets/img/logo-2.png';
import { Link } from "react-router-dom";




function Header() {
    const [show, doShow] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          doShow(true);
        } else {
          doShow(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

  return (
    <>
      <header className="afex-area afex-4 afex-6 afex-transparent afex-2 top-area-color-white">
        <div className="afex-top-area top-area-color-white">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="ltn__top-bar-menu afex__top-bar-menu">
                  <ul>
                    <li>
                      <Link to="mailto:info@webmail.com?Subject=Flower%20greetings%20to%20you">
                        <i className="icon-mail"></i> info@webmail.com
                      </Link>
                    </li>
                    <li>
                      <Link to="locations.html">
                        <i className="icon-placeholder"></i> 15/A, Nest Tower,
                        NYC
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-5">
                <div className="top-bar-right text-right">
                  <div className="ltn__top-bar-menu">
                    <ul>
                      <li>
                        <div className="ltn__drop-menu ltn__currency-menu ltn__language-menu">
                         
                        </div>
                      </li>
                      <li>
                        <div className="ltn__social-media">
                          <ul>
                            <li>
                              <Link to="#" title="Facebook">
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" title="Twitter">
                                <i className="fab fa-twitter"></i>
                              </Link>
                            </li>

                            <li>
                              <Link to="#" title="Instagram">
                                <i className="fab fa-instagram"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#" title="Dribbble">
                                <i className="fab fa-dribbble"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`afex-area afex-4 afex-6 afex-transparent afex-2 ${
            show ? "sticky-active {backgroundColor: #071c1f}" : ""
          }`}
          style={show ? { backgroundColor: "#071c1f" } : {}}
        >
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo-wrap">
                  <div className="site-logo">
                    <Link to="/">
                      <img src={logo2} alt="Logo" />
                    </Link>
                  </div>
                  <div className="get-support clearfix get-support-color-white">
                    <div className="get-support-icon">
                      <i className="icon-call"></i>
                    </div>
                    <div className="get-support-info">
                      <h6>Get Support</h6>
                      <h4>
                        <Link to="tel:+123456789">123-456-789-10</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col header-menu-column menu-color-white">
                <div className="header-menu d-none d-xl-block">
                  <nav>
                    <div className="ltn__main-menu pt-2">
                      <ul>
                        <li className="menu-ico">
                          <Link to="/">Home</Link>
                        </li>
                        <li className="menu-ico">
                          <Link to="/about">About</Link>
                        </li>
                        <li className="menu-ico">
                          <Link to="/service">Service</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                        <li className="special-link">
                          <Link to="/login">SIGN IN</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header
