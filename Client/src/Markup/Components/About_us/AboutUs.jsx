import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import "./Aboutus.css";
import img1 from "../../../Assets/img/effect/1.png";
import img2 from "../../../Assets/img/effect/2.png";
import img3 from "../../../Assets/img/effect/3.png";
import img4 from "../../../Assets/img/effect/4.png";
import img5 from "../../../Assets/img/effect/5.png";
import img6 from "../../../Assets/img/effect/6.png";
import img7 from "../../../Assets/img/icons/7.png";
import { Link } from "react-router-dom";

function AboutUs() {
  const [offsetY, setOffsetY] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if count is less than 42
    if (count < 42) {
      // Set a timeout to increment the count every 100 milliseconds
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 100);

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ltn__about-us-area pt-80 pb-85">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Parallax bgColor={""} strength={300} className="">
                <ul
                  className="afex__parallax-effect-wrap ltn__parallax-effect-active "
                  style={{
                    transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.00"
                  ></li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.10"
                  >
                    <div className="ltn__effect-img ltn__effect-img-top-left">
                      <img src={img1} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.30"
                  >
                    <div className="ltn__effect-img ltn__effect-img-top-right">
                      <img src={img2} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.50"
                  >
                    <div className="ltn__effect-img ltn__effect-img-center-left">
                      <img src={img3} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div className="ltn__effect-img ltn__effect-img-center-right">
                      <img src={img4} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div class="ltn__effect-img ltn__effect-img-bottom-left">
                      <img src={img5} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer"
                    style={{
                      transform: `translate3d(0px, 0px, 0px) rotate(0.0001deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      pointerEvents: "none",
                    }}
                    data-depth="0.20"
                  >
                    <div class="ltn__effect-img ltn__effect-img-bottom-right">
                      <img src={img6} alt="#" />
                    </div>
                  </li>
                  <li
                    className="layer layer-big wave-container"
                    data-depth="0.50"
                  >
                    <div className="wave">
                      <div className="about-us-img-info square">
                        <div className="about-us-img-info-inner">
                          <h1>
                            <span className="counter">{count}</span>
                            <span>+</span>
                          </h1>
                          <h6>
                            <span>Years</span> Of Experience
                          </h6>
                          <span className="dots-bottom"></span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </Parallax>
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  // About Us
                </h6>
                <h1 className="section-title">
                  Get Amazing Service From Us<span>.</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore
                </p>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi{" "}
              </p>
              <hr />
              <div className="about-call-us">
                <div className="call-us-icon">
                  <img src={img7} alt="Icon Image" />
                </div>
                <div className="call-us-info">
                  <p>
                    Call us 24/7. We can answer for{" "}
                    <Link
                      to="/contact"
                      className="ltn__secondary-color text-decoration"
                    >
                      <strong>all your questions</strong>
                    </Link>
                    .
                  </p>
                  <h2>
                    <Link to="tel:+123456789">507-452-1254</Link>{" "}
                    <small> or </small>{" "}
                    <Link to="tel:+123456789">508-452-1253</Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
