import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HeaderPage() {
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
    <header className="header-section" style={{ backgroundColor: "#071c1f" }}>
      <div
        className={`afex-area afex-4 afex-6 afex-transparent afex-2 ${
          show ? "sticky-active {backgroundColor: #071c1f}" : ""
        }`}
        style={show ? { backgroundColor: "#071c1f" } : {}}
      >
        <div className="">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="site-logo-wrap">
                  <div className="site-logo">
                   <Link to ="/">
                      <img src="/" alt="Logo" />
                    </Link>
                  </div>
                  <div className="get-support clearfix get-support-color-white">
                    <div className="get-support-icon">
                      <i className="icon-call"></i>
                    </div>
                    <div className="get-support-info">
                      <h6>Get Support</h6>
                      <h4>
                       <Link to ="tel:+123456789">123-456-789-10</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col header-menu-column menu-color-white">
                <div className="header-menu d-none d-xl-block">
                  <nav>
                    <div className="ltn__main-menu">
                      <ul>
                        <li className="menu-ico">
                         <Link to ="/">Home</Link>
                        </li>
                        <li className="menu-ico">
                         <Link to ="/aboutus">About</Link>
                        </li>
                        <li className="menu-ico">
                         <Link to ="/service">Service</Link>
                        </li>

                        <li>
                         <Link to ="/contactus">Contact</Link>
                        </li>
                        <li className="special-link">
                         <Link to ="/login">LOGIN</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="mobile-menu-toggle menu-btn-white menu-btn-border--- d-xl-none">
                <Link to = "#ltn__utilize-mobile-menu"
                  className="ltn__utilize-toggle"
                >
                  <svg viewBox="0 0 800 600">
                    <path
                      d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                      id="top"
                    ></path>
                    <path d="M300,320 L540,320" id="middle"></path>
                    <path
                      d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                      id="bottom"
                      transform="translate(480, 320) scale(1, -1) translate(-480, -318) "
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderPage;
